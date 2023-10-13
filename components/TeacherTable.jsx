"use client";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const TableContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 10.38px;
  color: #fff;
  font-family: "Open Sans";
  margin-top: 10px;
  border-radius: 20px;
  background-color: #e8e8e8;
  max-width: 100%;

  h2 {
    text-align: left;
    font-size: 28px;
    color: #000;
    height: 15%;
  }

  .SubjectsTakingList {
    border-radius: 17.29px;
    background-color: #fff;
    border: 2.6px solid #6a8c69;
    box-sizing: border-box;
    width: 95%;
    margin: 10px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0.1rem; /* Ancho muy pequeño */
      background-color: transparent; /* Color de fondo transparente */
    }
  }
`;

const TableContent = styled.div`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  background-color: #6a8c69;
  display: table;

  .tr {
    width: 100%;
    height: 25px;
    display: table-row;

    &.head {
      font-size: 18px;
    }

    &.body {
      font-size: 14px;
      background-color: white;
      color: black;
    }
  }

  .col {
    display: table-cell;
    padding: 12px;

    p {
      margin: auto;
    }
  }
`;

const TeacherTable = ({ title = "" }) => {
  const [ActualSubjects, setActualSubjects] = useState([]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function fetchData() {
      let { data: estudiante_seccion, error } = await supabase
        .from("seccion")
        .select("*, asignatura (*)")
        .eq("profesor_id", sessionStorage.getItem("usuario_id"));

      setActualSubjects(estudiante_seccion);
    }
    fetchData();
  }, []);

  return (
    <TableContainer>
      {title != "" && <h2>{title}</h2>}
      <div className="SubjectsTakingList">
        <TableContent>
          <div className="tr head">
            <div className="col">Sección</div>
            <div className="col">Cr</div>
            <div className="col">Asignatura</div>
            <div className="col">Aula</div>
            <div className="col">Lun</div>
            <div className="col">Mar</div>
            <div className="col">Mier</div>
            <div className="col">Ju</div>
            <div className="col">Vi</div>
            <div className="col">Sa</div>
          </div>

          {ActualSubjects &&
            ActualSubjects.map((element, idx) => (
              <Link
                key={idx}
                href={{
                  pathname: "./teacher-subject-information",
                  query: { id: element.id },
                }}
                className="tr body"
              >
                <div className="col">
                  {element.asignatura_codigo}-{element.seccion_numero}
                </div>
                <div className="col">
                  {element.asignatura.asignatura_creditos}
                </div>
                <div className="col">
                  {" "}
                  {element.asignatura.asignatura_nombre}
                </div>
                <div className="col">{element.aula_id}</div>
                <div className="col">
                  {element.seccion_dia == "Lunes" &&
                    element.seccion_inicio + "/" + element.seccion_fin}
                </div>
                <div className="col">
                  {element.seccion_dia == "Martes" &&
                    element.seccion_inicio + "/" + element.seccion_fin}
                </div>
                <div className="col">
                  {element.seccion_dia == "Miercoles" &&
                    element.seccion_inicio + "/" + element.seccion_fin}
                </div>
                <div className="col">
                  {element.seccion_dia == "Jueves" &&
                    element.seccion_inicio + "/" + element.seccion_fin}
                </div>
                <div className="col">
                  {element.seccion_dia == "Viernes" &&
                    element.seccion_inicio + "/" + element.seccion_fin}
                </div>
                <div className="col">
                  {element.seccion_dia == "Sabado" &&
                    element.seccion_inicio + "/" + element.seccion_fin}
                </div>
              </Link>
            ))}
        </TableContent>
      </div>
    </TableContainer>
  );
};

export default TeacherTable;
