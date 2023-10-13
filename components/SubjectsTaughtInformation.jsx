"use client";
import styled from "styled-components";
import CircularProgressBar from "./CircularProgressBar";
import GenericTable from "./GenericTable";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SubjectsTaughtContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  text-align: center;
  font-size: 10.38px;
  color: #fff;
  font-family: "Open Sans";

  border-radius: 20px;
  background-color: #e8e8e8;
  width: 100%;

  h2 {
    grid-area: title;
    text-align: left;
    font-size: 28px;
    color: #000;
  }

  .TaughtListInfoContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    .SubjectsTaughtList {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 17.29px;
      background-color: #fff;
      border: 2.6px solid #6a8c69;
      box-sizing: border-box;
      width: 70%;
      height: 100%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0.1rem; /* Ancho muy pequeño */
        background-color: transparent; /* Color de fondo transparente */
      }
    }
  }
`;

const SubjectsTaughtInformation = ({ sectionID }) => {
  const [Estudiantes, setEstudiantes] = useState([[]]);
  const [asigNombre, setAsigNombre] = useState("");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function fetchData() {
      let { data: estudiante_seccion, error } = await supabase
        .from("estudiante_seccion")
        .select("*,estudiante(*, usuario(*))")
        .eq("seccion_id", 2);
      let { data: seccion, err } = await supabase
        .from("seccion")
        .select("*, asignatura!inner(*)")
        .eq("id", 2);

      let cantidadEstudiantes = estudiante_seccion.length;
      let nombreAsignatura = seccion[0].asignatura.asignatura_nombre;
      let asignaturaSeccion = seccion[0].seccion_numero;
      let newEstudiantes = [];
      estudiante_seccion.map((estudiante) => {
        newEstudiantes.push([
          estudiante.estudiante_id,
          estudiante.estudiante.usuario.usuario_nombre,
          estudiante.calificacion,
        ]);
      });
      setEstudiantes(newEstudiantes);
      setAsigNombre(nombreAsignatura + " " + asignaturaSeccion);
    }
    fetchData();
  }, []);

  return (
    <SubjectsTaughtContainer>
      <h2>Asignatura: {asigNombre}</h2>
      <div className="TaughtListInfoContainer">
        <GenericTable
          title="---"
          columns={["ID", "Nombre", "Calificacion Actual"]}
          data={Estudiantes}
        />
      </div>
    </SubjectsTaughtContainer>
  );
};

export default SubjectsTaughtInformation;
