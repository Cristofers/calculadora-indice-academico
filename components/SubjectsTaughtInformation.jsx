"use client";
import styled from "styled-components";
import CircularProgressBar from "./CircularProgressBar";
import GenericTable from "./GenericTable";

const SubjectsTaughtContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  text-align: center;
  font-size: 10.38px;
  color: #fff;
  font-family: "Open Sans";

  border-radius: 20px;
  background-color: #e8e8e8;
  width: 100%;

  h2 {
    grid-area: title;
    text-align: left;
    font-size: 28px;
    color: #000;
  }

  .TaughtListInfoContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    .SubjectsTaughtList {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 17.29px;
      background-color: #fff;
      border: 2.6px solid #6a8c69;
      box-sizing: border-box;
      width: 70%;
      height: 100%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0.1rem; /* Ancho muy pequeño */
        background-color: transparent; /* Color de fondo transparente */
      }
    }
  }
`;

const SubjectsTaughtInformation = () => {
  return (
    <SubjectsTaughtContainer>
      <h2>Estudiantes de: Calculo Diferencial</h2>
      <div className="TaughtListInfoContainer">
        <GenericTable
          // title="Asignaturas Impartidas"
          columns={["ID", "Nombre", "Calificacion Actual", "Acciones"]}
          data={[["ID", "Nombre", "Calificacion Actual", "Acciones"]]}
        />
        <CircularProgressBar />
      </div>
    </SubjectsTaughtContainer>
  );
};

export default SubjectsTaughtInformation;
