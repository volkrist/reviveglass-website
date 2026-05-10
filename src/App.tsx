import Header from "./components/ui/Header";
import Hero from "./components/sections/Hero";
import Stats from "./components/sections/Stats";
import WhatWeRestore from "./components/sections/WhatWeRestore";
import Services from "./components/sections/Services";
import BeforeAfter from "./components/sections/BeforeAfter";
import Gallery from "./components/sections/Gallery";
import HowWeWork from "./components/sections/HowWeWork";
import Conditions from "./components/sections/Conditions";
import Contacts from "./components/sections/Contacts";
import Footer from "./components/sections/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <WhatWeRestore />
        <Services />
        <BeforeAfter />
        <Gallery />
        <HowWeWork />
        <Conditions />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
