"use client";
import styled from "styled-components";
import Image from "next/image";
import TinyUserBox from "./TinyUserBox";
import CloseSesionButton from "./CloseSesion";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0px 12px 12px 0px;
  background-color: #53736a;
  width: 100%;
  height: 100%;

  .lastElement:last-child {
    width: 90%;
    position: relative;
    margin-top: auto;
    margin-bottom: 10px;
  }
`;

const DashBoardElement = styled.div`
  width: 90%;
  height: 40px;
  margin: 10px auto;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 7.81px;

  &:hover {
    background-color: #c2c0a6;
    color: #fff;
  }

  & p {
    margin-left: 25px;
  }
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      {["Inicio", "Clasificacion"].map((element) => (
        <DashBoardElement>
          <Image
            src="./next.svg"
            alt="Picture of the author"
            width={25}
            height={25}
          />
          <p>{element}</p>
        </DashBoardElement>
      ))}
      <div className="lastElement">
        <TinyUserBox />
        <CloseSesionButton />
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
