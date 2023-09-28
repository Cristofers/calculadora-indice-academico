"use client";
import styled from "styled-components";
import Image from "next/image";
import TinyUserBox from "./TinyUserBox";
import CloseSesionButton from "./CloseSesion";
import { useState } from "react";
import Link from "next/link";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0px 12px 12px 0px;
  background-color: #53736a;
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
  height: 40px;
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
    margin-left: 25px;
  }
`;

const Dashboard = ({ supa }) => {
  console.log(supa);
  // const [dashElements, setDashElements] = useState(["Inicio", "Clasificacion"]);
  const [dashElements, setDashElements] = useState([
    { text: "Inicio", icon: "Home", link: "./student-main" },
    { text: "Reportes", icon: "Report", link: "./student-reports" },
    { text: "Historial", icon: "History", link: "./student-academic-history" },
    { text: "Seleccion", icon: "Book", link: "./student-subject-selection" },
    { text: "Clasificacion", icon: "Grade", link: "./student-ranking" },
  ]);
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
