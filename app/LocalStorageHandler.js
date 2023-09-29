const LSH_SaveUserInformation = (user) => {
  // console.log(user);
  sessionStorage.setItem("usuario_apellido", user.usuario_apellido);
  sessionStorage.setItem("usuario_correo", user.usuario_correo);
  sessionStorage.setItem("usuario_id", user.usuario_id);
  sessionStorage.setItem("usuario_nombre", user.usuario_nombre);
  sessionStorage.setItem("usuario_rol", user.usuario_rol);
  sessionStorage.setItem("usuario_tel", user.usuario_tel);
  sessionStorage.setItem("estudiante_trimestre", user.estudiante_trimestre);
  // -----------------------------------------
  if (user.usuario_rol == 1) {
    sessionStorage.setItem(
      "estudiante_asignaturas_aprobadas",
      user.estudiante.estudiante_asignaturas_aprobadas
    );
    sessionStorage.setItem(
      "estudiante_creditos_aprobados",
      user.estudiante.estudiante_creditos_aprobados
    );
    sessionStorage.setItem(
      "estudiante_indice",
      user.estudiante.estudiante_indice
    );
    sessionStorage.setItem(
      "estudiante_trimestre",
      user.estudiante.estudiante_trimestre
    );
    // -------------------------------------------------
    sessionStorage.setItem(
      "carrera_asignatura_total",
      user.estudiante.carrera.carrera_asignatura_total
    );
    sessionStorage.setItem(
      "carrera_creditos",
      user.estudiante.carrera.carrera_creditos
    );
    sessionStorage.setItem(
      "carrera_trimestres",
      user.estudiante.carrera.carrera_trimestres
    );
    sessionStorage.setItem(
      "carrera_nombre",
      user.estudiante.carrera.carrera_nombre
    );

    // -------------------------------------------------
    sessionStorage.setItem(
      "area_nombre",
      user.estudiante.carrera.area.area_nombre
    );
  }
  // -----------------------------------------
};

const LSH_GetUserInformation = () => {
  const newUser = {};
  newUser.usuario_apellido = sessionStorage.getItem("usuario_apellido");
  newUser.usuario_correo = sessionStorage.getItem("usuario_correo");
  newUser.usuario_id = sessionStorage.getItem("usuario_id");
  newUser.usuario_nombre = sessionStorage.getItem("usuario_nombre");
  newUser.usuario_rol = sessionStorage.getItem("usuario_rol");
  newUser.usuario_tel = sessionStorage.getItem("usuario_tel");
  newUser.estudiante_trimestre = sessionStorage.getItem("estudiante_trimestre");
  if (newUser.usuario_rol == 1) {
    newUser.estudiante_asignaturas_aprobadas = sessionStorage.getItem(
      "estudiante_asignaturas_aprobadas"
    );
    newUser.estudiante_creditos_aprobados = sessionStorage.getItem(
      "estudiante_creditos_aprobados"
    );
    newUser.estudiante_indice = sessionStorage.getItem("estudiante_indice");
    newUser.estudiante_trimestre = sessionStorage.getItem(
      "estudiante_trimestre"
    );
    newUser.carrera_asignatura_total = sessionStorage.getItem(
      "carrera_asignatura_total"
    );
    newUser.carrera_creditos = sessionStorage.getItem("carrera_creditos");
    newUser.carrera_trimestres = sessionStorage.getItem("carrera_trimestres");
    newUser.carrera_nombre = sessionStorage.getItem("carrera_nombre");
    newUser.area_nombre = sessionStorage.getItem("area_nombre");
  }
  return newUser;
};

const LSH_UserLogged = () => {
  if (sessionStorage.getItem("user").usuario_rol >= 0) {
    return true;
  }
  return false;
};

// const LSH_

export { LSH_SaveUserInformation, LSH_GetUserInformation, LSH_UserLogged };
