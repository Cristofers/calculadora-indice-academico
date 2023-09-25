"use client";
import styled from "styled-components";

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
    text-align: left;
    font-size: 28px;
    color: #000;
  }

  .SubjectsTaughtList {
    border-radius: 17.29px;
    background-color: #fff;
    border: 2.6px solid #6a8c69;
    box-sizing: border-box;
    width: 95%;
    height: 100%;
    margin: 10px;
    /* height: 322.49px; */
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

const SubjectsTaught = () => {
  return (
    <SubjectsTaughtContainer>
      <h2>Asignaturas Impartidas</h2>
      <div className="SubjectsTaughtList">
        <SubjectTable>
          <thead>
            <tr>
              <th>Sección</th>
              <th>Cr.</th>
              <th>Asignatura</th>
              <th>Aula</th>
              <th>Lun</th>
              <th>Mar</th>
              <th>Mi</th>
              <th>Ju</th>
              <th>Vi</th>
              <th>Sa</th>
              <th>Cantidad de estudiantes</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((element) => (
              <tr>
                <td>Sección</td>
                <td>Cr.</td>
                <td>Asignatura</td>
                <td>Aula</td>
                <td>Lun</td>
                <td>Mar</td>
                <td>Mi</td>
                <td>Ju</td>
                <td>Vi</td>
                <td>Sa</td>
                <td>Cantidad de estudiantes</td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </SubjectTable>
      </div>
    </SubjectsTaughtContainer>
  );
};

export default SubjectsTaught;
