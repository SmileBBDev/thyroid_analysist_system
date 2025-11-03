/**
 * 메뉴 상단바 폼
 * 작성자 : 노현정
 * 작성일 : 2025.10.31
 * 수정자 :
 * 수정일 :
 * 수정내용 :
 */
import React from "react";
import { Link } from "react-router-dom";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Media,
} from "reactstrap";
import brandLogo from "../../assets/img/logo/brand_logo_white.png";
import { NavLink } from "react-router-dom";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
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
              {/*<Nav className="navbar-nav-hover align-items-lg-center" navbar>
                 <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Components</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="ni ni-spaceship" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Getting started
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn how to use Argon compiling Scss, change
                              brand colors and more.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-palette" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Foundation
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn more about colors, typography, icons and the
                              grid system we used for Argon.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-ui-04" />
                          </div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              Components
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Browse our 50 beautiful handcrafted components
                              offered in the Free version.
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown> 
                <NavLink tag={navLink} to="/diease">질병 안내</NavLink>
                <NavLink tag={navLink} to="/patientManage">환자 관리</NavLink>
                <NavLink tag={navLink} to="/predictDiease">갑상선 질병상태 예측</NavLink>
              </Nav>*/}
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <NavLink
                  to="/diease"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  질병 안내
                </NavLink>

                <NavLink
                  to="/patientManage"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  환자 관리
                </NavLink>

                <NavLink
                  to="/predictDiease"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  갑상선 질병상태 예측
                </NavLink>
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                {/* 로그인 / 로그아웃 버튼 */}
                {/* if문으로 로그인/로그아웃 버튼 보이도록 수정 필요 */}
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    tag={Link}     // ✅ Link로 변경
                    to="/login"    // ✅ react-router-dom 라우팅용
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-solid fa-user  mr-2"></i>
                    </span>
                    <span className="nav-link-inner--text ml-1">
                      로그인
                    </span>
                  </Button>
                </NavItem>
              </Nav>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;

{/* <UncontrolledDropdown nav>
  <DropdownToggle nav>
    <i className="ni ni-ui-04 d-lg-none mr-1" />
    <span className="nav-link-inner--text">Components</span>
  </DropdownToggle>
  <DropdownMenu className="dropdown-menu-xl">
    <div className="dropdown-menu-inner">
      <Media
        className="d-flex align-items-center"
        href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
        target="_blank"
      >
        <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
          <i className="ni ni-spaceship" />
        </div>
        <Media body className="ml-3">
          <h6 className="heading text-primary mb-md-1">
            Getting started
          </h6>
          <p className="description d-none d-md-inline-block mb-0">
            Learn how to use Argon compiling Scss, change
            brand colors and more.
          </p>
        </Media>
      </Media>
      <Media
        className="d-flex align-items-center"
        href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
        target="_blank"
      >
        <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
          <i className="ni ni-palette" />
        </div>
        <Media body className="ml-3">
          <h6 className="heading text-primary mb-md-1">
            Foundation
          </h6>
          <p className="description d-none d-md-inline-block mb-0">
            Learn more about colors, typography, icons and the
            grid system we used for Argon.
          </p>
        </Media>
      </Media>
      <Media
        className="d-flex align-items-center"
        href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
        target="_blank"
      >
        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
          <i className="ni ni-ui-04" />
        </div>
        <Media body className="ml-3">
          <h5 className="heading text-warning mb-md-1">
            Components
          </h5>
          <p className="description d-none d-md-inline-block mb-0">
            Browse our 50 beautiful handcrafted components
            offered in the Free version.
          </p>
        </Media>
      </Media>
    </div>
  </DropdownMenu>
</UncontrolledDropdown>
<UncontrolledDropdown nav>
  <DropdownToggle nav>
    <i className="ni ni-collection d-lg-none mr-1" />
    <span className="nav-link-inner--text">Examples</span>
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem to="/landing-page" tag={Link}>
      Landing
    </DropdownItem>
    <DropdownItem to="/profile-page" tag={Link}>
      Profile
    </DropdownItem>
      <DropdownItem to="/login-page" tag={Link}>
      Login
    </DropdownItem>
    <DropdownItem to="/register-page" tag={Link}>
      Register
    </DropdownItem>
  </DropdownMenu>
</UncontrolledDropdown> */}