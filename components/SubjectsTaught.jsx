import GenericTable from "./GenericTable";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SubjectsTaught = () => {
  const [ActualSubjects, setActualSubjects] = useState([[]]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function fetchData() {
      let newActualSubjects = [];
      let qtyEstudiantes = 0;
      let { data: estudiante_seccion, error } = await supabase
        .from("estudiante_seccion")
        .select("*, profesor(*), seccion(*,asignatura(*))")
        .eq("profesor_id", sessionStorage.getItem("usuario_id"))
        .eq("trimestre_cursado", sessionStorage.getItem("trimestre"));

      console.log(estudiante_seccion);

      estudiante_seccion &&
        estudiante_seccion.map((element) => {
          qtyEstudiantes += 1;
          var array = [
            element.seccion.asignatura_codigo,
            element.seccion.asignatura.asignatura_creditos,
            element.seccion.asignatura.asignatura_nombre,
            element.aula_codigo,
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            // qtyEstudiantes + "/40",
          ];
          var day = ParseDay(element.seccion);
          array[day[0]] = day[1];
          newActualSubjects.push(array);
        });
      setActualSubjects(newActualSubjects);
    }
    fetchData();
  }, []);

  const ParseDay = (seccion) => {
    switch (seccion.seccion_dia) {
      case "Lunes":
        return [4, seccion.seccion_inicio + "/" + seccion.seccion_numero];
      case "Martes":
        return [5, seccion.seccion_inicio + "/" + seccion.seccion_numero];
      case "Miercoles":
        return [6, seccion.seccion_inicio + "/" + seccion.seccion_numero];
      case "Jueves":
        return [7, seccion.seccion_inicio + "/" + seccion.seccion_numero];
      case "Viernes":
        return [8, seccion.seccion_inicio + "/" + seccion.seccion_numero];
      case "Sabado":
        return [9, seccion.seccion_inicio + "/" + seccion.seccion_numero];
    }
  };

  return (
    <GenericTable
      title="Asignaturas Impartidas"
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
      ]}
      data={ActualSubjects}
    />
  );
};

export default SubjectsTaught;
