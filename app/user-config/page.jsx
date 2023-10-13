"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MySupabase from "../supabase";
import Swal from "sweetalert2";

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

  form {
    display: flex;
    width: 50%;
    flex-direction: row;
    justify-content: space-between;

    .imageInformation {
      position: relative;
      width: 40%;
      overflow: visible;
      img {
        border-radius: 50px;
        height: 100%;
        width: 100%;
      }

      .pContainer {
        position: absolute;
        color: black;
        top: 0;
        font-size: 50px;
        background-color: purple;
        border-radius: 50%;
        width: 50px;
        height: 50px;

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        z-index: 20;
        display: none;
      }
    }

    .BasicInformation {
      width: 55%;
      input[type="text"],
      input[type="number"],
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
    }
  }
`;

const UserConfig = () => {
  const [InputValues, setInputValues] = useState({});
  const [Usuario, setUsuario] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: usuario, error } = await MySupabase.from("usuario")
        .select("*")
        .eq("usuario_id", sessionStorage.getItem("usuario_id"));

      const newInputValues = { ...InputValues };
      newInputValues["usuario_password"] = usuario[0].usuario_password;
      newInputValues["usuario_telefono"] = usuario[0].usuario_telefono;
      setInputValues(newInputValues);
      setUsuario(usuario[0]);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") == null) {
      router.push("./");
    }
  }, []);

  const SaveHandler = async (e) => {
    e.preventDefault();
    const { data, error } = await MySupabase.from("usuario")
      .update(InputValues)
      .eq("usuario_id", sessionStorage.getItem("usuario_id"))
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

  const handleInputChange = (event) => {
    const newInputValues = { ...InputValues };
    newInputValues[event.target.id] = event.target.value;
    setInputValues(newInputValues);
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Configuración de Usuario</h2>
        <form action="">
          <div className="imageInformation">
            <Image
              src="/profilePictures/Default.png"
              alt="Picture of the author"
              width={500}
              height={500}
            />
            <div className="pContainer">
              <p>+</p>
            </div>
          </div>

          <div className="BasicInformation">
            <div className="password">
              <label htmlFor="usuario_password">Contraseña</label>
              <input
                onChange={(e) => handleInputChange(e)}
                defaultValue={Usuario.usuario_password}
                type="password"
                id="usuario_password"
              />
            </div>

            <div className="phone">
              <label htmlFor="usuario_telefono">Telefono</label>
              <input
                onChange={(e) => handleInputChange(e)}
                defaultValue={Usuario.usuario_telefono}
                type="number"
                autoComplete="off"
                id="usuario_telefono"
              />
            </div>

            <div className="buttonContainer">
              <button onClick={(e) => SaveHandler(e)}>Actualizar</button>
              <button>Cancelar</button>
            </div>
          </div>
        </form>
      </Content>
    </Container>
  );
};

export default UserConfig;
