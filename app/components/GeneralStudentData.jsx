"use client";
import styled from "styled-components";
import React from "react";
import CircularProgressBar from "./CircularProgressBar";

const GeneralStudentDataContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

const GeneralStudentData = () => {
  return (
    <GeneralStudentDataContainer>
      <CircularProgressBar
        text="Asignaturas aprobadas de 113"
        number={10}
        Data={{
          datasets: [
            {
              data: [10, 113 + 10],
              borderColor: "transparent",
              backgroundColor: ["#C2C0A6", "#ffffff"],
            },
          ],
        }}
      />
      <CircularProgressBar
        text="Índice General de 4"
        number={4}
        Data={{
          datasets: [
            {
              data: [4],
              borderColor: "transparent",
              backgroundColor: ["#C2C0A6", "#ffffff"],
            },
          ],
        }}
      />
      <CircularProgressBar
        text="Trimestres  cursados de 11 "
        number={2}
        Data={{
          datasets: [
            {
              data: [2, 2 + 11],
              borderColor: "transparent",
              backgroundColor: ["#C2C0A6", "#ffffff"],
            },
          ],
        }}
      />
      <CircularProgressBar
        text="Créditos aprobados de 279"
        number={21}
        Data={{
          datasets: [
            {
              data: [21, 21 + 279],
              borderColor: "transparent",
              backgroundColor: ["#C2C0A6", "#ffffff"],
            },
          ],
        }}
      />
    </GeneralStudentDataContainer>
  );
};

export default GeneralStudentData;
