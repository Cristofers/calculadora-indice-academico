"use client";
import styled from "styled-components";
import React from "react";
import Dashboard from "../components/Dashboard";
import GeneralStudentData from "../components/GeneralData";

const StudentContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 250px repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 10px;
`;

function StudentMain() {
  return (
    <StudentContainer>
      <Dashboard />
      <GeneralStudentData />
    </StudentContainer>
  );
}

export default StudentMain;
