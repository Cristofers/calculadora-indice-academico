"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { LSH_SaveUserInformation } from "../LocalStorageHandler";
import { LSH_UserLogged } from "../LocalStorageHandler";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;

  grid-template-areas: "imageL content";

  div:nth-child(1) {
    grid-area: imageL;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    img {
      width: 90%;
      height: 90%;
    }
  }

  div:nth-child(2) {
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    h2 {
      color: 024554;
      font-size: 50px;
      width: 50%;
      margin-bottom: 20px;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;

      input[type="text"],
      input[type="password"] {
        border-radius: 5px;
        margin-top: 10px;
        background-color: #eeeeee;
        padding: 10px;
        border-radius: 10px;
        font-size: 20px;
        width: 90%;
      }

      .rememberMeContainer {
        margin-top: 10px;
        display: flex;
        width: 90%;
        align-items: center;
        justify-content: space-between;

        .rememberMe {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          p {
            margin-left: 5px;
          }
        }

        a {
          width: 50%;
          text-align: right;
        }
      }

      button {
        background-color: #024554;
        width: 50%;
        padding: 5px;
        font-size: 20px;
        border-radius: 5px;
        color: white;
        margin-top: 10px;
      }
    }
  }
`;

const Login = () => {
  const [inputValues, setInputValues] = useState({});
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") === null) return;

    switch (sessionStorage.getItem("usuario_rol").toString() || "") {
      case "1":
      // router.push("./student-main");
      case "2":
      // router.push("./teacher-main");
      case "3":
        // router.push("./admin-main");
        break;
    }
    return;
  }, []);

  const handleInputChange = (event) => {
    const newInputValues = { ...inputValues };
    newInputValues[event.target.id] = event.target.value;
    setInputValues(newInputValues);
  };

  const LogHandler = async (e) => {
    e.preventDefault();
    let { data: usuario, error } = await supabase
      .from("usuario")
      .select("*")
      .eq("usuario_correo", inputValues.email)
      .eq("usuario_password", inputValues.pass);

    if (usuario[0] != null) {
      switch (usuario[0].usuario_rol) {
        case 1:
          UserStudentSet();
          break;
        case 2:
          UserTeacherSet();
          break;
        case 3:
          UserAdminSet();
          break;
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "¡Usuario no valido!",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const UserStudentSet = async () => {
    let { data: usuario, error } = await supabase
      .from("usuario")
      .select("*, estudiante (*, carrera(*, area(*)))")
      .eq("usuario_correo", inputValues.email)
      .eq("usuario_password", inputValues.pass);

    LSH_SaveUserInformation(usuario[0]);
    router.push("/student-main");
  };

  const UserTeacherSet = async () => {
    let { data: usuario, error } = await supabase
      .from("usuario")
      .select("*, profesor(*,area(*))")
      .eq("usuario_correo", inputValues.email)
      .eq("usuario_password", inputValues.pass);

    LSH_SaveUserInformation(usuario[0]);
    router.push("/teacher-main");
  };

  const UserAdminSet = async () => {
    let { data: usuario, error } = await supabase
      .from("usuario")
      .select("*")
      .eq("usuario_correo", inputValues.email)
      .eq("usuario_password", inputValues.pass);

    LSH_SaveUserInformation(usuario[0]);
    router.push("/admin-main");
  };

  return (
    <Container>
      <div className="imageContainer">
        <Image
          src="/generalElements/Login Image.png"
          alt="Login Picture"
          width={500}
          height={500}
        />
      </div>
      <div>
        <h2>Iniciar Sesión</h2>
        <form action="">
          <input
            type="text"
            id="email"
            placeholder="Email"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="password"
            id="pass"
            placeholder="Contraseña"
            onChange={(e) => handleInputChange(e)}
          />
          <div className="rememberMeContainer">
            {/* <div className="rememberMe">
              <input type="checkbox" name="check" id="" />
              <p>Recordar usuario </p>
            </div>
            <Link href="./">¿Olvidaste tu contraseña?</Link> */}
          </div>
          <button
            onClick={(e) => {
              LogHandler(e);
            }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
