"use client";
import React, { useEffect, useState } from "react";
import { Container, Content, Formulary } from "@/components/AdminAdderElement";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const AddProfesor = () => {
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
          usuario_rol: 3,
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
    if (inputValues.usuario_id.toString().length != 7) {
      Swal.fire({
        title: "Error!",
        text: "La cantidad de dígitos requeridos para el ID de profesor no es la correcta.",
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
        <h2>Administradores</h2>
        <Formulary>
          <div>
            <label htmlFor="usuario_id">ID de Administrador</label>
            <input
              type="number"
              id="usuario_id"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_nombre">Nombre del Administrador</label>
            <input
              type="text"
              id="usuario_nombre"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_apellido">Apellido del Administrador</label>
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

export default AddProfesor;
