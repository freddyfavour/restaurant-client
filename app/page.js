import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Hero from "./components/Hero";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutUs />
      <Contact />
    </main>
  );
}
