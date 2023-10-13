import styled from "styled-components";
import GeneralStyles from "../generalStyle";

export const Container = styled.div`
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
    max-height: 100%;
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

  .actualSubjectsElements {
    width: 100%;
    height: 70%;
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

  .actualSubjectElement,
  .actualSubjectElementTitle {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin-top: 5px; */
    min-height: 65px;

    p,
    button {
      width: 18%;
      text-align: center;
      padding: 5px 0;
      height: 100%;
    }

    button {
      border-radius: 15px;
      padding: 10px;
      background-color: #c2c0a6;
    }
  }

  .actualSubjectElementTitle {
    background-color: ${GeneralStyles.secundaryColor};
    opacity: 0.75;
    min-height: 20px;
    color: white;
  }
`;
