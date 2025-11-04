/**
 * 메뉴 상단바 폼
 * 작성자 : 노현정
 * 작성일 : 2025.10.31
 * 수정자 : 노현정
 * 수정일 : 2025.11.04
 * 수정내용 : useAuth 기반 로그인 상태 및 권한별 메뉴 표시 추가
 */
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";
import brandLogo from "../../assets/img/logo/brand_logo_white.png";

// AuthContext, Roles 불러오기
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";

export default function DemoNavbar() {
  const { me, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }, []);

  // 🔹 로그아웃 핸들러
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          {/* 브랜드 로고 */}
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                alt="..."
                src={brandLogo}
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            {/* 메뉴 항목 */} 
            <Nav className="navbar-nav-hover align-items-lg-center" navbar>
              {/* 모든 로그인 사용자 또는 비로그인자도 접근 가능 */}
              <NavLink
                to="/diease"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                질병 안내
              </NavLink>

              {/* 로그인 사용자만 접근 가능 */}
              {me && (
                <NavLink
                  to="/predictDiease"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  갑상선 질병상태 예측
                </NavLink>
              )}

              {/* 의사 or 관리자 전용 */}
              {(me?.role === ROLES.DOCTOR || me?.role === ROLES.ADMIN) && (
                <NavLink
                  to="/patientManage"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  환자 관리
              </NavLink>
              )}
              
              {/* 관리자 전용 */}
              {me?.role === ROLES.ADMIN && (
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  관리자 메뉴
                </NavLink>
              )}
            </Nav>
            
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <NavItem className="d-none d-lg-block ml-lg-4">
              {/* 로그인 / 로그아웃 버튼 */}
              {me ? (
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={handleLogout}
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-sign-out-alt mr-2"></i>
                  </span>
                  <span className="nav-link-inner--text ml-1">
                    로그아웃 ({me.username})
                  </span>
                </Button>
              ): (
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  tag={Link}
                  to="/login"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-solid fa-user  mr-2"></i>
                  </span>
                  <span className="nav-link-inner--text ml-1">
                    로그인
                  </span>
                </Button>
              )}
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
}