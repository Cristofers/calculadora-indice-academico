"use client";
import styled from "styled-components";
import Image from "next/image";

const CerrarSesionContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  border-radius: 11.72px;
  background-color: #c2c0a6;
  width: 100%;
  height: 31.25px;
  text-align: left;
  font-size: 9.38px;
  color: black;
  font-family: "Open Sans";

  p {
    font-size: 12px;
  }
  img {
    position: absolute;
    left: 10px;
  }
`;

const CloseSesionButton = () => {
  return (
    <CerrarSesionContainer>
      <Image
        src="./next.svg"
        alt="Picture of the author"
        width={25}
        height={25}
      />
      <p>Cerrar sesión</p>
    </CerrarSesionContainer>
  );
};

export default CloseSesionButton;
