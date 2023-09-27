"use client";
import styled from "styled-components";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const CircularProgressBarContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  background-color: #53736a;
  width: 200px;
  height: 100%;
  border-radius: 10px;

  .quantity {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  p {
    font-size: 16px;
  }
`;

const DoughtElementContainer = styled.div``;

const DoughtElement = styled(Doughnut)`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
`;

const CircularProgressBar = ({
  number = 10,
  text = "Cantidad de estudiantes",
  Data = {
    datasets: [
      {
        //   label: "My First Dataset",
        data: [10, 40],
        backgroundColor: "white",
        backgroundColor: ["#C2C0A6", "#ffffff"],
      },
    ],
  },
}) => {
  return (
    <CircularProgressBarContainer>
      <p className="quantity">{number}</p>
      <DoughtElementContainer>
        <DoughtElement data={Data} />
      </DoughtElementContainer>
      <p>{text}</p>
    </CircularProgressBarContainer>
  );
};

export default CircularProgressBar;
