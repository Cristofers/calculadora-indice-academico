"use client";
import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";
import MySupabase from "../supabase";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  Container,
  ContentButtonAdder,
  Content,
} from "@/components/AdminManagementElements";

const ManageSeccion = () => {
  const [Secciones, setSecciones] = useState([{ profesor: { usuario: {} } }]);

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await MySupabase.from("seccion").select(
        "*,profesor(usuario(*))"
      );
      setSecciones(data);
    }
    fetchData();
  }, []);

  const RemoveMessage = (id) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
      titleText: "Dato Insertado",
      text: `El dato se ha eliminado correctamente el estudiante: ${id}.`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const DeleteHandler = async (id) => {
    const { error } = await MySupabase.from("seccion").delete().eq("id", id);

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      RemoveMessage(id);
    }
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Administrar Secciones</h2>

        <ContentButtonAdder href="./admin-add-seccion">+</ContentButtonAdder>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Total: {Secciones && Secciones.length}</p>
          </div>
          <div className="contentSubjectElementTitle">
            <p>Seccion</p>
            <p>Profesor</p>
            <p>Aula</p>
            <p>Fecha</p>
            <div>
              <p>Acciones</p>
            </div>
          </div>
          <div className="contentSubjectsElements">
            {Secciones &&
              Secciones.map((element, idx) => (
                <div key={idx} className="contentSubjectElement">
                  <p>
                    {element.asignatura_codigo}-{element.seccion_numero}
                  </p>
                  <p>
                    {element.profesor.usuario.usuario_nombre}{" "}
                    {element.profesor.usuario.usuario_apellido}
                  </p>
                  <p>{element.aula_id}</p>
                  <p>
                    {element.seccion_dia} ({element.seccion_inicio}/
                    {element.seccion_fin})
                  </p>

                  <div>
                    <Link
                      href={{
                        pathname: "./admin-add-seccion",
                        query: { id: element.id },
                      }}
                    >
                      <button>Modificar</button>
                    </Link>
                    <button onClick={() => DeleteHandler(element.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default ManageSeccion;
