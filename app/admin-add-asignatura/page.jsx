"use client";
import React, { useState, useEffect } from "react";
import { Container, Content, Formulary } from "@/components/AdminAdderElement";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const AddAsignatura = () => {
  const [inputValues, setInputValues] = useState({});
  const [AreaIDValue, setAreaIDValue] = useState([]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const IDtoModify = useSearchParams().get("id");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: area, error } = await supabase
        .from("asignatura")
        .select("*")
        .eq("asignatura_codigo", IDtoModify);

      const newInputValues = { ...inputValues };

      newInputValues["area_id"] = area[0].area_id;
      newInputValues["asignatura_codigo"] = area[0].asignatura_codigo;
      newInputValues["asignatura_nombre"] = area[0].asignatura_nombre;
      newInputValues["asignatura_creditos"] = area[0].asignatura_creditos;
      setInputValues(newInputValues);
    }

    if (IDtoModify) fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let { data: area, error } = await supabase
        .from("area")
        .select("*")
        .order("area_nombre", { ascending: true });
      setAreaIDValue(area);
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
    const { data, error } = await supabase
      .from("asignatura")
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
    const { data, error } = await supabase
      .from("asignatura")
      .update(dataToInsert)
      .eq("asignatura_codigo", IDtoModify)
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
      area_id: inputValues.area_id,
      asignatura_codigo: inputValues.asignatura_codigo,
      asignatura_nombre: inputValues.asignatura_nombre,
      asignatura_creditos: inputValues.asignatura_creditos,
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
        <h2>Asignatura</h2>
        <Formulary>
          <div htmlFor="area_id">
            <label htmlFor="area_id">Area ID</label>
            <select
              id="area_id"
              defaultValue={IDtoModify ? inputValues.area_id : ""}
              onChange={(e) => handleInputChange(e)}
            >
              {IDtoModify && (
                <option value={inputValues.area_id}>
                  {inputValues.area_id} - Por Defecto
                </option>
              )}
              {AreaIDValue.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.area_nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="asignatura_codigo">Codigo</label>
            <input
              defaultValue={IDtoModify ? inputValues.asignatura_codigo : ""}
              type="text"
              id="asignatura_codigo"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="asignatura_nombre">Nombre</label>
            <input
              defaultValue={IDtoModify ? inputValues.asignatura_nombre : ""}
              type="text"
              id="asignatura_nombre"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="asignatura_creditos">Cantidad de creditos</label>
            <input
              defaultValue={IDtoModify ? inputValues.asignatura_creditos : ""}
              type="number"
              id="asignatura_creditos"
              min={0}
              onChange={(e) => handleInputChange(e)}
            />
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

export default AddAsignatura;
