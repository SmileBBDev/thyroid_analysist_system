/**
 * 로그인 폼
 * 작성자 : 노현정
 * 작성일 : 2025.10.31
 * 수정자 : 노현정
 * 수정일 : 2025.11.04
 * 수정내용 : 로그인 기능 연결 (useAuth, useNavigate)
 */
import {useState} from "react";
import { Button,
    Card, CardBody, 
    Form, FormGroup, 
    Input, InputGroup, InputGroupText, Container,
    Row, Col, } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
        await login(form.username, form.password);
        navigate("/"); // ✅ 로그인 성공 시 메인 페이지로 이동
        } catch (err) {
        setError("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.");
        } finally {
        setLoading(false);
        }
    }

    return (
        <>
        <Container className="py-lg-md d-flex justify-content-center">
            <div className="col px-0 text-center">
                <Container className="pt-lg-7">
                    <Row className="justify-content-center">
                        <Col lg="5">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <h2 className="login-header">
                                        로그인
                                    </h2>
                                    <div className="text-center text-muted mb-4">
                                        <small>사용자 정보를 입력하여 주세요.</small>
                                    </div>
                                <Form role="form" onSubmit={onSubmit}>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupText>
                                            <i className="fa fa-regular fa-id-badge"></i>
                                            </InputGroupText>
                                            <Input 
                                                placeholder="ID" 
                                                type="text"
                                                value={form.username}
                                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                                required
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                            <Input 
                                                placeholder="Password" 
                                                type="password" 
                                                value={form.password}
                                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                                required
                                                autoComplete="off"
                                            />
                                        </InputGroup> 
                                    </FormGroup>
                                    {/* ID 기억하기 UI */}
                                    {/* <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                        className="custom-control-input"
                                        id="customCheckLogin"
                                        type="checkbox"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customCheckLogin"
                                    >
                                        <span>Remember me</span>
                                    </label>
                                    </div> */}
                                    {error && (
                                    <div className="text-danger mb-3" style={{ fontSize: "0.9rem" }}>
                                        {error}
                                    </div>
                                    )}

                                    <div className="text-center">
                                        <Button 
                                            className="my-4" 
                                            color="primary" 
                                            type="submit" 
                                            disabled={loading}
                                        >
                                            {loading ? "로그인 중..." : "LOGIN"}
                                        </Button>
                                    </div>
                                </Form>
                                
                                <Row className="d-flex justify-content-center">
                                    {/* <Col xs="4">
                                        <a
                                        className="text-light"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                        >
                                        <small>비밀번호 찾기</small>
                                        </a>
                                    </Col> */}
                                    <Col className="text-center" xs="4">
                                        <Link to="/register" className="text-light">
                                        <small>회원가입</small>
                                        </Link>
                                    </Col>
                                    
                                </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
        </>
    );
}
export default LoginForm;
