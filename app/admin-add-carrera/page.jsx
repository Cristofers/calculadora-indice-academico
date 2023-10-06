"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash content"
    "dash content"
    "dash content"
    "dash content";

  div:nth-child(1) {
    grid-area: dash;
  }

  div:nth-child(2) {
    grid-area: content;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: 024554;
    font-size: 50px;
    width: 50%;
    margin-bottom: 20px;
    text-align: center;
  }

  label {
    margin-left: 20px;
    font-size: 25px;
  }
`;

const Formulary = styled.form`
  display: flex;
  width: 50%;
  flex-direction: row;
  flex-direction: column;
  justify-content: space-between;

  width: 55%;
  input[type="text"],
  input[type="password"],
  input[type="number"],
  select,
  textarea {
    background-color: #eeeeee;
    padding: 10px;
    border-radius: 10px;
    font-size: 20px;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .buttonContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    button {
      padding: 5px;
      font-size: 20px;
      border-radius: 5px;
      color: white;
      background-color: #c4c4c4;
      margin-left: 10px;

      &:nth-child(1) {
        background-color: #024554;
      }
    }
  }
`;

const AddCarrera = () => {
  const [inputValues, setInputValues] = useState({});
  const [AreaIDValue, setAreaIDValue] = useState([]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: area, error } = await supabase.from("area").select("*");
      setAreaIDValue(area);
      console.log(area);
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

  const SaveHandler = async (e) => {
    e.preventDefault();
    if (!ValidData) return;

    const { data, error } = await supabase
      .from("carrera")
      .insert([
        {
          carrera_abreviatura: inputValues.carrera_abreviatura,
          area_id: inputValues.area_id,
          carrera_nombre: inputValues.carrera_nombre,
          carrera_creditos: inputValues.carrera_creditos,
          carrera_trimestres: inputValues.carrera_trimestres,
          carrera_asignatura_total: inputValues.carrera_asignatura_total,
        },
      ])
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
        text: "El dato se ha insertado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const ValidData = () => {
    if (inputValues.area_id <= 0) {
      Swal.fire({
        title: "Error!",
        text: 'El campo "Area ID" no tiene ninguna área seleccionada.',
        icon: "error",
        confirmButtonText: "Cool",
      });
      return false;
    }
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
              type="text"
              id="carrera_abreviatura"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div htmlFor="area_id">
            <label htmlFor="area_id">Area ID</label>
            <select id="area_id" onChange={(e) => handleInputChange(e)}>
              <option value={0}>Seleccionar...</option>
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
              type="text"
              id="carrera_nombre"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="carrera_creditos">Creditos Totales</label>
            <input
              type="number"
              id="carrera_creditos"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="carrera_trimestres">Trimestres Totales</label>
            <input
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
