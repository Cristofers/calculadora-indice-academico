"use client";
import GenericTable from "./GenericTable";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SubjectsTaking = ({ trymestry, title = "---" }) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [Data, setData] = useState([[]]);

  useEffect(() => {
    async function fetchData() {
      let { data: estudiante_seccion, error } = await supabase
        .from("estudiante_seccion")
        .select(
          "*,seccion(*,asignatura(*),seccion_horario!inner(*)),profesor(usuario(*))"
        )
        .eq("estudiante_id", sessionStorage.getItem("usuario_id"));

      let newArray = [];

      estudiante_seccion &&
        estudiante_seccion.map((element) => {
          if (element.trimestre_cursado == trymestry) {
            let lunes, martes, miercoles, jueves, viernes, sabado;

            switch (element.seccion.seccion_dia.toLowerCase()) {
              case "lunes":
                lunes =
                  element.seccion.seccion_inicio +
                  " / " +
                  element.seccion.seccion_fin;
                break;
              case "martes":
                martes =
                  element.seccion.seccion_inicio +
                  " / " +
                  element.seccion.seccion_fin;
                break;
              case "miercoles":
                miercoles =
                  element.seccion.seccion_inicio +
                  " / " +
                  element.seccion.seccion_fin;
                break;
              case "jueves":
                jueves =
                  element.seccion.seccion_inicio +
                  " / " +
                  element.seccion.seccion_fin;
                break;
              case "viernes":
                viernes =
                  element.seccion.seccion_inicio +
                  " / " +
                  element.seccion.seccion_fin;
                break;
              case "sabado":
                sabado =
                  element.seccion.seccion_inicio +
                  " / " +
                  element.seccion.seccion_fin;
                break;
            }

            newArray.push([
              element.seccion.asignatura_codigo +
                " - " +
                element.seccion.seccion_numero,
              element.seccion.asignatura.asignatura_creditos,
              element.seccion.asignatura.asignatura_nombre,
              element.aula_codigo,
              lunes,
              martes,
              miercoles,
              jueves,
              viernes,
              sabado,
              element.profesor.usuario.usuario_nombre +
                " " +
                element.profesor.usuario.usuario_apellido,
            ]);
            setData(newArray);
          }
        });
    }
    fetchData();
  }, []);
  return (
    <GenericTable
      title={title}
      columns={[
        "Sección",
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
