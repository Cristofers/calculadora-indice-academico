"use client";
import styled from "styled-components";

const NoticesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;
  font-size: 26.56px;
  color: #000;
  font-family: "Open Sans";

  border-radius: 15.63px;
  background-color: #e8e8e8;

  h2 {
    display: inline-block;
    width: 100%;
  }
`;

const NoticesList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16.18px;
  background-color: #fff;
  border: 2.4px solid #6a8c69;
  box-sizing: border-box;
  width: 90%;
  height: 50%;
  margin: 10px;

  p {
    font-size: 12.5px;
    text-align: left;
    display: inline-block;
    width: 127px;
  }
`;

const Notices = () => {
  return (
    <NoticesContainer>
      <h2>Avisos</h2>
      <NoticesList>
        <p>Usted no tiene avisos</p>
      </NoticesList>
    </NoticesContainer>
  );
};

export default Notices;
