import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MiniNavbar from "./components/MiniNavbar";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";

const App = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      <MiniNavbar />
      <Navbar />

      {/* Wrap sections in divs with proper IDs for navigation */}
      <section id="home">
        <Hero />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="testimonial">
        <Testimonial />
      </section>

      <section id="about">
        <About />
      </section>
    </div>
  );
};

export default App;
