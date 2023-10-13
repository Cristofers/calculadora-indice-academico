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
  const [Areas, setAreas] = useState([{}]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: area, error } = await MySupabase.from("area")
        .select("*")
        .order("area_nombre", { ascending: true });
      setAreas(area);
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
    const { error } = await MySupabase.from("area")
      .delete()
      .eq("area_nombre", id);

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      let newAreas = [...Areas];
      const indexToRemove = newAreas.findIndex((obj) => obj.area_nombre === id);

      if (indexToRemove !== -1) {
        newAreas.splice(indexToRemove, 1);
        setAreas(newAreas);
      }
      RemoveMessage(id);
    }
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Administrar Areas</h2>

        <ContentButtonAdder href="./admin-add-area">+</ContentButtonAdder>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Total: {Areas && Areas.length}</p>
          </div>
          <div className="contentSubjectElementTitle">
            <p>Nombre del Area</p>
            <div>
              <p>Acciones</p>
            </div>
          </div>
          <div className="contentSubjectsElements">
            {Areas.map((element, idx) => (
              <div key={idx} className="contentSubjectElement">
                <p>{element.area_nombre}</p>
                <div>
                  <Link
                    href={{
                      pathname: "./admin-add-area",
                      query: { id: element.id },
                    }}
                  >
                    <button>Modificar</button>
                  </Link>
                  <button onClick={() => DeleteHandler(element.area_nombre)}>
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
