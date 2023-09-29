"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LSH_GetUserInformation,
  LSH_UserLogged,
} from "@/app/LocalStorageHandler";

const DatosGeneralesContainer = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 15.63px;
  background-color: #e8e8e8;
  text-align: center;
  font-size: 9.38px;
  color: #000;
  font-family: "Open Sans";

  img {
    border-radius: 10px;
    margin: 10px;
  }
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin-left: 25px;
  height: 100%;

  .InformationContainerElement {
    display: flex;

    span {
      font-weight: bold;
      font-size: 25px;
      text-align: left;
    }

    p {
      margin-left: 25px;
      font-size: 20px;
    }
  }

  .title {
    align-self: left;
    font-size: 26.56px;
  }
`;

const GeneralData = () => {
  const router = useRouter();
  const [User, setUser] = useState({});

  useEffect(() => {
    if (LSH_UserLogged) {
      setUser(LSH_GetUserInformation);
    } else {
      router.push("/student-main");
    }
  }, []);

  return (
    <DatosGeneralesContainer>
      <InformationContainer>
        <h2 className="title">Datos generales</h2>
        <div className="InformationContainerElement">
          <span>Nombre:</span>
          <p>{User.usuario_nombre + " " + User.usuario_apellido}</p>
        </div>
        <div className="InformationContainerElement">
          <span>ID:</span>
          <p>{User.usuario_id}</p>
        </div>
        <div className="InformationContainerElement">
          <span>Área Académica:</span>
          <p>{User.area_nombre}</p>
        </div>
        {User.usuario_rol == 1 ? (
          <div className="InformationContainerElement">
            <span>Asignaturas Aprobadas:</span>
            <p>
              {User.estudiante_asignaturas_aprobadas} de{" "}
              {User.carrera_asignatura_total}
            </p>
          </div>
        ) : (
          <></>
        )}
      </InformationContainer>
      <img
        // src="./next.svg"
        src="https://assetsio.reedpopcdn.com/Honkai-Star-Rail-Silver-Wolf-best-build%2C-Ascension-materials%2C-Trace-materials%2C-team%2C-and-Light-Cone-cover.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp"
        alt="Picture of the author"
        // width={25}
        // height={25}
      />
    </DatosGeneralesContainer>
  );
};

export default GeneralData;
