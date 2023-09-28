"use client";
import React from "react";
import Dashboard from "../components/Dashboard";
import styled from "styled-components";
import GeneralStudentData from "../components/GeneralData";
import Notices from "../components/Notices";
import SubjectsTaught from "../components/SubjectsTaught";

const TeacherContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 200px repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash general general notices"
    "dash table table table"
    "dash table table table"
    "dash table table table"
    "dash . . .";

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
    grid-area: table;
  }
`;

function TeacherMain() {
  return (
    <TeacherContainer>
      <Dashboard />
      <GeneralStudentData />
      <Notices />
      <SubjectsTaught />
    </TeacherContainer>
  );
}

export default TeacherMain;
