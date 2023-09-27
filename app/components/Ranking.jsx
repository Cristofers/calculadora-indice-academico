"use client";
import React from "react";
import styled from "styled-components";

const RankingExternalContainer = styled.div`
  background-color: #efefef;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const RankingContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 95%;
  height: 90%;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-wrap: wrap;

  .upContent {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 20%;
    .titleSection {
      h2 {
        font-size: 30px;
        color: #024554;
      }
    }

    input {
      max-height: 30%;
      padding: 10px 0;
    }
  }
`;

const RankingElementContainer = styled.div`
  margin-top: 20px;
  overflow-y: scroll;
  width: 90%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.1rem; /* Ancho muy pequeño */
    background-color: transparent; /* Color de fondo transparente */
  }

  .rankingElement {
    width: 100%;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .elementInformation {
      width: 30%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      overflow: visible;
      img {
        height: 25px;
        position: absolute;
        left: -50px;
      }

      p {
        background-color: #dedcdc;
        padding: 5px;
        border-radius: 5px;
        text-align: center;
        min-width: 50px;
      }
    }
  }
`;

const Ranking = () => {
  return (
    <RankingExternalContainer>
      <RankingContainer>
        <div className="upContent">
          <div className="titleSection">
            <h2>Clasificación del índice</h2>
            <p>Del mayor a menor</p>
          </div>
          <input type="search" name="" id="" placeholder="buscar..." />
        </div>

        <RankingElementContainer>
          {[
            "Cristofers",
            "Cristina",
            "Cristofers",
            "Cristina",
            "Cristofers",
            "Cristina",
          ].map((element, index) => (
            <div className="rankingElement">
              <p>{element}</p>
              <div className="elementInformation">
                {index == 0 && (
                  <img
                    src="https://img.freepik.com/vector-premium/medalla-oro-ganador-cintas-rojas-aisladas_53562-5227.jpg"
                    alt="Picture of the author"
                  />
                )}
                {index == 1 && (
                  <img
                    src="https://img.freepik.com/vector-premium/medalla-deportiva-premio-plata-ganadores-cinta-azul-trofeo-segundo-lugar-insignias-honor_599062-3662.jpg"
                    alt="Picture of the author"
                  />
                )}
                {index == 2 && (
                  <img
                    src="https://previews.123rf.com/images/destinacigdem/destinacigdem1610/destinacigdem161000033/66281709-medalla-de-bronce-con-el-n%C3%BAmero-tres-ilustraci%C3%B3n-3d.jpg"
                    alt="Picture of the author"
                  />
                )}
                <p>4.0</p>
                <p>4.0</p>
                <p>Cum Lauder</p>
              </div>
            </div>
          ))}
        </RankingElementContainer>
      </RankingContainer>
    </RankingExternalContainer>
  );
};

export default Ranking;
