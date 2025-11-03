import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, allowedRole, children }) {
  if (role !== allowedRole) {
    alert("접근 권한이 없습니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
