/**
 * PatientManage.jsx
 * 의사용 환자 관리 페이지
 * 작성자 : 훤
 * 작성일 : 2025.11.03
 * 수정자 : 노현정
 * 수정일 : 2025.11.04
 * 수정내용 : DB연동한 환자 관리 페이지로 수정
 */

import React, { useState, useEffect } from "react";
import api from "../../services/client";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
  Table,
} from "reactstrap";

const SEX_LABELS = { M: "남", F: "여" };
const displaySex = (p) => (p?.sex ? (SEX_LABELS[p.sex] ?? p.sex) : "-");

export default function PatientManage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: "", sex: "M", birth_date: "" });
  const [refreshKey, setRefreshKey] = useState(0);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", sex: "M", birth_date: "" });

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get("/patients/");
        const data = r.data.results ?? r.data;
        setList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("GET /patients/ failed:", err);
        setList([]);
      }
    })();
  }, [refreshKey]);

  async function createPatient(e) {
    e.preventDefault();
    try {
      await api.post("/patients/", form);
      setForm({ name: "", sex: "M", birth_date: "" });
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error("POST /patients/ failed:", err);
      alert("환자 생성 실패");
    }
  }

  function startEdit(p) {
    setEditId(p.id);
    setEditForm({
      name: p.name ?? "",
      sex: p.sex ?? "M",
      birth_date: p.birth_date ?? "",
    });
  }

  function cancelEdit() {
    setEditId(null);
  }

  // 개인정보 수정버튼 클릭 시 호출
  async function saveEdit(id) {
    try {
      const updated = {
        name: editForm.name,
        birth_date: editForm.birth_date,
        sex: editForm.sex,
      };

      // PUT 시도
      await api.put(`/patients/${id}`, updated);
      applyLocalUpdate(id, updated);
    } catch (err) {
      try {
        // PATCH fallback
        await api.patch(`/patients/${id}`, updated);
        applyLocalUpdate(id, updated);
      } catch (err2) {
        console.error(`UPDATE /patients/${id} failed:`, err2);
        alert("수정 실패");
      }
    }
  }
  function applyLocalUpdate(id, updated) {
    setList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    setEditId(null);
  }

  // async function saveEdit(id) {
  //   try {
  //     await api.put(`/patients/${id}`, {
  //       name: editForm.name,
  //       birth_date: editForm.birth_date,
  //       sex: editForm.sex,
  //     });
  //     setEditId(null);
  //     setRefreshKey((k) => k + 1);
  //   } catch (err) {
  //     try {
  //       await api.patch(`/patients/${id}`, {
  //         name: editForm.name,
  //         birth_date: editForm.birth_date,
  //         sex: editForm.sex,
  //       });
  //       setEditId(null);
  //       setRefreshKey((k) => k + 1);
  //     } catch (err2) {
  //       console.error(`UPDATE /patients/${id} failed:`, err2);
  //       alert("수정 실패");
  //     }
  //   }
  // }

  // ✅ DELETE - 슬래시 제거
  async function deletePatient(id) {
    if (!confirm(`환자 #${id} 를 삭제할까요?`)) return;
    try {
      await api.delete(`/patients/${id}`); // ← 슬래시 제거됨
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error(`DELETE /patients/${id} failed:`, err);
      alert("삭제 실패");
    }
  }

  return (
    <main>
      {/* 상단 타이틀 */}
      <section className="section section-lg pb-6 text-center text-white">
        <Container>
          <h2 className="display-4 mb-2 page-title">환자 관리</h2>
          <p className="lead mb-0">
            환자 등록, 수정 및 삭제를 수행하고 상세 정보를 관리할 수 있습니다.
          </p>
          <p></p>
        </Container>
      </section>

      {/* 본문 영역 */}
      <section
        className="section pt-6"
        style={{
          background: "#f8f9fe",
          marginTop: "-70px",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
        }}
      >
        <Container fluid className="py-5 px-7">
          <Row>
            {/* 왼쪽: 등록 폼 */}
            <Col md="4" className="mb-4">
              <Card className="shadow border-0">
                <CardBody>
                  <h4 className="mb-3 text-center" style={{ color: "#2a2a72", fontWeight: 600 }}>신규 환자 등록</h4>
                  <Form onSubmit={createPatient}>
                    
                    <FormGroup>
                      <Label className="font-weight-bold">이름</Label>
                      <Input
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="예) 김민지"
                        required
                      />
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Label className="font-weight-bold">성별</Label>
                      <Input
                        type="select"
                        value={form.sex}
                        onChange={(e) => setForm({ ...form, sex: e.target.value })}
                        style={{
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
                        <option value="M"> 남</option>
                        <option value="F"> 여</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label className="font-weight-bold">생년월일</Label>
                      <Input
                        type="date"
                        value={form.birth_date}
                        onChange={(e) =>
                          setForm({ ...form, birth_date: e.target.value })
                        }
                      />
                    </FormGroup>

                    <Button color="info" block type="submit">
                      등록하기
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>

            {/* 오른쪽: 환자 목록 */}
            <Col md="8">
              <Card className="shadow border-0">
                <CardHeader className="bg-white border-0 d-flex justify-content-between align-items-center">
                  <h4 className="mb-0"  style={{ color: "#2a2a72", fontWeight: 600 }}>환자 목록</h4>
                  <small className="text-muted">
                    총 {list.length}명
                  </small>
                </CardHeader>

                <CardBody>
                  <Table responsive hover className="text-center align-middle">
                    <thead className="thead-light">
                      <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>성별</th>
                        <th>생년월일</th>
                        <th>작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((p) => {
                        const isEdit = editId === p.id;
                        return (
                          <tr key={p.id}>
                            <td>{p.id}</td>

                            {/* 이름 */}
                            <td>
                              {isEdit ? (
                                <Input
                                  bsSize="sm"
                                  value={editForm.name}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                <Link
                                  to={`/patients/${p.id}`}
                                  className="text-primary fw-semibold"
                                >
                                  {p.name}
                                </Link>
                              )}
                            </td>

                            {/* 성별 */}
                            <td>
                              {isEdit ? (
                                <Input
                                  type="select"
                                  bsSize="sm"
                                  value={editForm.sex}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      sex: e.target.value,
                                    })
                                  }
                                  style={{
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
                                  <option value="M">남</option>
                                  <option value="F">여</option>
                                </Input>
                              ) : (
                                displaySex(p)
                              )}
                            </td>

                            {/* 생년월일 */}
                            <td>
                              {isEdit ? (
                                <Input
                                  type="date"
                                  bsSize="sm"
                                  value={editForm.birth_date}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      birth_date: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                p.birth_date || "-"
                              )}
                            </td>

                            {/* 버튼 */}
                            <td>
                              {isEdit ? (
                                <>
                                  <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => saveEdit(p.id)}
                                  >
                                    저장
                                  </Button>
                                  <Button
                                    color="secondary"
                                    size="sm"
                                    className="ms-2"
                                    onClick={cancelEdit}
                                  >
                                    취소
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    color="info"
                                    size="sm"
                                    onClick={() => startEdit(p)}
                                  >
                                    수정
                                  </Button>
                                  <Button
                                    color="danger"
                                    size="sm"
                                    className="ms-2"
                                    onClick={() => deletePatient(p.id)}
                                  >
                                    삭제
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {list.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-muted py-4">
                            등록된 환자가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
