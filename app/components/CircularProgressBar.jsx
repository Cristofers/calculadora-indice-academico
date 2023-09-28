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
  border-radius: 10px;
  color: white;

  .quantity {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  p {
    font-size: 16px;
    text-align: center;
    transform: translateY(-5px);
  }
`;

const DoughtElementContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DoughtElement = styled(Doughnut)`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
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
      <DoughtElementContainer>
        <DoughtElement data={Data} />
        <p className="quantity">{number}</p>
      </DoughtElementContainer>
      <p className="DescriptionText">{text}</p>
    </CircularProgressBarContainer>
  );
};

export default CircularProgressBar;
