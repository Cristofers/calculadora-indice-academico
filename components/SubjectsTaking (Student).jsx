"use client";
import GenericTable from "./GenericTable";

const SubjectsTaking = () => {
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
