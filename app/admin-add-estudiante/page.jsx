"use client";
import React, { useEffect, useState } from "react";
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
  input[type="number"],
  input[type="password"],
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

const AddEstudiante = () => {
  const [inputValues, setInputValues] = useState({});
  const [Carreras, setCarreras] = useState([{}]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: carrera, error } = await supabase
        .from("carrera")
        .select("*")
        .order("carrera_nombre", { ascending: true });
      setCarreras(carrera);
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

  const SaveHandler = async (e) => {
    e.preventDefault();
    if (!ValidData()) return;
    const { data, error } = await supabase
      .from("usuario")
      .insert([
        {
          usuario_id: inputValues.usuario_id,
          usuario_nombre: inputValues.usuario_nombre,
          usuario_apellido: inputValues.usuario_apellido,
          usuario_correo: inputValues.usuario_correo,
          usuario_password: inputValues.usuario_password,
          usuario_rol: 1,
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
      const { data, error } = await supabase
        .from("estudiante")
        .insert([
          {
            estudiante_id: inputValues.usuario_id,
            carrera_codigo: inputValues.carrera_codigo,
            estudiante_pensum: 2020,
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
    }
  };

  const ValidData = () => {
    if (inputValues.usuario_id.toString().length != 7) {
      Swal.fire({
        title: "Error!",
        text: "La cantidad de dígitos requeridos para el ID de estudiantes no es la correcta.",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return false;
    }

    if (
      inputValues.carrera_codigo == "" ||
      inputValues.carrera_codigo == null
    ) {
      Swal.fire({
        title: "Error!",
        text: "Por favor selecciona una carrera para el estudiante.",
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
        <h2>Estudiantes</h2>
        <Formulary>
          <div>
            <label htmlFor="usuario_id">ID del Estudiante</label>
            <input
              type="number"
              id="usuario_id"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_nombre">Nombre del Estudiante</label>
            <input
              type="text"
              id="usuario_nombre"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_apellido">Apellido del Estudiante</label>
            <input
              type="text"
              id="usuario_apellido"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_correo">Correo</label>
            <input
              type="text"
              id="usuario_correo"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_password">Contraseña</label>
            <input
              type="password"
              id="usuario_password"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div htmlFor="carrera_codigo">
            <label htmlFor="carrera_codigo">Carrera</label>
            <select id="carrera_codigo" onChange={(e) => handleInputChange(e)}>
              <option value={0} key={0}>
                Seleccionar...
              </option>
              {Carreras.map((element, idx) => (
                <option key={idx} value={element.carrera_abreviatura}>
                  {element.carrera_abreviatura} - {element.carrera_nombre}
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

export default AddEstudiante;