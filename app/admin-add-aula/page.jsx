"use client";
import React, { useEffect, useState } from "react";
import { Container, Content, Formulary } from "@/components/AdminAdderElement";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";
import MySupabase from "../supabase";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";

const AddAula = () => {
  const [inputValues, setInputValues] = useState({});
  const [Edificios, setEdificios] = useState([]);
  const IDtoModify = useSearchParams().get("id");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: area, error } = await MySupabase.from("aula")
        .select("*")
        .eq("aula_codigo", IDtoModify);

      const newInputValues = { ...inputValues };
      newInputValues["aula_codigo"] = area[0].aula_codigo;
      newInputValues["edificio_id"] = area[0].edificio_id;
      setInputValues(newInputValues);
    }

    if (IDtoModify) fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await MySupabase.from("edificio").select("*");
      setEdificios(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") != 3) {
      router.push("./");
    }
  }, []);

  const handleInputChange = (event) => {
    const newInputValues = { ...inputValues };
    newInputValues[event.target.id] = event.target.value;
    setInputValues(newInputValues);
  };

  const SaveData = async (dataToInsert) => {
    const { data, error } = await MySupabase.from("aula")
      .insert([dataToInsert])
      .select();

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        titleText: "Dato Insertado",
        text: "El dato se ha guardado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const UpdateData = async (dataToInsert) => {
    const { data, error } = await MySupabase.from("aula")
      .update(dataToInsert)
      .eq("aula_codigo", IDtoModify)
      .select();

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        titleText: "Dato Insertado",
        text: "El dato se ha actualizado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const SaveHandler = async (e) => {
    e.preventDefault();
    if (!ValidData()) return;

    let data = {
      aula_codigo: inputValues.aula_codigo,
      edificio_id: inputValues.edificio_id,
    };
    if (IDtoModify) {
      UpdateData(data);
    } else {
      SaveData(data);
    }
  };

  const ValidData = () => {
    return true;
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Aulas</h2>
        <Formulary>
          <div>
            <label htmlFor="aula_codigo">Nombre del Aula</label>
            <input
              defaultValue={IDtoModify ? inputValues.aula_codigo : ""}
              type="text"
              id="aula_codigo"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            <label htmlFor="edificio_id">Edificio</label>
            <select
              defaultValue={IDtoModify ? inputValues.edificio_id : ""}
              id="edificio_id"
              onChange={(e) => handleInputChange(e)}
            >
              <option>Seleccionar...</option>

              {Edificios.map((element, idx) => (
                <option key={idx} value={element.id}>
                  {element.id} - {element.edificio_nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="buttonContainer">
            <button onClick={(e) => SaveHandler(e)}>Guardar</button>
            <Link href="./admin-main">
              <button>Cancelar</button>
            </Link>
          </div>
        </Formulary>
      </Content>
    </Container>
  );
};

export default AddAula;
