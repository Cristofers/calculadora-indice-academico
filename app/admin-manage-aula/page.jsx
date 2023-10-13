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

const ManageAula = () => {
  const [Aulas, setAulas] = useState([{ edificio: {} }]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await MySupabase.from("aula")
        .select("*,edificio(*)")
        .order("aula_codigo", { ascending: true });
      setAulas(data);
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
    const { error } = await MySupabase.from("aula")
      .delete()
      .eq("aula_codigo", id);

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      let newAulas = [...Aulas];
      const indexToRemove = newAulas.findIndex((obj) => obj.id === id);

      if (indexToRemove !== -1) {
        newAulas.splice(indexToRemove, 1);
        setAulas(newAulas);
      }
      RemoveMessage(id);
    }
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Administrar Aulas</h2>

        <ContentButtonAdder href="./admin-add-aula">+</ContentButtonAdder>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Total: {Aulas && Aulas.length}</p>
          </div>
          <div className="contentSubjectElementTitle">
            <p>Nombre Aula</p>
            <p>Edificio</p>
            <div>
              <p>Acciones</p>
            </div>
          </div>
          <div className="contentSubjectsElements">
            {Aulas.map((element, idx) => (
              <div key={idx} className="contentSubjectElement">
                <p>{element.aula_codigo}</p>
                <p>{element.edificio.edificio_nombre}</p>
                <div>
                  <Link
                    href={{
                      pathname: "./admin-add-aula",
                      query: { id: element.aula_codigo },
                    }}
                  >
                    <button>Modificar</button>
                  </Link>
                  <button onClick={() => DeleteHandler(element.aula_codigo)}>
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

export default ManageAula;
