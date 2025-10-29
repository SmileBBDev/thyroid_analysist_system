import React from "react";
// core components
import DemoNavbar from "../components/Navbars/DemoNavbar";
import CardsFooter from "../components/Footers/CardsFooter";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <DemoNavbar />
      <Navbar />
      <main>
        <Outlet  /> {/* 각 페이지 내용이 여기에 렌더링 */}
      </main>
      <Footer />
      <CardsFooter />
    </>
  );
}


