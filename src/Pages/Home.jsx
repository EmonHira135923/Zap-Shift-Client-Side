import React from "react";
import Banner from "../Componets/HomeLayout/Header/Banner";
import HowItWorks from "../Componets/HomeLayout/HowitWorks/Howitworks";
import OurService from "../Componets/HomeLayout/Service/Ourservice";
import Logo from "../Componets/HomeLayout/Logo/Logo";
import Services from "../Componets/HomeLayout/Service/Sevices";
import MercentandCustomer from "../Componets/HomeLayout/Service/MercentandCustomer";
import CustomerReview from "../Componets/HomeLayout/Service/CustomerReview";
import FAQQuestion from "../Componets/HomeLayout/Service/FAQQuestion";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <OurService />
      <Logo />
      <Services />
      <MercentandCustomer />
      <CustomerReview />
      <FAQQuestion />
    </div>
  );
};

export default Home;
