/**
 * 간호사 로그인 후 보여지는 UI
 * 작성자 : 노현정
 * 작성일 : 2025.11.03
 * 수정자 :
 * 수정일 :
 * 수정내용 :
 */
import {Outlet, Link } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar"
import AppHeader from "../../components/AppHeader"
import "../../assets/css/nurse-page.css";

const LayoutContent = () => {
  return (
     <div className="app-container">
      <AppSidebar />
      <div className="main-content">
        <AppHeader />
        <div className="page-content">
          <Outlet /> {/* 하위 컴포넌트가 여기에 렌더링됨  */}
        </div>
      </div>
    </div>

    // <div className="min-h-screen xl:flex">
    //   <div>
    //     < AppSidebar />
    //     {/* <AppSidebar />
    //     <Backdrop /> */}
    //   </div>
    //   {/* <div
    //     className={`flex-1 transition-all duration-300 ease-in-out ${
    //       isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
    //     } ${isMobileOpen ? "ml-0" : ""}`}
    //   > */}
    //     {/* <AppHeader /> */}
    //     <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
    //       <Outlet /> {/* 하위 컴포넌트가 여기에 렌더링됨  */}
    //     </div>
    //   {/* </div> */}
    // </div>
  );
};

function Nurse() {
  return (
      <LayoutContent />
  );
}

export default Nurse;
