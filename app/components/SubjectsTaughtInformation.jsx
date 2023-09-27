"use client";
import styled from "styled-components";
import CircularProgressBar from "./CircularProgressBar";

const SubjectsTaughtContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  text-align: center;
  font-size: 10.38px;
  color: #fff;
  font-family: "Open Sans";

  border-radius: 20px;
  background-color: #e8e8e8;
  width: 100%;
  /* height: 100%; */

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
    height: 80%;

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
      /* margin: 10px; */
      /* height: 322.49px; */
    }
  }
`;

const SubjectTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  background-color: #6a8c69;

  thead {
    width: 100%;
    height: 25px;
  }

  tbody {
    color: black;
    background-color: white;

    td {
      height: 15px;
    }
  }
`;

const SubjectsTaughtInformation = () => {
  return (
    <SubjectsTaughtContainer>
      <h2>Estudiantes de: Calculo Diferencial</h2>
      <div className="TaughtListInfoContainer">
        <div className="SubjectsTaughtList">
          <SubjectTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre.</th>
                <th>Calificacion Actual</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((element) => (
                <tr key={element}>
                  <td>1104369</td>
                  <td>Cristofers</td>
                  <td>100</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </SubjectTable>
        </div>
        <CircularProgressBar />
      </div>
    </SubjectsTaughtContainer>
  );
};

export default SubjectsTaughtInformation;
