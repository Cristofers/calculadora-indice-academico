"use client";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import GeneralData from "@/components/GeneralData";
import styled from "styled-components";
import Notices from "../../components/Notices";
import { useRouter } from "next/navigation";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 200px repeat(4, 1fr) 100px;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash General General Advices"
    "dash . . ."
    "dash . . ."
    "dash . . .";

  div:nth-child(1) {
    grid-area: dash;
  }

  div:nth-child(2) {
    grid-area: General;
  }

  div:nth-child(3) {
    grid-area: Advices;
  }
`;

const AdminMain = () => {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") != 3) {
      router.push("./");
    }
  }, []);

  return (
    <Container>
      <Dashboard />
      <GeneralData />
      <Notices />
    </Container>
  );
};

export default AdminMain;
