"use client";
import React, { useEffect, useState } from "react";
import { Container, Content, Formulary } from "@/components/AdminAdderElement";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";

import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const AddArea = () => {
  const [inputValues, setInputValues] = useState({});
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const IDtoModify = useSearchParams().get("id");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let { data: area, error } = await supabase
        .from("area")
        .select("*")
        .eq("id", IDtoModify);

      const newInputValues = { ...inputValues };
      newInputValues["area_nombre"] = area[0].area_nombre;
      setInputValues(newInputValues);
    }

    if (IDtoModify) fetchData();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("usuario_rol") != 3) {
      router.push("./");
    }
  }, []);

  const handleInputChange = (event) => {
    const newInputValues = { ...inputValues };
    newInputValues[event.target.id] = event.target.value;
    setInputValues(newInputValues);
  };

  const SaveData = async (dataToInsert) => {
    const { data, error } = await supabase
      .from("area")
      .insert([dataToInsert])
      .select();

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
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
        text: "El dato se ha guardado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const UpdateData = async (dataToInsert) => {
    const { data, error } = await supabase
      .from("area")
      .update(dataToInsert)
      .eq("id", IDtoModify)
      .select();

    if (error != null) {
      Swal.fire({
        title: "Error!",
        text: JSON.stringify(error),
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
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
        text: "El dato se ha actualizado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const SaveHandler = async (e) => {
    e.preventDefault();
    if (!ValidData()) return;

    let data = { area_nombre: inputValues.area_nombre };
    if (IDtoModify) {
      UpdateData(data);
    } else {
      SaveData(data);
    }
  };

  const ValidData = () => {
    if (inputValues.area_nombre == null) {
      Swal.fire({
        title: "Error!",
        text: "Unos de los campos suministrados está carente de contenido.",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return false;
    }
    if (inputValues.area_nombre == "") {
      Swal.fire({
        title: "Error!",
        text: "Unos de los campos suministrados está carente de contenido.",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return false;
    }
    if (inputValues.area_nombre == " ") {
      Swal.fire({
        title: "Error!",
        text: "Unos de los campos suministrados está carente de contenido.",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return false;
    }

    return true;
  };

  return (
    <Container>
      <Dashboard />
      <Content>
        <h2>Area Academica</h2>
        <Formulary>
          <div>
            <label htmlFor="area_nombre">Nombre del Area</label>
            <input
              defaultValue={IDtoModify ? inputValues.area_nombre : ""}
              type="text"
              id="area_nombre"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="buttonContainer">
            <button onClick={(e) => SaveHandler(e)}>Guardar</button>
            <Link href="./admin-main">
              <button>Cancelar</button>
            </Link>
          </div>
        </Formulary>
      </Content>
    </Container>
  );
};

export default AddArea;
