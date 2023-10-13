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

const ManageProfesor = () => {
  const [Profesores, setProfesores] = useState([{ usuario: {}, area: {} }]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: data, error } = await MySupabase.from("profesor").select(
        "*, usuario!inner(*), area!inner(*)"
      );
      setProfesores(data);
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
    const { error } = await MySupabase.from("profesor")
      .delete()
      .eq("profesor_id", id);

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      let newProfesores = [...Profesores];
      const indexToRemove = newProfesores.findIndex(
        (obj) => obj.profesor_id === id
      );

      if (indexToRemove !== -1) {
        newProfesores.splice(indexToRemove, 1);
        setProfesores(newProfesores);
      }

      const { error } = await MySupabase.from("usuario")
        .delete()
        .eq("usuario_id", id);

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
    }
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Administrar Profesores</h2>

        <ContentButtonAdder href="./admin-add-profesor">+</ContentButtonAdder>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Total: {Profesores && Profesores.length}</p>
          </div>
          <div className="contentSubjectElementTitle">
            <p>ID</p>
            <p>Nombre</p>
            <p>Apellido</p>
            <p>Correo</p>
            <p>Area</p>
            <div>
              <p>Acciones</p>
            </div>
          </div>
          <div className="contentSubjectsElements">
            {Profesores &&
              Profesores.map((element, idx) => (
                <div key={idx} className="contentSubjectElement">
                  <p>{element.usuario.usuario_id}</p>
                  <p>{element.usuario.usuario_nombre}</p>
                  <p>{element.usuario.usuario_apellido}</p>
                  <p>{element.usuario.usuario_correo}</p>
                  <p>{element.area.area_nombre}</p>

                  <div>
                    <Link
                      href={{
                        pathname: "./admin-add-profesor",
                        query: { id: element.usuario.usuario_id },
                      }}
                    >
                      <button>Modificar</button>
                    </Link>
                    <button
                      onClick={() => DeleteHandler(element.usuario.usuario_id)}
                    >
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

export default ManageProfesor;
