"use client";
import styled from "styled-components";
import React from "react";
import Dashboard from "../../components/Dashboard";
import GeneralData from "../../components/GeneralData";
import Notices from "../../components/Notices";
import GeneralStudentData from "../../components/GeneralStudentData";
import SubjectsTaking from "../../components/SubjectsTaking (Student)";

const StudentContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 200px repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash general general notices ."
    "dash studentData studentData studentData ."
    "dash asignaturas asignaturas asignaturas ."
    "dash asignaturas asignaturas asignaturas ."
    "dash asignaturas asignaturas asignaturas .";

  div:nth-child(1) {
    grid-area: dash;
  }

  div:nth-child(2) {
    grid-area: general;
  }

  div:nth-child(3) {
    grid-area: notices;
  }

  div:nth-child(4) {
    grid-area: studentData;
  }

  div:nth-child(5) {
    grid-area: asignaturas;
  }
`;

function StudentMain() {
  return (
    <StudentContainer>
      <Dashboard />
      <GeneralData />
      <Notices />
      <GeneralStudentData />
      <SubjectsTaking />
    </StudentContainer>
  );
}

export default StudentMain;
