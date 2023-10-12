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
  input[type="password"],
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

const AddArea = () => {
  const [inputValues, setInputValues] = useState({});
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") != 3) {
      router.push("./");
    }
  }, []);

  const handleInputChange = (event) => {
    const newInputValues = { ...inputValues };
    newInputValues[event.target.id] = event.target.value;
    console.log(newInputValues);
    setInputValues(newInputValues);
  };

  const SaveHandler = async (e) => {
    e.preventDefault();
    if (!ValidData()) return;
    const { data, error } = await supabase
      .from("area")
      .insert([{ area_nombre: inputValues.area_nombre }])
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
    if (inputValues.area_nombre == null) {
      Swal.fire({
        title: "Error!",
        text: "Unos de los campos suministrados está carente de contenido.",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return false;
    }
    if (inputValues.area_nombre == "") {
      Swal.fire({
        title: "Error!",
        text: "Unos de los campos suministrados está carente de contenido.",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return false;
    }
    if (inputValues.area_nombre == " ") {
      Swal.fire({
        title: "Error!",
        text: "Unos de los campos suministrados está carente de contenido.",
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
        <h2>Area Academica</h2>
        <Formulary>
          <div>
            <label htmlFor="area_nombre">Nombre del Area</label>
            <input
              type="text"
              id="area_nombre"
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

export default AddArea;
