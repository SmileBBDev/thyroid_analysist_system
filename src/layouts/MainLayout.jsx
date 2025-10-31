import React from "react";
// core components
import DemoNavbar from "../components/Navbars/DemoNavbar";
import CardsFooter from "../components/Footers/CardsFooter";
import { Outlet } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";

export default function MainLayout() {
  return (
    <>
      <DemoNavbar />
      <main >
        {/* 상단 Hero Section */}
        <section className="section section-lg section-shaped pb-250">
          {/* 배경 도형 */}
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* <Container className="py-lg-md d-flex justify-content-center">
            <div className="col px-0 text-center"> */}
              <Outlet  /> {/* 각 페이지 내용이 여기에 렌더링 */}
            {/* </div>
          </Container> */}
          {/* 아래쪽 하단부의 '경사면' 효과 */}
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
       </section>
       
        {/* 본문 하단 여백 영역 */}
        <section className="section section-lg pt-lg-0">
          {/* 필요 시 다른 콘텐츠 추가 */}
        </section>
      </main>
      <CardsFooter />
    </>
  );
}


