"use client";
import styled from "styled-components";
import Image from "next/image";
import TinyUserBox from "./TinyUserBox";
import CloseSesionButton from "./CloseSesion";
import { useState, useEffect } from "react";
import Link from "next/link";
import GeneralStyles from "@/app/generalStyle";
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0px 12px 12px 0px;
  background-color: ${GeneralStyles.primaryColor};
  font-family: "Open Sans";
  width: 100%;
  height: 100%;

  .lastElement:last-child {
    width: 90%;
    position: relative;
    margin-top: auto;
    margin-bottom: 10px;
  }
`;

const DashBoardElement = styled(Link)`
  width: 90%;
  margin: 10px auto;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 7.81px;

  &:hover {
    background-color: #c2c0a6;
    color: #fff;
  }

  & p {
    margin-left: 15px;
  }
`;

const Dashboard = () => {
  const [dashElements, setDashElements] = useState([
    { text: "Inicio", icon: "Home", link: "./" },
  ]);

  useEffect(() => {
    switch (sessionStorage.getItem("usuario_rol").toString()) {
      case "1":
        setDashElements([
          { text: "Inicio", icon: "Home", link: "./student-main" },
          {
            text: "Historial",
            icon: "History",
            link: "./student-academic-history",
          },
          {
            text: "Seleccion",
            icon: "Book",
            link: "./student-subject-selection",
          },
          { text: "Clasificacion", icon: "Grade", link: "./student-ranking" },
        ]);
        break;
      case "2":
        setDashElements([
          { text: "Inicio", icon: "Home", link: "./teacher-main" },
          { text: "Clasificacion", icon: "Grade", link: "./student-ranking" },
        ]);
        break;
    }
    console.log(sessionStorage.getItem("usuario_rol"));
  }, []);

  return (
    <DashboardContainer>
      {dashElements.map((element, index) => (
        <DashBoardElement key={index} href={element.link}>
          {element.icon ? (
            <Image
              src={`/icons/${element.icon}.png`}
              alt="Picture of the author"
              width={52}
              height={52}
            />
          ) : (
            <Image
              src="./next.svg"
              alt="Picture of the author"
              width={52}
              height={52}
            />
          )}
          {element.text != "" && <p>{element.text}</p>}
        </DashBoardElement>
      ))}
      <div className="lastElement">
        <TinyUserBox />
        <CloseSesionButton />
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
