"use client";
import GenericTable from "./GenericTable";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SubjectsTaking = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [Data, setData] = useState([[]]);

  useEffect(() => {
    async function fetchData() {
      let { data: estudiante_seccion, error } = await supabase
        .from("estudiante_seccion")
        .select("*");

      // let newArray = [];
      // estudiante_seccion.map((element) => {
      //   newArray.push([element.nombre_profesor]);
      // });
      // setData(newArray);
    }
    fetchData();
  }, []);
  return (
    <GenericTable
      title="Asignaturas Impartidas"
      columns={[
        "Seccion",
        "Cr",
        "Asignatura",
        "Aula",
        "Lun",
        "Mar",
        "Mier",
        "Ju",
        "Vi",
        "Sa",
        "Profesor",
      ]}
      data={[
        [
          "Seccion",
          "Cr",
          "Asignatura",
          "Aula",
          "Lun",
          "Mar",
          "Mier",
          "Ju",
          "Vi",
          "Sa",
          "Profesor",
        ],
      ]}
    />
  );
};

export default SubjectsTaking;
