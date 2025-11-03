import { Link, NavLink } from "react-router-dom";
import brandLogo from "../assets/img/logo/brand_logo_new.png";
import { NavbarBrand } from "reactstrap";

function AppSidebar() {
  return (
    <>
      {/* Sidebar */}
      <aside className="sidebar">
        <NavbarBrand className="sidebar-brand" to="/" tag={Link}>
          <img alt="brand logo" src={brandLogo} />
        </NavbarBrand>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li>
              <NavLink
                to="/nurse/dashboard"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                end
              >
                대시보드
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/nurse/dashboard/patients"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                환자 목록
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default AppSidebar;

// import { Link, NavLink, } from "react-router-dom";
// import brandLogo from "../assets/img/logo/brand_logo_new.png"
// import {
//   NavbarBrand,
// } from "reactstrap";
// function AppSidebar() {
//   return (
//     <>
//     {/* Sidebar */}
//     <aside className="w-64 bg-white shadow-lg">
//     <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
//         <img
//             alt="..."
//             src={brandLogo}
//         />
//     </NavbarBrand>
//     <nav className="mt-6">
//         <ul className="space-y-3">
//         <li>
//             <NavLink
//             to="/nurse/dashboard"
//             className={({ isActive }) =>
//                 `block px-4 py-2 rounded-lg ${
//                 isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-blue-100"
//                 }`
//             }
//             end
//             >
//             대시보드
//             </NavLink>
//         </li>
//         <li>
//             <NavLink
//             to="/nurse/dashboard/patients"
//             className={({ isActive }) =>
//                 `block px-4 py-2 rounded-lg ${
//                 isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-blue-100"
//                 }`
//             }
//             >
//             환자 목록
//             </NavLink>
//         </li>
//         <li>
//             <NavLink
//             to="/nurse/dashboard/profile"
//             className={({ isActive }) =>
//                 `block px-4 py-2 rounded-lg ${
//                 isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-blue-100"
//                 }`
//             }
//             >
//             내 정보
//             </NavLink>
//         </li>
//         </ul>
//     </nav>
//     </aside>
//     </>
//   )
// }
// export default AppSidebar;
