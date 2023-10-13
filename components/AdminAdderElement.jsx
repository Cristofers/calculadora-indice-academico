import styled from "styled-components";
import GeneralStyles from "@/app/generalStyle";

export const Container = styled.div`
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

export const Content = styled.div`
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
`;

export const Formulary = styled.form`
  display: flex;
  width: 50%;
  flex-direction: row;
  flex-direction: column;
  justify-content: space-between;

  width: 55%;
  input[type="text"],
  input[type="number"],
  input[type="range"],
  input[type="password"],
  select,
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
`;
