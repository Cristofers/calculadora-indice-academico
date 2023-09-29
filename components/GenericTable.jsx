"use client";
import styled from "styled-components";
import React from "react";

const TableContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 10.38px;
  color: #fff;
  font-family: "Open Sans";
  margin-top: 10px;
  border-radius: 20px;
  background-color: #e8e8e8;
  max-width: 100%;

  h2 {
    text-align: left;
    font-size: 28px;
    color: #000;
    height: 15%;
  }

  .SubjectsTakingList {
    border-radius: 17.29px;
    background-color: #fff;
    border: 2.6px solid #6a8c69;
    box-sizing: border-box;
    width: 95%;
    margin: 10px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0.1rem; /* Ancho muy pequeño */
      background-color: transparent; /* Color de fondo transparente */
    }
  }
`;

const TableContent = styled.div`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  background-color: #6a8c69;
  display: table;

  .tr {
    width: 100%;
    height: 25px;
    display: table-row;

    &.head {
      font-size: 18px;
    }

    &.body {
      font-size: 14px;
      background-color: white;
      color: black;
    }
  }

  .col {
    display: table-cell;
    padding: 12px;

    p {
      margin: auto;
    }
  }
`;

const GenericTable = ({ title = "", columns = [], data = [] }) => {
  console.log(data);
  return (
    <TableContainer>
      {title != "" && <h2>{title}</h2>}
      <div className="SubjectsTakingList">
        <TableContent>
          <div className="tr head">
            {columns.map((col, idx) => (
              <div className="col" key={idx}>
                {col}
              </div>
            ))}
          </div>
          {Array.isArray(data) && (
            <>
              {data.map((dataElements, idx) => (
                <div key={idx} className="tr body">
                  {dataElements.map((element, idx2) => (
                    <div className="col" key={idx + "_" + idx2}>
                      {element}
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </TableContent>
      </div>
    </TableContainer>
  );
};

export default GenericTable;
