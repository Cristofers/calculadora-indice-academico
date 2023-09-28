"use client";
import React from "react";
import styled from "styled-components";
import Dashboard from "../../components/Dashboard";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 200px 1fr 100px;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash content ."
    "dash content ."
    "dash content ."
    "dash content .";

  div:nth-child(1) {
    grid-area: dash;
  }

  div:nth-child(2) {
    grid-area: content;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: #efefef;
  border-radius: 20px;
  padding: 0 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .contentSection {
    width: 100%;
    max-height: 40%;
  }

  h2 {
    color: #024554;
    font-size: 50px;
  }

  .contentHeader {
    background-color: #6a8c69;
    color: white;
    font-size: 20px;
    margin-top: 10px;
    display: flex;
    width: 100%;
    /* margin-top: 10px; */
    justify-content: space-evenly;
    align-items: center;
    padding: 2.5px 0;
  }

  .actualSubjectsElements {
    width: 100%;
    height: 100%;
    flex-direction: column;
    color: black;
    background-color: white;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.1rem;
      background-color: transparent;
    }
  }

  .actualSubjectElement {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 5px;

    p {
      width: 15%;
      text-align: center;
      padding: 5px 0;
    }
  }
`;

const StudentSubjectSelection = () => {
  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Selección de asignaturas</h2>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Listado de asignaturas a seleccionar para el trimestre</p>
            <p>AGOSTO - OCTUBRE 2021</p>
          </div>
        </div>

        <div className="contentSection">
          <div className="contentHeader">
            <p>Asignaturas</p>
          </div>
          <div className="actualSubjectsElements">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((element, idx) => (
              <div className="actualSubjectElement" key={idx}>
                <p>CBM102-02</p>
                <p>CALCULO DIFERENCIAL</p>
                <p>5</p>
                <p>NATANAEL UREÑA CASTILLO</p>
                <button>Remover</button>
              </div>
            ))}
          </div>
        </div>

        <div className="contentSection">
          <div className="contentHeader">
            <p>Selecciones Disponibles</p>
            <form action="">
              <input type="search" name="" id="" placeholder="Buscar..." />
              <input type="button" value="Buscar" />
            </form>
          </div>
          <div className="actualSubjectsElements">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((element) => (
              <div className="actualSubjectElement">
                <p>CBM102-02</p>
                <p>CALCULO DIFERENCIAL</p>
                <p>5</p>
                <p>NATANAEL UREÑA CASTILLO</p>
                <button>Agregar</button>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default StudentSubjectSelection;
