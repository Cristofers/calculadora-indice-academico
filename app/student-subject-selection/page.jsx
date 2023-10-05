"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GeneralStyles from "../generalStyle";
import Dashboard from "../../components/Dashboard";
import { LSH_UserLogged } from "../LocalStorageHandler";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 200px 1fr 100px;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash content ."
    "dash content ."
    "dash content ."
    "dash content .";

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
  background-color: #efefef;
  border-radius: 20px;
  padding: 0 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .contentSection {
    width: 100%;
    max-height: 40%;
  }

  h2 {
    color: #024554;
    font-size: 50px;
  }

  .contentHeader {
    background-color: ${GeneralStyles.secundaryColor};
    color: white;
    font-size: 20px;
    margin-top: 10px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    padding: 2.5px 0;
  }

  .actualSubjectsElements {
    width: 100%;
    height: 70%;
    /* flex-direction: column; */
    color: black;
    background-color: white;
    overflow-y: scroll;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;

    &::-webkit-scrollbar {
      width: 0.1rem;
      background-color: transparent;
    }
  }

  .actualSubjectElement,
  .actualSubjectElementTitle {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin-top: 5px; */
    min-height: 65px;

    p,
    button {
      width: 18%;
      text-align: center;
      padding: 5px 0;
      height: 100%;
    }

    button {
      border-radius: 15px;
      padding: 10px;
      background-color: #c2c0a6;
    }
  }

  .actualSubjectElementTitle {
    background-color: ${GeneralStyles.secundaryColor};
    opacity: 0.75;
    min-height: 20px;
    color: white;
  }
`;

const StudentSubjectSelection = () => {
  const [ActualTrymestry, setActualTrymestry] = useState([[]]);
  const [ActualTrymestryDate, setActualTrymestryDate] = useState(0);
  const [AvailableSubjects, setAvailableSubjects] = useState([[]]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const router = useRouter();
  if (!LSH_UserLogged()) {
    router.push("/user-login");
    return <></>;
  }

  useEffect(() => {
    async function fetchData() {
      const newTrymestry = [];

      let { data: estudiante_seccion, error } = await supabase
        .from("estudiante_seccion")
        .select("*,seccion(*,asignatura(*))")
        .eq("estudiante_id", sessionStorage.getItem("usuario_id"))
        .eq(
          "trimestre_cursado",
          sessionStorage.getItem("estudiante_trimestre")
        );

      estudiante_seccion.map((element) => {
        newTrymestry.push([
          element.seccion.asignatura.asignatura_codigo,
          element.seccion.asignatura.asignatura_nombre,
          element.seccion.asignatura.asignatura_creditos,
          element.profesor_nom + " " + element.profesor_apellido,
        ]);
      });
      setActualTrymestry(newTrymestry);
      console.log(estudiante_seccion);
      setActualTrymestryDate(estudiante_seccion[0].fecha);
      // ();
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const newTrymestry = [];

      let { data: estudiante_seccion, error } = await supabase
        .from("estudiante_seccion")
        .select("*,seccion(*,asignatura(*))");

      estudiante_seccion.map((element) => {
        newTrymestry.push([
          element.seccion.asignatura.asignatura_codigo,
          element.seccion.asignatura.asignatura_nombre,
          element.seccion.asignatura.asignatura_creditos,
          element.profesor_nom + " " + element.profesor_apellido,
        ]);
      });
      setAvailableSubjects(newTrymestry);
      // ();
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Selección de Asignaturas</h2>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Listado de asignaturas a seleccionar para el trimestre</p>
            <p>{ActualTrymestryDate}</p>
          </div>
        </div>

        <div className="contentSection">
          <div className="contentHeader">
            <p>Asignaturas</p>
          </div>
          <div className="actualSubjectElementTitle">
            <p>Codigo</p>
            <p>Nombre</p>
            <p>Credito</p>
            <p>Profesor</p>
            <p>Total: {ActualTrymestry.length}</p>
          </div>
          <div className="actualSubjectsElements">
            {ActualTrymestry.map((element, idx) => (
              <div className="actualSubjectElement" key={idx}>
                {element.map((element2, idx2) => (
                  <p key={idx2}>{element2.toString().toUpperCase()}</p>
                ))}
                <button>Remover</button>
              </div>
            ))}
          </div>
        </div>

        <div className="contentSection">
          <div className="contentHeader">
            <p>Selecciones Disponibles</p>
            <form action="">
              <input type="search" name="" id="" placeholder="Buscar..." />
              <input type="button" value="Buscar" />
            </form>
          </div>
          <div className="actualSubjectElementTitle">
            <p>Codigo</p>
            <p>Nombre</p>
            <p>Credito</p>
            <p>Profesor</p>
            <p>Total: {AvailableSubjects.length}</p>
          </div>
          <div className="actualSubjectsElements">
            {AvailableSubjects.map((element, idx) => (
              <div className="actualSubjectElement" key={idx}>
                {element.map((element2, idx2) => (
                  <p key={idx2}>{element2.toString().toUpperCase()}</p>
                ))}
                <button>Agregar</button>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default StudentSubjectSelection;
