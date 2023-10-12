"use client";
import React from "react";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

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

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const usuario = 1104369;//esta variable debe ser sustituida por el id del usuario que este registrado
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [Data, setData] = useState([
    {
      usuario: "",
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      let { data: avisos, error } = await supabase
        .from("avisos")
        .select("*")
        .eq('usuario_id', usuario);
      console.log("avisos: "+ avisos[0].avisos_descripcion);  
      setData(avisos);
    }
    fetchData();
  }, []);

  return (
    <NoticesContainer>
      <h2>Avisos</h2>
      <NoticesList>
        {Data.map((element) => (
          <p>{element.avisos_descripcion}</p>
        ))}
      </NoticesList>
    </NoticesContainer>
  );
};

export default Notices;
