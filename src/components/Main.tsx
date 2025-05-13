'use client';
import ContactForm from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Home from "@/components/Home";
import Projetos from "@/components/Projects";
import About from "@/components/About";
import Technologies from "@/components/Tecnologies";
import { ThemeToggle } from "./ThemeToggle";

export default function Main() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Technologies />
      <Projetos />
      <ContactForm />
      <Footer />
      <ThemeToggle />
    </>
  );
}
