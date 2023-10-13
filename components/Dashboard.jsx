"use client";
import styled from "styled-components";
import Image from "next/image";
import TinyUserBox from "./TinyUserBox";
import CloseSesionButton from "./CloseSesion";
import { useState, useEffect } from "react";
import Link from "next/link";
import GeneralStyles from "@/app/generalStyle";
import { useRouter } from "next/navigation";

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

    img {
      filter: invert(1);
    }
  }

  & p {
    margin-left: 15px;
    max-width: 50%;
  }
`;

const Dashboard = () => {
  const router = useRouter();
  const [dashElements, setDashElements] = useState([
    { text: "Inicio", icon: "Home", link: "./" },
  ]);

  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") === null) {
      router.push("./");
      return;
    }
    switch (sessionStorage.getItem("usuario_rol").toString() || "") {
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
      case "3":
        setDashElements([
          { text: "Inicio", icon: "Home", link: "./admin-main" },
          {
            text: "Administrar Area Academica",
            icon: "Report",
            link: "./admin-manage-area",
          },
          {
            text: "Administrar Asignatura",
            icon: "Report",
            link: "./admin-manage-asignatura",
          },
          {
            text: "Administrar Carrera",
            icon: "Report",
            link: "./admin-manage-carrera",
          },
          {
            text: "Administrar Edificios",
            icon: "Report",
            link: "./admin-manage-edificio",
          },
          {
            text: "Administrar Estudiantes",
            icon: "Report",
            link: "./admin-manage-estudiante",
          },
          {
            text: "Administrar Profesores",
            icon: "Report",
            link: "./admin-manage-profesor",
          },
          {
            text: "Administrar Administradores",
            icon: "Report",
            link: "./admin-manage-admin",
          },
          { text: "Clasificacion", icon: "Grade", link: "./student-ranking" },
        ]);
        break;
    }
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
