import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
    }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
        <h1 className="header-title">Nurse Dashboard</h1>

        <div className="header-right">
            <div className="user-menu" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="user-button">
                홍길동 ▾
            </button>

            {menuOpen && (
                <div className="nurse-dropdown">
                <NavLink 
                    to="/nurse/dashboard/profile" 
                    className="dropdown-item"
                    onClick={() => setMenuOpen(false)} // 클릭 시 드롭다운 닫기
                >
                    내 프로필
                </NavLink>
                </div>
            )}
            </div>

            <button onClick={() => alert("로그아웃 되었습니다.")} className="logout-button">
            로그아웃
            </button>
        </div>
    </header>
  );
};
export default AppHeader;



// import React from "react";

// const AppHeader = () => {
//   return (
//     // Header
//     <header className="app-header">
//       <div className="header-left">
//         <h1 className="header-title">Nurse Dashboard</h1>
//       </div>

//       <div className="header-right">
        
//               <NavLink
//                 to="/nurse/dashboard/profile"
//                 className={({ isActive }) =>
//                   `sidebar-link ${isActive ? "active" : ""}`
//                 }
//               >
//                 내 정보
//               </NavLink>
            
//         <span className="user-info">👤 로그인 사용자: 홍길동</span>
//         <button className="logout-btn">로그아웃</button>
//       </div>
//     </header>
//   );
// };

// export default AppHeader;
