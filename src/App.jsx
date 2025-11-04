import {Routes, Route, Navigate} from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";
import { ROLES } from "./utils/roles";

import MainLayout from './layouts/MainLayout'
import Intro from './components/Intro'

import Login from "./views/logins/Login";
import Diease from "./views/template/Diease"
// import Patient from "./views/patient/Patient";
// import Doctor from "./views/doctor/Doctor";

import Nurse from "./views/nurse/Nurse";
import NurseDashboard from "./layouts/NurseDashboard";
import NursePatients from "./views/nurse/NursePatients";
import NurseProfile from "./views/nurse/NurseProfile";
import DashboardHome from "./views/nurse/DashboardHome";

import PatientManage from "./views/template/PatientManage"
import PatientDetail from "./views/template/PatientDetail"
import PredictDiease from "./views/template/PredictDiease"
import AdminUsers from "./views/template/AdminUsers"

/**
 * 전체 루트 작성 페이지
 * 작성자 : 노현정
 * 작성일 : 2025.10.23
 * 수정자 : 노현정
 * 수정일 : 2025.11.04
 * 수정내용 : 권한별 접근 페이지 역할 구분
 */

// 웹 페이지 동작 주소 입력
function App() {
  const userRole = "nurse" // localStorage.getItem("role"); // todo: 로그인 후 저장된 역할 정보가 들어갈 수 있도록 수정

  return (
    <>
      <Routes>
        {/* 메인 페이지 레이아웃 */}
        {/* 
          MainLayout이 모든 페이지를 감싸도록 설정
          경로의 element로 추가되는 페이지는 MainLayout의 < Outlet /> 컴포넌트에 랜더링 됨.
        */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Intro/>} />
          {/* 추가되는 path가 있을 때 이 부분에 추가 */}
          {/* 다른 페이지 추가 시 아래처럼 작성*/}
          {/* ⚠️ 여기서 절대경로(/login-page)가 아닌 상대경로(login-page)로 해야 MainLayout 안에서 정상적으로 렌더링 가능 */}
          {/* <Route path="about" element={<About />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Login />} />

          {/* 사용자 권환별로 표출 화면 분할 */}
          {/* 질병 안내 페이지 - 모든 사용자가 보임 */}
          <Route path="diease/" element={
              <Diease/>
          
          } /> 
          
          {/* 갑상성 질병상태 예측 페이지 */}
          <Route path="predictDiease" element={
            <ProtectedRoute roles={[] /* 모든 로그인 사용자 허용 */}>
              <PredictDiease/>
            </ProtectedRoute>
          }/>

          {/* 환자 관리 페이지 - 의사&관리자가 로그인하면 보임 */}
          <Route path="patientManage" element={
            <ProtectedRoute roles={[ROLES.DOCTOR, ROLES.ADMIN]}>
              <PatientManage/>
            </ProtectedRoute>
          }/>
          <Route path="patientManage/:id" element={
            <ProtectedRoute roles={[ROLES.DOCTOR, ROLES.ADMIN]}>
              <PatientDetail/>
            </ProtectedRoute>
          }/>

          <Route path="/admin/users" element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <AdminUsers/>
            </ProtectedRoute>
          }/>

          {/* <Route path="patientManage/" element={<PatientManage/>} /> 
          <Route path='predictDiease/'element={<PredictDiease />} />  */}
          {/* 회원유형에 맞게 화면 다르게 보여주는 작업 필요 */}
          {/* <Route path="patient/" element={<Patient/>} /> 환자 페이지 */}  
          {/* <Route path="doctor/" element={<Doctor/>} /> 의사 페이지   */}
        </Route>
      


        {/* 간호사 전용 페이지 (MainLayout 바깥, 독립 페이지) */}
        <Route
          path="nurse/*"
          element={
            <ProtectedRoute allowedRole="nurse" role={userRole}>
              <Nurse /> {/* AppLayout을 포함 */}
            </ProtectedRoute>
          }
        >
        {/* /nurse 진입 시 /nurse/dashboard로 이동 */}
        <Route index element={<Navigate to="dashboard" replace />} />
        {/* Nurse 하위 페이지들 */}
        <Route path="dashboard/*" element={<NurseDashboard />}> {/* Nurse 메인 레이아웃 */}
          <Route index element={<DashboardHome />} />
          <Route path="patients" element={<NursePatients />} />
          <Route path="profile" element={<NurseProfile />} />
        </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
