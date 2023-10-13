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

const ManageAdmin = () => {
  const [Admins, setAdmins] = useState([{ usuario: {}, area: {} }]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: data, error } = await MySupabase.from("usuario")
        .select("*")
        .eq("usuario_rol", 3);
      setAdmins(data);
      console.log(data);
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
      let newAdmins = [...Admins];
      console.log("->", newAdmins);
      const indexToRemove = newAdmins.findIndex((obj) => obj.usuario_id === id);

      if (indexToRemove !== -1) {
        newAdmins.splice(indexToRemove, 1);
        setAdmins(newAdmins);
        console.log("<--", newAdmins);
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
        <h2>Administrar Admins</h2>

        <ContentButtonAdder href="./admin-add-admin">+</ContentButtonAdder>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Total: {Admins && Admins.length}</p>
          </div>
          <div className="contentSubjectElementTitle">
            <p>ID</p>
            <p>Nombre</p>
            <p>Apellido</p>
            <p>Correo</p>

            <div>
              <p>Acciones</p>
            </div>
          </div>
          <div className="contentSubjectsElements">
            {Admins &&
              Admins.map((element, idx) => (
                <div key={idx} className="contentSubjectElement">
                  <p>{element.usuario_id}</p>
                  <p>{element.usuario_nombre}</p>
                  <p>{element.usuario_apellido}</p>
                  <p>{element.usuario_correo}</p>

                  <div>
                    <Link
                      href={{
                        pathname: "./admin-add-admin",
                        query: { id: element.usuario_id },
                      }}
                    >
                      <button>Modificar</button>
                    </Link>
                    <button onClick={() => DeleteHandler(element.usuario_id)}>
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

export default ManageAdmin;
