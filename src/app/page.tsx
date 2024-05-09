import Navbar from "@/components/navigation/Navbar";
import { LampContainer } from "@/components/ui/lamp";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  return (
    <>
      <Navbar />
      <main className="">
        <LampContainer>
          Illuminate your child&apos;s <br /> way to success
        </LampContainer>
      </main>
    </>
  );
}
