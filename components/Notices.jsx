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

const NoticesQty = styled.div`
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
    font-size: 20px;
    text-align: center;
    display: inline-block;
  }
`;

const Notices = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const usuario = sessionStorage.getItem("usuario_id");
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [Data, setData] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      let { data: avisos, error } = await supabase
        .from("avisos")
        .select("*")
        .eq("usuario_id", usuario);
      setData(avisos);
    }
    fetchData();
  }, []);

  return (
    <NoticesContainer>
      <h2>Avisos</h2>
      <NoticesQty>
        {Data.length > 0 ? (
          <p>Tienes: {Data.length} avisos</p>
        ) : (
          <p>No tienes ningun aviso</p>
        )}
      </NoticesQty>
    </NoticesContainer>
  );
};

export default Notices;
