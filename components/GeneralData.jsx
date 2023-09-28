"use client";
import styled from "styled-components";

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
      font-size: 12px;
      text-align: left;
    }

    p {
      margin-left: 25px;
      font-size: 10px;
    }
  }

  .title {
    align-self: left;
    font-size: 26.56px;
  }
`;

const GeneralData = () => {
  // const type = 0;
  const type = 1;
  // const type = 2;

  return (
    <DatosGeneralesContainer>
      <InformationContainer>
        <h2 className="title">Datos generales</h2>
        <div className="InformationContainerElement">
          <span>Nombre:</span>
          <p>Cristofers Valdez Quintin</p>
        </div>
        <div className="InformationContainerElement">
          <span>ID:</span>
          <p>1104326</p>
        </div>
        <div className="InformationContainerElement">
          <span>Área Académica:</span>
          <p>ÁREA DE INGENIERIA</p>
        </div>
        {type == 1 ? (
          <div className="InformationContainerElement">
            <span>Creditos Aprobados:</span>
            <p>21 de 279</p>
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
