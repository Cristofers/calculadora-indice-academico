"use client";
import React from "react";
import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import GenericTable from "../../components/GenericTable";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import SubjectsTaking from "@/components/SubjectsTaking (Student)";

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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [TrimestryList, setTrimestryList] = useState([]);

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
          .select("trimestre_cursado")
          .eq("estudiante_id", sessionStorage.getItem("usuario_id"))
          .eq("trimestre_cursado", index);

        console.log(index, estudiante_seccion[0]);
        // estudiante_seccion.map((trymestry) => {
        if (estudiante_seccion[0]) {
          newTrymestry.push(estudiante_seccion[0].trimestre_cursado);
        }
        // });
      }
      console.log(newTrymestry);
      setTrimestryList(newTrymestry);
    }
    fetchData();
  }, []);

  // const GetTrymestrySubjectsData = async (trymestry) => {
  //   let { data: estudiante_seccion, error } = await supabase
  //     .from("estudiante_seccion")
  //     .select("*,seccion(*,asignatura(*))")
  //     .eq("trimestre_cursado", trymestry)
  //     .eq("estudiante_id", sessionStorage.getItem("usuario_id"));

  //   let newArray = [];
  //   estudiante_seccion.map((element) => {
  //     newArray.push([
  //       element.seccion.asignatura_codigo +
  //         " - " +
  //         element.seccion.seccion_numero,
  //       element.seccion.asignatura.asignatura_creditos,
  //       element.seccion.asignatura.asignatura_nombre,
  //       element.aula_codigo,
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       element.profesor_nom,
  //     ]);
  //   });
  //   return newArray;
  // };

  const GetCiclo = (ciclo) => {
    switch (ciclo) {
      case 1:
        return "Enero - Marzo";
      case 2:
        return "Enero - Marzo";
      case 3:
        return "Enero - Marzo";
      case 4:
        return "Enero - Marzo";
    }
  };

  return (
    <PageContainer>
      <Dashboard />
      <Content>
        <h2 className="title">Historial académico</h2>
        <div className="historicContainer">
          {TrimestryList.map((element, idx) => (
            <SubjectsTaking
              trymestry={element}
              key={1}
              title={GetCiclo(element)}
            />
            // <GenericTable
            //   key={idx}
            //   title={GetCiclo(element)}
            //   columns={[
            //     "Seccion",
            //     "Cr",
            //     "Asignatura",
            //     "Aula",
            //     "Lun",
            //     "Mar",
            //     "Mier",
            //     "Ju",
            //     "Vi",
            //     "Sa",
            //     "Profesor",
            //   ]}
            //   data={TrimestryData[idx]}
            // />
          ))}
        </div>
      </Content>
    </PageContainer>
  );
};

export default UserConfig;
