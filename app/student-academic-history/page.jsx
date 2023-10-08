"use client";
import React from "react";
import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import SubjectsTaking from "@/components/SubjectsTaking (Student)";
import { useRouter } from "next/navigation";

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash content"
    "dash content"
    "dash content"
    "dash content";

  div:nth-child(1) {
    grid-area: dash;
  }

  div:nth-child(2) {
    grid-area: content;
  }
`;

const Content = styled.div`
  display: block;
  height: 100%;
  overflow-y: scroll;

  .title {
    color: #024554;
    font-size: 50px;
  }

  .historicContainer {
    display: flex;
    flex-direction: column;
  }
`;

const UserConfig = () => {
  const [TrimestryList, setTrimestryList] = useState([]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") != 1) {
      router.push("./");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const newTrymestry = [];
      for (
        let index = sessionStorage.getItem("estudiante_trimestre");
        index > 0;
        index--
      ) {
        let { data: estudiante_seccion, error } = await supabase
          .from("estudiante_seccion")
          .select("*")
          .eq("estudiante_id", sessionStorage.getItem("usuario_id"))
          .eq("trimestre_cursado", index);

        // estudiante_seccion.map((trymestry) => {
        if (estudiante_seccion[0]) {
          newTrymestry.push(estudiante_seccion[0]);
          console.log(estudiante_seccion[0]);
        }
        // });
      }

      setTrimestryList(newTrymestry);
    }
    fetchData();
  }, []);

  const GetCiclo = (ciclo) => {
    switch (ciclo) {
      case 1:
        return "Febrero - Abril";
      case 2:
        return "Mayo - Julio";
      case 3:
        return "Agosto - Octubre";
      case 4:
        return "Noviembre - Enero";
    }
  };

  return (
    <PageContainer>
      <Dashboard />
      <Content>
        <h2 className="title">Historial Académico</h2>
        <div className="historicContainer">
          {TrimestryList.map((element, idx) => (
            <SubjectsTaking
              trymestry={element.trimestre_cursado}
              key={idx}
              title={GetCiclo(element.ciclo) + " " + element.year}
            />
          ))}
        </div>
      </Content>
    </PageContainer>
  );
};

export default UserConfig;
