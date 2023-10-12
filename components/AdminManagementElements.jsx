import styled from "styled-components";
import GeneralStyles from "@/app/generalStyle";
import Link from "next/link";

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

export const ContentButtonAdder = styled(Link)`
  opacity: 0.5;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: ${GeneralStyles.secundaryColor};
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  &:hover {
    filter: brightness(1.35);
    width: 100px;
    height: 100px;
    opacity: 1;
  }
`;

export const Content = styled.div`
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
    max-height: 90%;
  }

  h2 {
    color: #024554;
    font-size: 50px;
  }

  .contentHeader {
    background-color: ${GeneralStyles.secundaryColor};
    color: white;
    font-size: 20px;
    margin-top: 10px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    padding: 2.5px 0;
  }

  .contentSubjectsElements {
    width: 100%;
    height: 85%;
    /* flex-direction: column; */
    color: black;
    background-color: white;
    overflow-y: scroll;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;

    &::-webkit-scrollbar {
      width: 0.1rem;
      background-color: transparent;
    }
  }

  .contentSubjectElement,
  .contentSubjectElementTitle {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin-top: 5px; */
    min-height: 65px;

    &:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.1);
    }

    p,
    button {
      width: 18%;
      text-align: center;
      padding: 5px 0;
      height: 100%;
    }

    div {
      display: flex;
      justify-content: space-around;
      width: 25%;

      p {
        width: 100%;
      }

      button {
        border-radius: 15px;
        padding: 10px;
        background-color: #c2c0a6;
        width: 45%;
        text-align: center;
      }

      a {
        width: 45%;
        button {
          width: 100%;
        }
      }
    }
  }

  .contentSubjectElementTitle {
    background-color: ${GeneralStyles.secundaryColor};
    opacity: 0.75;
    min-height: 20px;
    color: white;
  }
`;
