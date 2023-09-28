"use client";
import React from "react";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import GenericTable from "../components/GenericTable";

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
  return (
    <PageContainer>
      <Dashboard />
      <Content>
        <h2 className="title">Historial académico</h2>
        <div className="historicContainer">
          {[
            "AGOSTO - OCTUBRE 2021",
            "OCTUBRE - DICIEMBRE 2021",
            "ENERO - X 20XX",
            "AGOSTO - OCTUBRE 2021",
            "OCTUBRE - DICIEMBRE 2021",
            "ENERO - X 20XX",
          ].map((element, idx) => (
            <GenericTable
              key={idx}
              title={element}
              columns={[
                "Seccion",
                "Cr",
                "Asignatura",
                "Aula",
                "Lun",
                "Mar",
                "Mier",
                "Ju",
                "Vi",
                "Sa",
                "Profesor",
              ]}
              data={[
                [
                  "Seccion",
                  "Cr",
                  "Asignatura",
                  "Aula",
                  "Lun",
                  "Mar",
                  "Mier",
                  "Ju",
                  "Vi",
                  "Sa",
                  "Profesor",
                ],
                [
                  "Seccion",
                  "Cr",
                  "Asignatura",
                  "Aula",
                  "Lun",
                  "Mar",
                  "Mier",
                  "Ju",
                  "Vi",
                  "Sa",
                  "Profesor",
                ],
                [
                  "Seccion",
                  "Cr",
                  "Asignatura",
                  "Aula",
                  "Lun",
                  "Mar",
                  "Mier",
                  "Ju",
                  "Vi",
                  "Sa",
                  "Profesor",
                ],
                [
                  "Seccion",
                  "Cr",
                  "Asignatura",
                  "Aula",
                  "Lun",
                  "Mar",
                  "Mier",
                  "Ju",
                  "Vi",
                  "Sa",
                  "Profesor",
                ],
                [
                  "Seccion",
                  "Cr",
                  "Asignatura",
                  "Aula",
                  "Lun",
                  "Mar",
                  "Mier",
                  "Ju",
                  "Vi",
                  "Sa",
                  "Profesor",
                ],
              ]}
            />
          ))}
        </div>
      </Content>
    </PageContainer>
  );
};

export default UserConfig;
