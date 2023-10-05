"use client";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";
import { useRouter } from "next/navigation";
import {
  LSH_GetUserInformation,
  LSH_UserLogged,
} from "@/app/LocalStorageHandler";
import { createClient } from "@supabase/supabase-js";

const GeneralStudentDataContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

const GeneralStudentData = ({ trymestry = -1 }) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();
  const [User, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      let { data: estudiante_seccion, error } = await supabase
        .from("estudiante_seccion")
        .select("*");

      // console.log(estudiante_seccion);
    }

    if (LSH_UserLogged) {
      if (trymestry == -1) {
        setUser(LSH_GetUserInformation);
      } else {
        fetchData();
      }
    } else {
      router.push("/student-main");
    }
  }, []);

  return (
    <GeneralStudentDataContainer>
      <CircularProgressBar
        text={`Asignaturas aprobadas de ${User.carrera_asignatura_total}`}
        number={User.estudiante_asignaturas_aprobadas}
        Data={{
          datasets: [
            {
              data: [
                parseFloat(User.estudiante_asignaturas_aprobadas),
                User.carrera_asignatura_total -
                  User.estudiante_asignaturas_aprobadas,
              ],
              borderColor: "transparent",
              backgroundColor: ["#C2C0A6", "#ffffff"],
            },
          ],
        }}
      />
      <CircularProgressBar
        text="Índice General de 4"
        number={parseFloat(User.estudiante_indice).toFixed(1)}
        Data={{
          datasets: [
            {
              data: [User.estudiante_indice, 4 - User.estudiante_indice],
              borderColor: "transparent",
              backgroundColor: ["#C2C0A6", "#ffffff"],
            },
          ],
        }}
      />
      <CircularProgressBar
        text={`Trimestres  cursados de ${User.carrera_trimestres}`}
        number={User.estudiante_trimestre}
        Data={{
          datasets: [
            {
              data: [
                User.estudiante_trimestre,
                User.carrera_trimestres - User.estudiante_trimestre,
              ],
              borderColor: "transparent",
              backgroundColor: ["#C2C0A6", "#ffffff"],
            },
          ],
        }}
      />
      <CircularProgressBar
        text="Créditos aprobados de 279"
        number={User.estudiante_creditos_aprobados}
        Data={{
          datasets: [
            {
              data: [
                User.estudiante_creditos_aprobados,
                User.carrera_creditos - User.estudiante_creditos_aprobados,
              ],
              borderColor: "transparent",
              backgroundColor: ["#C2C0A6", "#ffffff"],
            },
          ],
        }}
      />
    </GeneralStudentDataContainer>
  );
};

export default GeneralStudentData;
