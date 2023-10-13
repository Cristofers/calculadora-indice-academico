import MySupabase from "../supabase";
import Swal from "sweetalert2";

export const AddHandler = async (element) => {
  const { data, error } = await MySupabase.from("estudiante_seccion")
    .insert([
      {
        seccion_id: element.id,
        estudiante_id: sessionStorage.getItem("usuario_id"),
        trimestre_cursado: sessionStorage.getItem("trimestre"),
        aula_codigo: element.aula_id,
        calificacion: 0,
        ciclo: 0,
        activo: true,
        estado: "En Curso",
        year: 2002,
        profesor_id: element.profesor_id,
      },
    ])
    .select();

  if (error == null) {
    location.reload();
  } else {
    Swal.fire({
      title: "Error!",
      text: JSON.stringify(error),
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
};

export const RemoveHandler = async (element) => {
  const { error } = await MySupabase.from("estudiante_seccion")
    .delete()
    .eq("seccion_id", element.seccion_id)
    .eq("estudiante_id", parseInt(sessionStorage.getItem("usuario_id")))
    .eq("trimestre_cursado", parseInt(sessionStorage.getItem("trimestre")))
    .eq("aula_codigo", element.aula_codigo)
    .eq("profesor_id", element.profesor_id);

  if (error == null) {
    location.reload();
  } else {
    Swal.fire({
      title: "Error!",
      text: JSON.stringify(error),
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
};
