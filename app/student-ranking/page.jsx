"use client";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import styled from "styled-components";
import Ranking from "../../components/Ranking";
import { useRouter } from "next/navigation";

const StudentRanking = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 200px repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash Ranking Ranking Ranking Ranking"
    "dash Ranking Ranking Ranking Ranking"
    "dash Ranking Ranking Ranking Ranking"
    "dash Ranking Ranking Ranking Ranking"
    "dash Ranking Ranking Ranking Ranking";

  div:nth-child(1) {
    grid-area: dash;
  }

  div:nth-child(2) {
    grid-area: Ranking;
  }
`;

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") == null) {
      router.push("./");
    }
  }, []);
  return (
    <StudentRanking>
      <Dashboard />
      <Ranking />
    </StudentRanking>
  );
};

export default page;
