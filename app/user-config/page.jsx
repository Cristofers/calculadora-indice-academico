"use client";
import React from "react";
import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import Image from "next/image";
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;

  grid-template-areas:
    "dash content"
    "dash content"
    "dash content"
    "dash content";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: 024554;
    font-size: 50px;
    width: 50%;
    margin-bottom: 20px;
    text-align: center;
  }

  label {
    margin-left: 20px;
    font-size: 25px;
  }

  form {
    display: flex;
    width: 50%;
    flex-direction: row;
    justify-content: space-between;

    .imageInformation {
      position: relative;
      width: 40%;
      overflow: visible;
      img {
        border-radius: 50px;
        height: 100%;
        width: 100%;
      }

      .pContainer {
        position: absolute;
        color: black;
        top: 0;
        font-size: 50px;
        background-color: purple;
        border-radius: 50%;
        width: 50px;
        height: 50px;

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        z-index: 20;
      }
    }

    .BasicInformation {
      width: 55%;
      input[type="text"],
      input[type="password"],
      textarea {
        background-color: #eeeeee;
        padding: 10px;
        border-radius: 10px;
        font-size: 20px;
      }

      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
      }

      .buttonContainer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        button {
          padding: 5px;
          font-size: 20px;
          border-radius: 5px;
          color: white;
          background-color: #c4c4c4;
          margin-left: 10px;

          &:nth-child(1) {
            background-color: #024554;
          }
        }
      }
    }
  }
`;

const UserConfig = () => {
  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Configuración de Usuario</h2>
        <form action="">
          <div className="imageInformation">
            <Image
              src="/profilePictures/Default.png"
              alt="Picture of the author"
              width={500}
              height={500}
            />
            <div className="pContainer">
              <p>+</p>
            </div>
          </div>

          <div className="BasicInformation">
            <div className="password">
              <label htmlFor="pass">Contraseña</label>
              <input type="password" id="pass" />
            </div>

            <div className="phone">
              <label htmlFor="phone">Telefono</label>
              <input type="text" id="phone" />
            </div>

            <div className="description">
              <label htmlFor="desc">Descripción</label>
              <textarea id="desc"></textarea>
            </div>

            <div className="buttonContainer">
              <button>Actualizar</button>
              <button>Cancelar</button>
            </div>
          </div>
        </form>
      </Content>
    </Container>
  );
};

export default UserConfig;
