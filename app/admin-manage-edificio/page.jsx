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

const ManageEdificio = () => {
  const [Edificios, setEdificios] = useState([{}]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: area, error } = await MySupabase.from("edificio")
        .select("*")
        .order("edificio_nombre", { ascending: true });
      setEdificios(area);
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
    const { error } = await MySupabase.from("edificio").delete().eq("id", id);

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      let newEdificios = [...Edificios];
      const indexToRemove = newEdificios.findIndex((obj) => obj.id === id);

      if (indexToRemove !== -1) {
        newEdificios.splice(indexToRemove, 1);
        setEdificios(newEdificios);
      }
      RemoveMessage(id);
    }
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Administrar Edificios</h2>

        <ContentButtonAdder href="./admin-add-edificio">+</ContentButtonAdder>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Total: {Edificios && Edificios.length}</p>
          </div>
          <div className="contentSubjectElementTitle">
            <p>Nombre Edificio</p>
            <div>
              <p>Acciones</p>
            </div>
          </div>
          <div className="contentSubjectsElements">
            {Edificios.map((element, idx) => (
              <div key={idx} className="contentSubjectElement">
                <p>{element.edificio_nombre}</p>
                <div>
                  <Link
                    href={{
                      pathname: "./admin-add-edificio",
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

export default ManageEdificio;
