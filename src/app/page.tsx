import Navbar from "@/components/navigation/Navbar";
import { LampContainer } from "@/components/ui/lamp";
import Image from "next/image";

export default function Home() {
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
