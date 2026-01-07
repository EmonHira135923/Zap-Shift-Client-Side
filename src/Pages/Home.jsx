import React from "react";
import Banner from "../Componets/HomeLayout/Header/Banner";
import HowItWorks from "../Componets/HomeLayout/HowitWorks/Howitworks";
import OurService from "../Componets/HomeLayout/Service/Ourservice";
import Logo from "../Componets/HomeLayout/Logo/Logo";
import Services from "../Componets/HomeLayout/Service/Sevices";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <OurService />
      <Logo />
      <Services />
    </div>
  );
};

export default Home;
