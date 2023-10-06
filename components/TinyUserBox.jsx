"use client";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const TinyUserBoxContainer = styled(Link)`
  display: flex;
  width: 100%;
  height: 54.69px;
  text-align: left;
  font-size: 9.38px;
  color: #000;
  font-family: "Open Sans";

  img {
    border-radius: 50%;
    min-width: 50px;
    min-height: 50px;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 10px;
    align-items: center;
    align-content: center;
    justify-content: center;

    p {
      margin-right: auto;
    }

    .UserName {
      font-size: 14px;
    }
  }
`;

const TinyUserBox = () => {
  return (
    <TinyUserBoxContainer href="./user-config">
      <Image
        src="/profilePictures/Default.png"
        alt="Picture of the author"
        width={25}
        height={25}
      />
      <div>
        <p className="UserName">
          {sessionStorage.getItem("usuario_nombre") +
            " " +
            sessionStorage.getItem("usuario_apellido")}
        </p>
        <p>Ver perfil</p>
      </div>
    </TinyUserBoxContainer>
  );
};

export default TinyUserBox;
