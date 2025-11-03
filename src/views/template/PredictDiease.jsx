/**
 * PredictDiease.jsx
 * 갑상성 질환 예측 페이지
 * 작성자 : 노현정
 * 작성일 : 2025.11.03
 */
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../../assets/css/predict-page.css"; // 통일용 CSS 추가

const PredictDisease = () => {
  const [patients] = useState([
    { id: 4, name: "김기동", birth: "2025-11-04", gender: "M" },
    { id: 7, name: "김한별", birth: "2021-02-27", gender: "M" },
    { id: 1, name: "홍길동", birth: "1988-05-21", gender: "M" },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [form, setForm] = useState({ tsh: "", t3: "", tt4: "", t4u: "", fti: "" });
  const [result, setResult] = useState(null);
  const [predictions, setPredictions] = useState([
    { id: 19, patientId: 4, pred: 1, proba: 0.9284, model: "v1", predicted_at: "2025-11-03T16:41:38.059380" },
    { id: 18, patientId: 4, pred: 1, proba: 0.9284, model: "v1", predicted_at: "2025-11-03T16:41:32.593433" },
  ]);

  const handleChange = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  const handlePredict = (e) => {
    e.preventDefault();
    if (!selectedPatient) return alert("환자를 먼저 선택하세요.");

    const newResult = {
      id: Date.now(),
      patientId: selectedPatient.id,
      pred: Math.random() > 0.5 ? 1 : 0,
      proba: (Math.random() * 0.5 + 0.5).toFixed(4),
      model: "v1",
      predicted_at: new Date().toISOString(),
    };
    setResult(newResult);
    setPredictions((prev) => [newResult, ...prev]);
  };

  const filteredPreds = selectedPatient
    ? predictions.filter((p) => p.patientId === selectedPatient.id)
    : [];

  return (
    <>
    {/* 상단 헤더 */}
    <section className="section section-lg pb-6 text-center text-white">
        <Container>
        <h2 className="display-4 font-weight-bold mb-3 page-title">갑상선 질병상태 예측</h2>
        <p className="lead mb-0">
            환자별 갑상선 질병상태를 확인하고 예측할 수 있습니다.
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
            <Row className="g-4">
                {/* 왼쪽 환자 목록 */}
                <Col md="5" className="d-flex">
                    <Card className="shadow-sm border-0 flex-fill">
                        <CardBody>
                            <h5 className="section-title">환자 목록</h5>
                            <Table hover responsive className="text-center">
                                <thead className="thead-light">
                                <tr>
                                    <th></th>
                                    <th>이름</th>
                                    <th>생년월일</th>
                                    <th>성별</th>
                                </tr>
                                </thead>
                                <tbody>
                                {patients.map((p) => (
                                    <tr key={p.id}>
                                    <td>
                                        <Input
                                        type="radio"
                                        name="patientSelect"
                                        checked={selectedPatient?.id === p.id}
                                        onChange={() => setSelectedPatient(p)}
                                        />
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.birth}</td>
                                    <td>{p.gender}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

                {/* 오른쪽 예측폼 + 결과 */}
                <Col md="7" className="d-flex">
                <Card className="shadow-sm border-0 flex-fill">
                    <CardBody>
                    <h5 className="section-title mb-3">예측 입력</h5>
                    {selectedPatient ? (
                        <div className="selected-patient-box">
                        <strong>{selectedPatient.name}</strong> 환자 ({selectedPatient.birth} / {selectedPatient.gender})
                        </div>
                    ) : (
                        <p className="text-muted">환자를 먼저 선택하세요.</p>
                    )}

                    <Form onSubmit={handlePredict} className="mt-3">
                        <Row>
                        {Object.keys(form).map((key) => (
                            <Col md="6" key={key} className="mb-3">
                            <Label className="fw-bold">{key.toUpperCase()}</Label>
                            <Input
                                type="number"
                                value={form[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                                placeholder={key}
                            />
                            </Col>
                        ))}
                        </Row>
                        <Button color="primary" className="me-2" type="submit">
                        예측하기
                        </Button>
                        <Button
                        color="secondary"
                        type="button"
                        onClick={() => setForm({ tsh: "", t3: "", tt4: "", t4u: "", fti: "" })}
                        >
                        초기화
                        </Button>
                    </Form>

                    {result && (
                        <div className="mt-4 result-box">
                        <h6>예측 결과</h6>
                        <p>
                            <strong>pred:</strong> {result.pred} <br />
                            <strong>proba:</strong> {result.proba} <br />
                            <strong>model:</strong> {result.model}
                        </p>
                        </div>
                    )}

                    {/* 예측 이력 */}
                    {selectedPatient && (
                        <>
                        <h5 className="section-title mt-5">예측 이력</h5>
                        <Table striped hover responsive className="text-center">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>pred</th>
                                <th>proba</th>
                                <th>model</th>
                                <th>예측일시</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredPreds.length > 0 ? (
                                filteredPreds.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.pred}</td>
                                    <td>{r.proba}</td>
                                    <td>{r.model}</td>
                                    <td>{r.predicted_at}</td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="5" className="text-muted">
                                    예측 이력이 없습니다.
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        </>
                    )}
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  );
};

export default PredictDisease;
