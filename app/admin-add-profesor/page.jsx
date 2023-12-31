"use client";
import React, { useEffect, useState } from "react";
import { Container, Content, Formulary } from "@/components/AdminAdderElement";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";

import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const AddProfesor = () => {
  const [inputValues, setInputValues] = useState({});
  const [Areas, setAreas] = useState([{}]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const IDtoModify = useSearchParams().get("id");
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      let { data: area, error } = await supabase
        .from("profesor")
        .select("*, usuario!inner(*), area!inner(*)")
        .eq("profesor_id", IDtoModify);

      const newInputValues = { ...inputValues };
      newInputValues["usuario_id"] = area[0].usuario.usuario_id;
      newInputValues["usuario_nombre"] = area[0].usuario.usuario_nombre;
      newInputValues["usuario_apellido"] = area[0].usuario.usuario_apellido;
      newInputValues["usuario_correo"] = area[0].usuario.usuario_correo;
      newInputValues["usuario_password"] = area[0].usuario.usuario_password;
      newInputValues["area_nombre"] = area[0].area.area_nombre;
      newInputValues["area_id"] = area[0].area.id;

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
      setAreas(area);
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

  const SaveData = async (dataToInsert, dataProfesor) => {
    const { data, error } = await supabase
      .from("usuario")
      .insert([dataToInsert]);

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      const { data, error } = await supabase
        .from("profesor")
        .insert([dataProfesor]);

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
    }
  };

  const UpdateData = async (dataToInsert, dataProfesor) => {
    const { data, error } = await supabase
      .from("usuario")
      .update(dataToInsert)
      .eq("usuario_id", IDtoModify)
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
        .from("profesor")
        .update(dataProfesor)
        .eq("profesor_id", IDtoModify)
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
    }
  };

  const SaveHandler = async (e) => {
    e.preventDefault();
    if (!ValidData()) return;

    let data = {
      usuario_id: inputValues.usuario_id,
      usuario_nombre: inputValues.usuario_nombre,
      usuario_apellido: inputValues.usuario_apellido,
      usuario_correo: inputValues.usuario_correo,
      usuario_password: inputValues.usuario_password,
      usuario_rol: 2,
    };

    let dataProfesor = {
      profesor_id: inputValues.usuario_id,
      area_id: inputValues.area_id,
      profesor_trimestre: 1,
    };
    if (IDtoModify) {
      UpdateData(data, dataProfesor);
    } else {
      SaveData(data, dataProfesor);
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

    if (inputValues.area_id == "" || inputValues.area_id == null) {
      Swal.fire({
        title: "Error!",
        text: "Por favor selecciona un area para el profesor.",
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
        <h2>Profesores</h2>
        <Formulary>
          <div>
            <label htmlFor="usuario_id">ID del Profesor</label>
            <input
              defaultValue={IDtoModify ? inputValues.usuario_id : ""}
              type="number"
              id="usuario_id"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_nombre">Nombre del Profesor</label>
            <input
              defaultValue={IDtoModify ? inputValues.usuario_nombre : ""}
              type="text"
              id="usuario_nombre"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_apellido">Apellido del Profesor</label>
            <input
              defaultValue={IDtoModify ? inputValues.usuario_apellido : ""}
              type="text"
              id="usuario_apellido"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_correo">Correo</label>
            <input
              defaultValue={IDtoModify ? inputValues.usuario_correo : ""}
              type="text"
              id="usuario_correo"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="usuario_password">Contraseña</label>
            <input
              defaultValue={IDtoModify ? inputValues.usuario_password : ""}
              disabled={IDtoModify ? true : false}
              type="password"
              id="usuario_password"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div htmlFor="area_id">
            <label htmlFor="area_id">Area</label>
            <select
              defaultValue={IDtoModify ? inputValues.area_id : ""}
              id="area_id"
              onChange={(e) => handleInputChange(e)}
            >
              {IDtoModify ? (
                <option value={inputValues.area_nombre}>
                  {inputValues.area_nombre}
                </option>
              ) : (
                <option>Seleccionar...</option>
              )}
              {Areas.map((element, idx) => (
                <option key={idx} value={element.id}>
                  {element.area_nombre}
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

export default AddProfesor;
