/**
 * PatientManage.jsx
 * 의사용 환자 관리 페이지
 * 작성자 : 훤
 * 작성일 : 2025.11.03
 */

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
  Table,
} from "reactstrap";

const initPatients = [
  {
    id: 1,
    name: "김민지",
    gender: "F",
    age: 34,
    diagnosis: "갑상선 기능 저하증",
    risk: "중간",
    contact: "010-1234-5678",
  },
  {
    id: 2,
    name: "박준호",
    gender: "M",
    age: 42,
    diagnosis: "갑상선 결절",
    risk: "관찰",
    contact: "010-5555-9988",
  },
];

const PatientManage = () => {
  const [patients, setPatients] = useState(initPatients);
  const [selected, setSelected] = useState(initPatients[0]);
  const [form, setForm] = useState({
    name: "",
    gender: "F",
    age: "",
    diagnosis: "",
    contact: "",
    risk: "관찰",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age) return;

    const newPatient = {
      id: patients.length + 1,
      ...form,
      age: Number(form.age),
    };
    setPatients([newPatient, ...patients]);
    setForm({
      name: "",
      gender: "F",
      age: "",
      diagnosis: "",
      contact: "",
      risk: "관찰",
    });
  };

  return (
    <main>
      {/* 상단 헤더 */}
      <section className="section section-lg pb-6 text-center text-white">
        <Container>
          <h2 className="display-4 mb-2 page-title">환자 관리</h2>
          <p className="lead mb-0">
            환자 정보를 등록하고, 갑상선 질환 진단 및 위험도를 관리할 수 있습니다.
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
        <Container>
          <Row>
            {/* 왼쪽 : 환자 목록 */}
            <Col md="7" className="mb-4">
              <Card className="shadow border-0">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">등록된 환자</h4>
                    <small className="text-muted">총 {patients.length}명</small>
                  </div>

                  {/* 테이블 */}
                  <Table responsive hover className="align-items-center">
                    <thead className="thead-light">
                      <tr>
                        <th>이름</th>
                        <th>나이</th>
                        <th>진단</th>
                        <th>위험도</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((p) => (
                        <tr
                          key={p.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => setSelected(p)}
                        >
                          <td>{p.name}</td>
                          <td>{p.age}</td>
                          <td>{p.diagnosis || "-"}</td>
                          <td>
                            <Badge
                              color={
                                p.risk === "높음"
                                  ? "danger"
                                  : p.risk === "중간"
                                  ? "warning"
                                  : "info"
                              }
                              pill
                            >
                              {p.risk}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* 선택 환자 정보 */}
                  {selected && (
                    <div className="mt-4">
                      <h5 className="mb-2">{selected.name} 환자 정보</h5>
                      <p className="mb-1 text-muted">
                        연락처: {selected.contact || "미입력"}
                      </p>
                      <p className="mb-1 text-muted">
                        진단명: {selected.diagnosis || "미입력"}
                      </p>
                      <p className="mb-1 text-muted">
                        위험도:{" "}
                        <Badge
                          color={
                            selected.risk === "높음"
                              ? "danger"
                              : selected.risk === "중간"
                              ? "warning"
                              : "info"
                          }
                          pill
                        >
                          {selected.risk}
                        </Badge>
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>

            {/* 오른쪽 : 등록 폼 */}
            <Col md="5">
              <Card className="shadow border-0 mb-4">
                <CardBody>
                  <h4 className="mb-3">새 환자 등록</h4>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label>이름</Label>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="예) 김민지"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>성별</Label>
                      <Input
                        type="select"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                      >
                        <option value="F">여</option>
                        <option value="M">남</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>나이</Label>
                      <Input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="숫자만 입력"
                        min="0"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>진단</Label>
                      <Input
                        name="diagnosis"
                        value={form.diagnosis}
                        onChange={handleChange}
                        placeholder="예) 갑상선 결절"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>연락처</Label>
                      <Input
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>위험도</Label>
                      <Input
                        type="select"
                        name="risk"
                        value={form.risk}
                        onChange={handleChange}
                      >
                        <option value="관찰">관찰</option>
                        <option value="중간">중간</option>
                        <option value="높음">높음</option>
                      </Input>
                    </FormGroup>
                    <Button color="info" block type="submit">
                      등록하기
                    </Button>
                  </Form>
                </CardBody>
              </Card>

              <Card className="shadow border-0">
                <CardBody>
                  <h5 className="mb-2">예측/검사 연동 예정</h5>
                  <p className="text-muted mb-2">
                    Django API와 연결하면 이 환자의 갑상선 검사값(TSH, T3, T4)
                    및 모델 예측 결과를 자동으로 불러올 수 있습니다.
                  </p>
                  <Button color="secondary" size="sm" disabled>
                    Django API 연동 필요
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default PatientManage;
