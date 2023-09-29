"use client";
// import Link from "next/link";
// import Dashboard from "@/components/Dashboard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/user-login");
  }, []);

  return <main></main>;
}
