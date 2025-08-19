import React, { Component } from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MiniNavbar from "./components/MiniNavbar";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      <MiniNavbar onOpenLogin={openLoginModal} onOpenRegister={openRegisterModal} />
      <Navbar onOpenLogin={openLoginModal} onOpenRegister={openRegisterModal} />

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

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeModals}
        onSwitchToRegister={openRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeModals}
        onSwitchToLogin={openLoginModal}
      />
    </div>
  );
};

export default App;
