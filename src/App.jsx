import { useState } from 'react'
import './assets/css/App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import MainLayout from './layouts/MainLayout'
import Intro from './components/Intro'

/**
 * 전체 루트 작성 페이지
 * 작성자 : 노현정
 * 작성일 : 2025.10.13
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
          {/* <Route path="about" element={<About />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
