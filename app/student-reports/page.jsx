"use client";
import React from "react";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import GeneralStudentData from "../components/GeneralStudentData";

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
          <GeneralStudentData />
        </div>
        <div className="studentReportElement">
          <h2>Enero - Marzo</h2>
          <GeneralStudentData />
        </div>
      </div>
    </StudentReportContainer>
  );
};

export default StudentReport;
