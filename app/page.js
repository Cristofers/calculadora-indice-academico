import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  let { data: area, error } = await supabase.from("area").select("*");

  return (
    <main>
      <Link href="/student-main">Agua de coco</Link>
      <Dashboard supa={area} />
    </main>
  );
}
