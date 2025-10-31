import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import MainLayout from './layouts/MainLayout'
import Intro from './components/Intro'

import Login from "./views/logins/Login";
import Diease from "./views/template/Diease"
import Patient from "./views/patient/Patient";
import Nurse from "./views/nurse/Nurse";
import Doctor from "./views/doctor/Doctor";

/**
 * 전체 루트 작성 페이지
 * 작성자 : 노현정
 * 작성일 : 2025.10.23
 * 수정자 :
 * 수정일 :
 * 수정내용 :
 */

// 웹 페이지 동작 주소 입력
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout이 모든 페이지를 감싸도록 설정 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Intro/>} />
          {/* 추가되는 path가 있을 때 이 부분에 추가 */}
          {/* 다른 페이지 추가 시 아래처럼 작성*/}
          {/* ⚠️ 여기서 절대경로(/login-page)가 아닌 상대경로(login-page)로 해야 MainLayout 안에서 정상적으로 렌더링 가능 */}
          {/* <Route path="about" element={<About />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Login />} />
          <Route path="diease/" element={<Diease/>} /> {/* 질병 안내 페이지 */}


          {/* 회운유형에 맞게 화면 다르게 보여주는 작업 필요 */}
          <Route path="patient/" element={<Patient/>} /> {/* 환자 페이지 */}
          <Route path="nurse/" element={<Nurse/>} /> {/* 간호사 페이지 */}
          <Route path="doctor/" element={<Doctor/>} /> {/* 의사 페이지 */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
