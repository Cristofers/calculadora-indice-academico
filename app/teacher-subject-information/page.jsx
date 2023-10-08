"use client";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import GeneralStudentData from "../../components/GeneralData";
import styled from "styled-components";
import Notices from "../../components/Notices";
import SubjectsTaughtInformation from "../../components/SubjectsTaughtInformation";
import { useRouter } from "next/navigation";

const TeacherContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 200px repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash general general notices ."
    "dash table table table ."
    "dash table table table ."
    "dash table table table ."
    "dash progress . . .";

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

  div:nth-child(5) {
    grid-area: progress;
  }
`;

function TeacherSubjetInformation() {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") != 2) {
      router.push("./");
    }
  }, []);

  return (
    <TeacherContainer>
      <Dashboard />
      <GeneralStudentData />
      <Notices />
      <SubjectsTaughtInformation />
    </TeacherContainer>
  );
}

export default TeacherSubjetInformation;
