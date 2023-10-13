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

const SubjectsTaughtInformation = () => {

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [nombreSec, setNombreSec] = useState({seccion:{asignatura:{}}})
  const [Data, setData] = useState([
    [],
  ]);

  
  useEffect(() => {
    async function fetchData() {
      let seccionID = 2;
      let { data: estudiantes,error } = await supabase
        .from("estudiante_seccion")
        .select("*,seccion!inner(*,asignatura!inner(*)), estudiante!inner(*, usuario!inner(*))")
        .eq("seccion_id", seccionID);
      console.log(estudiantes[0]);
      let newArray = [];
      estudiantes.map((element) =>{
        let id = element.estudiante_id;
        let nombre =  element.estudiante.usuario.usuario_nombre + " " + element.estudiante.usuario.usuario_apellido;
        let calificacion =  element.calificacion;
        newArray.push([id, nombre, calificacion, "activo"]);
      });
      console.log("estudiante: ");
      console.log(newArray);
      setNombreSec(estudiantes);
      console.log(nombreSec.seccion.asignatura.asignatura_nombre);
      setData(newArray);
    }
    fetchData();
  }, []);
  
  return (
    <SubjectsTaughtContainer>
      <h2>Nombre de la seccion</h2>
      <div className="TaughtListInfoContainer">
        <GenericTable
          title="---"
          columns={["ID", "Nombre", "Calificacion Actual", "Acciones"]}
          data={Data}
        />
        <CircularProgressBar />
      </div>
    </SubjectsTaughtContainer>
  );
};

export default SubjectsTaughtInformation;
