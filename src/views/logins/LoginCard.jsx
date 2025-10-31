/**
 * 로그인 폼
 * 작성자 : 노현정
 * 작성일 : 2025.10.31
 * 수정자 :
 * 수정일 :
 * 수정내용 :
 */
import { Button,
    Card, CardBody, 
    Form, FormGroup, 
    Input, InputGroup, InputGroupText, Container,
    Row, Col, } from "reactstrap";
import { Link } from "react-router-dom";

function LoginForm() {
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
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupText>
                                        <i class="fa fa-regular fa-id-badge"></i>
                                        </InputGroupText>
                                        <Input placeholder="ID" type="text" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupText>
                                        <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                        <Input placeholder="Password" type="password" autoComplete="off"/>
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
                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="button" >
                                        LOGIN
                                    </Button>
                                </div>
                            </Form>
                            <Row className="d-flex justify-content-between mt-4">
                                <Col xs="4">
                                    <a
                                    className="text-light"
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                    <small>비밀번호 찾기</small>
                                    </a>
                                </Col>
                                <Col className="text-right" xs="4">
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
