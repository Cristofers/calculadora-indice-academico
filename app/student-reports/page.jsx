"use client";
import React from "react";
import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import GeneralStudentData from "../../components/GeneralStudentData";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const StudentReportContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash rest"
    "dash rest"
    "dash rest"
    "dash rest";

  .studentReportElementsContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: scroll;
    grid-area: rest;

    &::-webkit-scrollbar {
      width: 0.1rem; /* Ancho muy pequeño */
      background-color: transparent; /* Color de fondo transparente */
    }

    .studentReportElement {
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;

      h2 {
        width: 100%;
      }
    }
  }

  div:nth-child(1) {
    grid-area: dash;
  }
`;

const StudentReport = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [Trymestry, setTrymestry] = useState(1);

  useEffect(() => {
    async function fetchData() {
      let { data: estudiante, error } = await supabase
        .from("estudiante")
        .select("estudiante_trimestre")
        .eq("estudiante_id", sessionStorage.getItem("usuario_id"));

      await setTrymestry(estudiante[0]);
    }
    fetchData();
    console.log(Trymestry);
  }, []);
  return (
    <StudentReportContainer>
      <Dashboard />
      <div className="studentReportElementsContainer">
        <div className="studentReportElement">
          <h2>Reporte General</h2>
          <GeneralStudentData />
        </div>
        <div className="studentReportElement">
          <h2>Octubre - Enero</h2>
          <GeneralStudentData trymestry={1} />
        </div>
        <div className="studentReportElement">
          <h2>Enero - Marzo</h2>
          <GeneralStudentData trymestry={2} />
        </div>
      </div>
    </StudentReportContainer>
  );
};

export default StudentReport;
