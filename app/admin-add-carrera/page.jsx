"use client";
import React, { useState, useEffect } from "react";
import { Container, Content, Formulary } from "@/components/AdminAdderElement";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";

import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const AddCarrera = () => {
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
        .from("carrera")
        .select("*")
        .eq("carrera_abreviatura", IDtoModify);

      const newInputValues = { ...inputValues };

      newInputValues["carrera_abreviatura"] = area[0].carrera_abreviatura;
      newInputValues["area_id"] = area[0].area_id;
      newInputValues["carrera_nombre"] = area[0].carrera_nombre;
      newInputValues["carrera_creditos"] = area[0].carrera_creditos;
      newInputValues["carrera_trimestres"] = area[0].carrera_trimestres;
      newInputValues["carrera_asignatura_total"] =
        area[0].carrera_asignatura_total;
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

  const handleInputChange = (event, value = null) => {
    const newInputValues = { ...inputValues };
    newInputValues[event.target.id] = value || event.target.value;
    setInputValues(newInputValues);
  };

  const SaveData = async (dataToInsert) => {
    const { data, error } = await supabase
      .from("carrera")
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
      .from("carrera")
      .update(dataToInsert)
      .eq("carrera_abreviatura", IDtoModify)
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
      carrera_abreviatura: inputValues.carrera_abreviatura,
      area_id: inputValues.area_id,
      carrera_nombre: inputValues.carrera_nombre,
      carrera_creditos: inputValues.carrera_creditos,
      carrera_trimestres: inputValues.carrera_trimestres,
      carrera_asignatura_total: inputValues.carrera_asignatura_total,
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
        <h2>Carrera</h2>
        <Formulary>
          <div>
            <label htmlFor="carrera_abreviatura">Abreviatura</label>
            <input
              defaultValue={IDtoModify ? inputValues.carrera_abreviatura : ""}
              type="text"
              id="carrera_abreviatura"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

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
            <label htmlFor="carrera_nombre">Nombre de la Carrera</label>
            <input
              defaultValue={IDtoModify ? inputValues.carrera_nombre : ""}
              type="text"
              id="carrera_nombre"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="carrera_creditos">Creditos Totales</label>
            <input
              defaultValue={IDtoModify ? inputValues.carrera_creditos : ""}
              type="number"
              id="carrera_creditos"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="carrera_trimestres">Trimestres Totales</label>
            <input
              defaultValue={IDtoModify ? inputValues.carrera_trimestres : ""}
              type="number"
              id="carrera_trimestres"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="carrera_asignatura_total">
              Asignaturas Totales
            </label>
            <input
              defaultValue={
                IDtoModify ? inputValues.carrera_asignatura_total : ""
              }
              type="number"
              id="carrera_asignatura_total"
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

export default AddCarrera;
