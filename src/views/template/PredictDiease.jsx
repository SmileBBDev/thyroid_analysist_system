/**
 * PredictDiease.jsx
 * 갑상성 질환 예측 페이지
 * 작성자 : 노현정
 * 작성일 : 2025.11.03
 */
import { useEffect, useMemo, useState } from "react";
import api from "../../services/client.js";
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
    const [features, setFeatures] = useState([]);
    const [form, setForm] = useState({});
    const [result, setResult] = useState(null);

    const [patients, setPatients] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [currentPatient, setCurrentPatient] = useState(null); // 환자 상세 + predictions
    const [predList, setPredList] = useState([]);

    const [loading, setLoading] = useState(false);

    // 1) 스키마 + 환자목록 로드
    useEffect(() => {
        (async () => {
        // 스키마
        try {
            const s = await api.get("/schema", { params: { minimal: 1 } });
            const feats = Array.isArray(s.data) ? s.data : [];
            setFeatures(feats);
            const init = {};
            feats.forEach((f) => (init[f] = ""));
            setForm(init);
        } catch (e) {
            console.error("load schema failed:", e);
        }
        // 환자 목록
        try {
            const r = await api.get("/patients"); // 목록 (뒤 슬래시 X)
            const data = r.data.results ?? r.data;
            if (Array.isArray(data)) setPatients(data);
        } catch (e) {
            console.error("load patients failed:", e);
            setPatients([]);
        }
        })();
    }, []);

     // 2) 환자 선택 시 환자 상세(= predictions 포함) 로드
    useEffect(() => {
        if (!patientId) {
        setCurrentPatient(null);
        setPredList([]);
        return;
        }
        loadPatientDetail(patientId);
    }, [patientId]);

    // ===== 환자 상세 로드: GET /api/patients/:id  (predictions 포함) =====
    async function loadPatientDetail(pid) {
        try {
        const r = await api.get(`/patients/${pid}`); // detail (뒤 슬래시 X)
        const p = r.data;
        setCurrentPatient(p);

        const preds = Array.isArray(p?.predictions) ? p.predictions : [];
        // predicted_at DESC 정렬
        const sorted = [...preds].sort((a, b) =>
            (b.predicted_at || "").localeCompare(a.predicted_at || "")
        );
        setPredList(sorted);
        } catch (e) {
        console.error("load patient detail failed:", e);
        setCurrentPatient(null);
        setPredList([]);
        }
    }

    const order = useMemo(() => features, [features]);

    const updateField = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // 예측 실행
    async function onPredict(e) {
        e.preventDefault();

        // 환자 선택 여부 검사 후 예측 실행
        if (!patientId) {
            alert("환자를 먼저 선택하세요.");
            return;
        }

        if (features.length === 0) return;

        const values = order.map((f) => {
        const v = form[f];
        if (v === "" || v == null) return v;
        const num = Number(v);
        return Number.isFinite(num) ? num : v;
        });

        const payload = { values, order };
        if (patientId) payload.patient_id = Number(patientId);

        setLoading(true);
        setResult(null);
        try {
        const r = await api.post(`/predict`, payload, { params: { minimal: 0 } });
        setResult(r.data || null);

        // 예측 성공 직후: 환자 상세 재조회 → predictions 최신 반영
        if (patientId) {
            await loadPatientDetail(patientId);
        }
        } catch (e) {
        console.error("predict failed:", e);
        alert("예측 실패");
        } finally {
        setLoading(false);
        }
    }

    // 예측 삭제
    async function deletePrediction(id) {
        if (!confirm(`예측 #${id} 를 삭제할까요?`)) return;
        try {
        await api.delete(`/patients/predictions/${id}`); // 뒤 슬래시 없음
        // 삭제 직후: 환자 상세 재조회 → 리스트 갱신
        if (patientId) {
            await loadPatientDetail(patientId);
        }
        } catch (e) {
        console.error("delete prediction failed:", e);
        alert("삭제 실패");
        }
    }

    function resetForm() {
        const cleared = {};
        features.forEach((f) => (cleared[f] = ""));
        setForm(cleared);
        setResult(null);
    }

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
                            <h5 className="section-title mb-4">환자 목록</h5>
                            <Table hover responsive className="text-center">
                            <thead className="thead-light">
                                <tr>
                                <th>이름</th>
                                <th>생년월일</th>
                                <th>성별</th>
                                </tr>
                            </thead>
                              <tbody>
                                {patients.map((p) => {
                                    const isSelected = patientId === String(p.id); // 현재 선택된 환자인지 확인
                                    return (
                                        <tr
                                        key={p.id}
                                        onClick={() => setPatientId(String(p.id))} // 클릭 시 선택
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: isSelected ? "#e3f2fd" : "transparent", // 선택 시 색상 강조
                                            fontWeight: isSelected ? "600" : "normal",
                                        }}
                                        >
                                        <td>{p.name}</td>
                                        <td>{p.birth_date ? p.birth_date : "-"}</td>
                                        <td>{p.sex ? p.sex : "-"}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

                {/* 오른쪽 예측폼 + 결과 */}
                <Col md="7" className="d-flex">
                <Card className="shadow-sm border-0 flex-fill">
                    <CardBody>
                    <Row>
                        <Col>
                            <h5 className="section-title mb-3">예측 입력</h5>
                        </Col>
                        <Col>
                        {/* 선택 상태 표시 */}
                        <div className="mt-3 text-center">
                        {patientId ? (
                            <span style={{ color: "#0a7", fontWeight: 600 }}>저장 모드 (의사/관리자)</span>
                        ) : (
                            <span style={{ color: "#555" }}>미저장 모드</span>
                        )}
                        </div>
                        </Col>
                    </Row>
                    {/* 선택 환자 정보 간단 표시 */} 
                    {currentPatient ? (
                        <div
                            className="selected-patient-box"
                            style={{
                            background: "#fbfbfb",
                            padding: "12px 16px",
                            borderRadius: 8,
                            fontSize: "0.95rem",
                            border: "1px solid #eee",
                            }}
                        >
                            <strong>{currentPatient.name}</strong> 환자{" "}
                            {currentPatient.birth_date ? `(${currentPatient.birth_date})` : ""}{" "}
                            {currentPatient.sex ? `/${currentPatient.sex}` : ""}
                        </div>
                        ) : (
                        <p className="text-muted" style={{ fontSize: "0.9rem", marginTop: 8 }}>
                            환자를 먼저 선택하세요.
                        </p>
                    )}

                    {/* 입력 폼 */}
                    <Form onSubmit={onPredict} className="mt-3">
                    <Row>
                        {features.map((f) => (
                        <Col md="6" key={f} className="mb-3">
                            <Label htmlFor={`feat-${f}`} className="fw-bold">{f.toUpperCase()}</Label>
                            <Input
                            id={`feat-${f}`}
                            type="number"
                            placeholder={f}
                            value={form[f] ?? ""}
                            onChange={(e) => updateField(f, e.target.value)}
                            />
                        </Col>
                        ))}
                    </Row>

                    <div className="d-flex gap-2">
                        <Button color="primary" type="submit" disabled={loading}>
                        {loading ? "예측 중..." : "예측하기"}
                        </Button>
                        <Button color="secondary" type="button" onClick={resetForm}>
                        입력 초기화
                        </Button>
                    </div>
                    </Form>

                    {result && (
                        <div className="mt-4 result-box">
                            <h6>예측 결과</h6>
                            <p> <strong>pred:</strong>{" "}
                            {Array.isArray(result.pred)
                                ? result.pred.join(", ")
                                : String(result.pred)}
                            <br />
                            {"proba" in result && (
                                <>
                                <strong>proba:</strong>{" "}
                                {Array.isArray(result.proba)
                                    ? result.proba.map((x) =>
                                        x != null ? Number(x).toFixed?.(4) ?? x : "-").join(", ")
                                    : result.proba ?? "-"}
                                <br />
                                </>
                            )}
                            {result.model_version ? (
                                <>
                                    <strong>model_version:</strong> {result.model_version}
                                </>
                            ) : result.model ? (
                                <>
                                    <strong>model:</strong> {result.model}
                                </>
                            ) : null}
                            </p>
                        </div>
                    )}


                    {/* 예측 이력 */}
                    {patientId && (
                    <>
                        <h5 className="section-title mt-5">예측 이력 (환자 #{patientId})</h5>
                        <Table striped hover responsive bordered className="text-center align-middle">
                        <thead className="table-light">
                            <tr>
                            <th>ID</th>
                            <th>pred</th>
                            <th>proba</th>
                            <th>model</th>
                            <th>예측일시</th>
                            <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {predList.length > 0 ? (
                            predList.map((item) => {
                                const pred = Array.isArray(item.result?.pred)
                                ? item.result.pred.join(", ")
                                : String(item.result?.pred ?? "-");
                                const proba = Array.isArray(item.result?.proba)
                                ? item.result.proba
                                    .map((x) => (x != null ? Number(x).toFixed?.(4) ?? x : "-"))
                                    .join(", ")
                                : item.result?.proba ?? "-";
                                const mv = item.result?.model_version ?? "-";

                                return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{pred}</td>
                                    <td>{proba}</td>
                                    <td>{mv}</td>
                                    <td>{item.predicted_at || "-"}</td>
                                    <td>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => deletePrediction(item.id)}
                                    >
                                        삭제
                                    </Button>
                                    </td>
                                </tr>
                                );
                            })
                            ) : (
                            <tr>
                                <td colSpan="6" className="text-muted">
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
