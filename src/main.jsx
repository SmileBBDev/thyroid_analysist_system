import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // 🔹 1. Bootstrap
// import "./assets/vendor/nucleo/css/nucleo.css"; // 🔹 2. Nucleo 아이콘
// import "./assets/vendor/font-awesome/css/font-awesome.min.css"; // 🔹 3. Font Awesome
// import "./assets/css/argon-design-system-react.css"; // 🔹 4. Argon Design System
// import "./assets/scss/argon-design-system-react.scss"; // 4. Argon SCSS (✅ CSS 대신)

import '/src/assets/vendor/nucleo/css/nucleo.css';
import '/src/assets/vendor/font-awesome/css/font-awesome.min.css';
import '/src/assets/css/argon-design-system-react.css';
import '/src/assets/css/addFunction.css'

import App from './App.jsx'

/**
 * react 프로젝트 진입점
 * 작성자 : 노현정
 * 작성일 : 2025.10.23
 * 수정자 :
 * 수정일 :
 * 수정내용 :
 */

// 폴더 구조 설명
// src/
//  ┣ assets/          # 이미지, 아이콘, 전역 CSS 등
//  ┣ components/      # 재사용 가능한 컴포넌트 : 공통 UI 컴포넌트 (Navbar, Sidebar, Modal 등)
//  ┣ layouts/         # 페이지 공통 레이아웃 (예: AdminLayout, AuthLayout)
//  ┣ views/           # 라우팅되는 페이지 (예: Home, Dashboard, Login 등)
//  ┣ contexts/        # 전역 상태관리 (예: AuthContext, ThemeContext)
//  ┣ services/        # API 통신 로직 (axios 등)
//  ┣ utils/           # 헬퍼 함수 (예 : formatter, validator 등)
//  ┣ App.jsx          # 전체 루트 - 라우팅 및 전체 구조 정의
//  ┗ main.jsx         # ReactDOM.createRoot()가 있는 진입점
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//       <App />
//   </StrictMode>
// )