"use client";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LSH_GetUserInformation,
  LSH_UserLogged,
} from "@/app/LocalStorageHandler";

const DatosGeneralesContainer = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
    height: 70%;
    width: 30%;
  }
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  /* margin-left: 25px; */
  height: 100%;

  .InformationContainerElement {
    display: flex;

    span {
      font-weight: bold;
      font-size: 20px;
      text-align: left;
    }

    p {
      margin-left: 5px;
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
        {/* Estudiante */}
        {User.usuario_rol == 1 ? (
          <>
            <div className="InformationContainerElement">
              <span>Carrera:</span>
              <p>{User.carrera_nombre}</p>
            </div>
            <div className="InformationContainerElement">
              <span>Asignaturas aprobadas:</span>
              <p>
                {User.estudiante_asignaturas_aprobadas} de{" "}
                {User.carrera_asignatura_total}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </InformationContainer>
      <Image
        src="/profilePictures/Default.png"
        alt="Picture of the author"
        width={25}
        height={25}
      />
    </DatosGeneralesContainer>
  );
};

export default GeneralData;
