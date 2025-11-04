import { useEffect, useState } from "react";
import api from "../../services/client";
import React from "react";
import { Container, Card, CardHeader, CardBody, Table, Input } from "reactstrap";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  // 사용자 목록 불러오기
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error("사용자 목록 로드 실패:", err);
      setUsers([]);
    }
  }

  async function changeRole(username, newRole) {
    try {
      await api.post("/auth/change-role", {
        username: username,
        role: newRole,
      });
      alert(`'${username}'의 등급이 '${newRole}'로 변경되었습니다.`);
      loadUsers(); // 변경 즉시 갱신
    } catch (err) {
      console.error("등급 변경 실패:", err);
      alert("변경 실패: 권한이 없거나 서버 오류");
    }
  }

  return (
    <>
      {/* 상단 헤더 */}
      <section className="section section-lg pb-6 text-center text-white">
          <Container>
          <h2 className="display-4 font-weight-bold mb-3 page-title">사용자 관리</h2>
          <p className="lead mb-0">
              관리자는 가입된 사용자의 접근 권한 설정이 가능합니다.
          </p>
          <p></p>
          </Container>
      </section>

      {/* 본문 */}
      <section
      className="section pt-6"
      style={{
          background: "#f8f9fe",
          marginTop: "-70px",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
      }}
      >
        <Container fluid className="py-7 px-5">
        {users.length > 0 ? (
          <Table hover responsive className="text-center align-middle">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>사용자명</th>
                <th>이메일</th>
                <th>현재 등급</th>
                <th>등급 변경</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="fw-bold">{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email || "-"}</td>
                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        u.role === "admin"
                          ? "bg-dark text-white"
                          : u.role === "doctor"
                          ? "bg-success text-white"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {u.role || "general"}
                    </span>
                  </td>
                  <td>
                    <Input
                      type="select"
                      value={u.role || "general"}
                      onChange={(e) => changeRole(u.username, e.target.value)}
                      className="form-select-sm"
                      // style={{ maxWidth: 140, margin: "0 auto" }}
                      style={{
                        maxWidth: 140,
                        borderRadius: "8px",
                        height: "45px",
                        borderColor: "#ddd",
                        fontSize: "0.95rem",
                        backgroundColor: "#fff",
                        paddingRight: "35px", // 오른쪽 여백 확보
                        textAlign : "center",
                        marginLeft:"10px",
                      }}
                    >
                      <option value="general">일반</option>
                      <option value="doctor">의사</option>
                      <option value="admin">관리자</option>
                    </Input>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center text-muted py-4">
            사용자 정보가 없습니다.
          </div>
        )}
        </Container>
      </section>
    </> 
  );
}
