import About from "../components/About";
import Contact from "../components/Contact";
import Feedback from "../components/Feedback";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import Services from "../components/Services";
import TechSupport from "../components/TechSupport";

export default function Home() {
  return (
    <>
      <Header />
      <TechSupport />
      <Services />
      <About />
      <Feedback />
      <Contact />
      <Footer />
    </>
  );
}
