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

const ManageArea = () => {
  const [Carrera, setCarrera] = useState([{}]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: area, error } = await MySupabase.from("carrera")
        .select("*")
        .order("carrera_abreviatura", { ascending: true });
      setCarrera(area);
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
    const { error } = await MySupabase.from("carrera")
      .delete()
      .eq("carrera_abreviatura", id);

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      let newCarrera = [...Carrera];
      const indexToRemove = newCarrera.findIndex(
        (obj) => obj.carrera_abreviatura === id
      );

      if (indexToRemove !== -1) {
        newCarrera.splice(indexToRemove, 1);
        setCarrera(newCarrera);
      }
      RemoveMessage(id);
    }
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Administrar Carrera</h2>

        <ContentButtonAdder href="./admin-add-carrera">+</ContentButtonAdder>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Total: {Carrera && Carrera.length}</p>
          </div>
          <div className="contentSubjectElementTitle">
            <p>Abreviatura</p>
            <p>Area ID</p>
            <p>Nombre de la Carrera</p>
            <p>Creditos Totales</p>
            <p>Trimestres Totales</p>
            <p>Asignaturas Totales</p>
            <div>
              <p>Acciones</p>
            </div>
          </div>
          <div className="contentSubjectsElements">
            {Carrera.map((element, idx) => (
              <div key={idx} className="contentSubjectElement">
                <p>{element.carrera_abreviatura}</p>
                <p>{element.area_id}</p>
                <p>{element.carrera_nombre}</p>
                <p>{element.carrera_creditos}</p>
                <p>{element.carrera_trimestres}</p>
                <p>{element.carrera_asignatura_total}</p>
                <div>
                  <Link
                    href={{
                      pathname: "./admin-add-carrera",
                      query: { id: element.carrera_abreviatura },
                    }}
                  >
                    <button>Modificar</button>
                  </Link>
                  <button
                    onClick={() => DeleteHandler(element.carrera_abreviatura)}
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

export default ManageArea;
