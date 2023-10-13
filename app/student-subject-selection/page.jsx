"use client";
import React, { useEffect, useState } from "react";
import { Container, Content } from "./style";
import Dashboard from "../../components/Dashboard";
import { useRouter } from "next/navigation";
import { AddHandler, RemoveHandler } from "./handlers";
import MySupabase from "../supabase";

const StudentSubjectSelection = () => {
  const [ActualTrymestry, setActualTrymestry] = useState([
    { seccion: { asignatura: {} }, profesor: { usuario: {} } },
  ]);

  const [AvailableSubjects, setAvailableSubjects] = useState([
    { asignatura: {}, profesor: { usuario: {} } },
  ]);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") != 1) {
      router.push("./");
    }
  }, []);

  // Asignaturas que esta tomando el estudiante
  useEffect(() => {
    async function fetchData() {
      const newTrymestry = [];

      let { data: estudiante_seccion, error } = await MySupabase.from(
        "estudiante_seccion"
      )
        .select("*,seccion(*,asignatura(*)),profesor(usuario(*))")
        .eq("estudiante_id", sessionStorage.getItem("usuario_id"))
        .eq("trimestre_cursado", 2);

      setActualTrymestry(estudiante_seccion);
    }
    fetchData();
  }, []);

  // Asignaturas que se pueden seleccionar
  useEffect(() => {
    async function fetchData() {
      let { data: estudiante_seccion, error } = await MySupabase.from(
        "seccion"
      ).select("*,asignatura(*),profesor(*,usuario(*))");

      setAvailableSubjects(estudiante_seccion);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Selección de Asignaturas</h2>
        <div className="contentSection">
          <div className="contentHeader">
            <p>Listado de asignaturas a seleccionar para el trimestre</p>
          </div>
        </div>

        <div className="contentSection">
          <div className="contentHeader">
            <p>Asignaturas</p>
          </div>
          <div className="actualSubjectElementTitle">
            <p>Codigo</p>
            <p>Nombre</p>
            <p>Credito</p>
            <p>Profesor</p>
            <p>Total: {ActualTrymestry.length}</p>
          </div>
          <div className="actualSubjectsElements">
            {ActualTrymestry.map((element, idx) => (
              <div className="actualSubjectElement" key={idx}>
                <p>{element.seccion.asignatura.asignatura_codigo}</p>
                <p>{element.seccion.asignatura.asignatura_nombre}</p>
                <p>{element.seccion.asignatura.asignatura_creditos}</p>
                <p>{element.profesor.usuario.usuario_nombre}</p>
                <button onClick={() => RemoveHandler(element)}>Remover</button>
              </div>
            ))}
          </div>
        </div>

        <div className="contentSection">
          <div className="contentHeader">
            <p>Selecciones Disponibles</p>
          </div>
          <div className="actualSubjectElementTitle">
            <p>Codigo</p>
            <p>Nombre</p>
            <p>Credito</p>
            <p>Profesor</p>
            <p>Total: {AvailableSubjects.length}</p>
          </div>
          <div className="actualSubjectsElements">
            {AvailableSubjects.map((element, idx) => (
              <div className="actualSubjectElement" key={idx}>
                <p>{element.asignatura.asignatura_codigo}</p>
                <p>{element.asignatura.asignatura_nombre}</p>
                <p>{element.asignatura.asignatura_creditos}</p>
                <p>{element.profesor.usuario.usuario_nombre}</p>

                <button onClick={() => AddHandler(element)}>Agregar</button>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default StudentSubjectSelection;
