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

const ManageAsignatura = () => {
  const [Asignaturas, setAsignaturas] = useState([{}]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: asignatura, error } = await MySupabase.from("asignatura")
        .select("*")
        .order("area_id", { ascending: true });
      setAsignaturas(asignatura);
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
      text: `El dato se ha eliminado correctamente el area: ${id}.`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const DeleteHandler = async (id) => {
    const { error } = await MySupabase.from("asignatura")
      .delete()
      .eq("asignatura_codigo", id);

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      let newAsignaturas = [...Asignaturas];
      const indexToRemove = newAsignaturas.findIndex(
        (obj) => obj.asignatura_codigo === id
      );

      if (indexToRemove !== -1) {
        newAsignaturas.splice(indexToRemove, 1);
        setAsignaturas(newAsignaturas);
      }
      RemoveMessage(id);
    }
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Administrar Asignaturas</h2>

        <ContentButtonAdder href="./admin-add-asignatura">+</ContentButtonAdder>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Total: {Asignaturas && Asignaturas.length}</p>
          </div>
          <div className="contentSubjectElementTitle">
            <p>Area ID</p>
            <p>Codigo</p>
            <p>Nombre</p>
            <p>Cantidad de creditos</p>
            <div>
              <p>Acciones</p>
            </div>
          </div>
          <div className="contentSubjectsElements">
            {Asignaturas &&
              Asignaturas.map((element, idx) => (
                <div key={idx} className="contentSubjectElement">
                  <p>{element.area_id}</p>
                  <p>{element.asignatura_codigo}</p>
                  <p>{element.asignatura_nombre}</p>
                  <p>{element.asignatura_creditos}</p>
                  <div>
                    <Link
                      href={{
                        pathname: "./admin-add-asignatura",
                        query: { id: element.asignatura_codigo },
                      }}
                    >
                      <button>Modificar</button>
                    </Link>
                    <button
                      onClick={() => DeleteHandler(element.asignatura_codigo)}
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

export default ManageAsignatura;
