'use client';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Home from "@/components/Home";
import Projetos from "@/components/Projects";
import About from "@/components/About";
import Technologies from "@/components/Tecnologies";
import ScrollToTop from "./ScrollTop";
import ScrollProgressBar from "./ScrollProgressBar";
import Stats from "./Stats";
import ChatBot from "./ChatBot";

export default function Main() {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <Home />
      <About />
      <Stats />
      <Technologies />
      <Projetos />
      <ChatBot />
      <Footer />
      <ScrollToTop />
    </>
  );
}
