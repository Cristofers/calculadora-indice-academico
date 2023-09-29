"use client";
import GenericTable from "./GenericTable";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SubjectsTaking = ({ trymestry, title = "Asignaturas Impartidas" }) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [Data, setData] = useState([[]]);

  useEffect(() => {
    async function fetchData() {
      let { data: estudiante_seccion, error } = await supabase
        .from("estudiante_seccion")
        .select("*,seccion(*,asignatura(*))")
        .eq("estudiante_id", sessionStorage.getItem("usuario_id"));

      let newArray = [];
      estudiante_seccion.map((element) => {
        if (element.trimestre_cursado == trymestry) {
          newArray.push([
            element.seccion.asignatura_codigo +
              " - " +
              element.seccion.seccion_numero,
            element.seccion.asignatura.asignatura_creditos,
            element.seccion.asignatura.asignatura_nombre,
            element.aula_codigo,
            "",
            "",
            "",
            "",
            "",
            "",
            element.profesor_nom,
          ]);
          setData(newArray);
        }
      });
    }
    fetchData();
    console.log(Data);
  }, []);
  return (
    <GenericTable
      title={title}
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
      data={Data}
    />
  );
};

export default SubjectsTaking;
