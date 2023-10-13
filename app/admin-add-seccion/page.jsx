"use client";
import React, { useEffect, useState } from "react";
import { Container, Content, Formulary } from "@/components/AdminAdderElement";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";

import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const AddSeccion = () => {
  const [inputValues, setInputValues] = useState({});
  const [Profesores, setProfesores] = useState([{ usuario: {} }]);
  const [Asignaturas, setAsignaturas] = useState([{}]);
  const [Aulas, setAulas] = useState([{ edificio: {} }]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const IDtoModify = useSearchParams().get("id");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase
        .from("seccion")
        .select("*,profesor(usuario(*))")
        .eq("id", IDtoModify);

      const newInputValues = { ...inputValues };
      newInputValues["profesor_id"] = data[0].profesor_id;
      newInputValues["asignatura_codigo"] = data[0].asignatura_codigo;
      newInputValues["seccion_numero"] = data[0].seccion_numero;
      newInputValues["seccion_activa"] = data[0].seccion_activa;
      newInputValues["aula_id"] = data[0].aula_id;
      newInputValues["seccion_dia"] = data[0].seccion_dia;
      newInputValues["seccion_inicio"] = data[0].seccion_inicio;
      newInputValues["seccion_fin"] = data[0].seccion_fin;

      setInputValues(newInputValues);
    }

    if (IDtoModify) {
      fetchData();
    } else {
      const newInputValues = { ...inputValues };
      newInputValues["seccion_activa"] = true;
      newInputValues["seccion_dia"] = "Lunes";
      setInputValues(newInputValues);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase
        .from("profesor")
        .select("*, usuario(*)");
      setProfesores(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase
        .from("asignatura")
        .select("*")
        .order("asignatura_codigo", { ascending: true });

      setAsignaturas(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase
        .from("aula")
        .select("*, edificio(*)")
        .order("aula_codigo", { ascending: true });

      setAulas(data);
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
      .from("seccion")
      .insert([dataToInsert]);

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
      .from("seccion")
      .update(dataToInsert)
      .eq("id", IDtoModify)
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
      profesor_id: inputValues.profesor_id,
      asignatura_codigo: inputValues.asignatura_codigo,
      seccion_numero: inputValues.seccion_numero,
      seccion_activa: inputValues.seccion_activa,
      aula_id: inputValues.aula_id,
      seccion_dia: inputValues.seccion_dia,
      seccion_inicio: inputValues.seccion_inicio,
      seccion_fin: inputValues.seccion_fin,
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
        <h2>Secciones</h2>
        <Formulary>
          <div>
            <label htmlFor="profesor_id">Profesor</label>
            <select
              defaultValue={IDtoModify ? inputValues.profesor_id : ""}
              id="profesor_id"
              onChange={(e) => handleInputChange(e)}
            >
              <option>Seleccionar...</option>

              {Profesores.map((element, idx) => (
                <option key={idx} value={element.profesor_id}>
                  {element.profesor_id} - {element.usuario.usuario_nombre}{" "}
                  {element.usuario.usuario_apellido}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="asignatura_codigo">Asignatura</label>
            <select
              defaultValue={IDtoModify ? inputValues.asignatura_codigo : ""}
              id="asignatura_codigo"
              onChange={(e) => handleInputChange(e)}
            >
              <option>Seleccionar...</option>

              {Asignaturas.map((element, idx) => (
                <option key={idx} value={element.asignatura_codigo}>
                  {element.asignatura_codigo} - {element.asignatura_nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="aula_id">Aula</label>
            <select
              defaultValue={IDtoModify ? inputValues.aula_id : ""}
              id="aula_id"
              onChange={(e) => handleInputChange(e)}
            >
              <option>Seleccionar...</option>

              {Aulas.map((element, idx) => (
                <option key={idx} value={element.aula_codigo}>
                  {element.aula_codigo} - {element.edificio.edificio_nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="seccion_numero">Numero de la Seccion</label>
            <input
              defaultValue={IDtoModify ? inputValues.seccion_numero : ""}
              type="number"
              id="seccion_numero"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div>
            <label htmlFor="seccion_activa">Estado de la seccion</label>
            <select
              defaultValue={IDtoModify ? inputValues.seccion_activa : true}
              id="seccion_activa"
              onChange={(e) => handleInputChange(e)}
            >
              {IDtoModify ? (
                inputValues.seccion_activa ? (
                  <option>Activa (Default)</option>
                ) : (
                  <option>Inactiva (Default)</option>
                )
              ) : (
                <></>
              )}
              <option value={true}>Activa</option>
              <option value={false}>Inactiva</option>
            </select>
          </div>
          <div>
            <label htmlFor="seccion_dia">Dia</label>
            <select
              defaultValue={IDtoModify ? inputValues.seccion_dia : null}
              id="seccion_dia"
              onChange={(e) => handleInputChange(e)}
            >
              <option>Lunes</option>
              <option>Martes</option>
              <option>Miercoles</option>
              <option>Jueves</option>
              <option>Viernes</option>
              <option>Sabado</option>
            </select>
          </div>
          <div>
            <label htmlFor="seccion_inicio">Hora de entrada</label>
            <input
              defaultValue={IDtoModify ? inputValues.seccion_inicio : ""}
              type="number"
              id="seccion_inicio"
              min="0"
              max="24"
              onChange={(e) => handleInputChange(e)}
            />
          </div>{" "}
          <div>
            <label htmlFor="seccion_fin">Hora de salida</label>
            <input
              defaultValue={IDtoModify ? inputValues.seccion_fin : ""}
              type="number"
              id="seccion_fin"
              min="0"
              max="24"
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

export default AddSeccion;
