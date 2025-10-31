/**
 * 로그인/회원가입 UI 매칭 페이지
 * 작성자 : 노현정
 * 작성일 : 2025.10.31
 * 수정자 :
 * 수정일 :
 * 수정내용 :
 */

import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginCard";
import RegisterForm from "./RegisterCard";

function Login() {
   const location = useLocation();

  // 현재 URL이 /register면 RegisterForm, 아니면 LoginForm
  const isRegister = location.pathname.includes("register");
    return (
      <>
        {/* 사용자의 url path가 login이면 <LoginCard /> register <RegisterCard /> 화면이 표출되도록 설정 */}
         {isRegister ? <RegisterForm /> : <LoginForm />}
      </>
    );

}

export default Login;
