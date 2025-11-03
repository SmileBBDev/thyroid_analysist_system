/**
 * 회원가입 폼
 * 작성자 : 노현정
 * 작성일 : 2025.10.31
 * 수정자 :
 * 수정일 :
 * 수정내용 :
 */
/**
 * todo
 * 1. 아이디 중복 체크 버튼 생성 및 중복 체크 단계 필요
 * 2. 비밀번호 validation 체크
 * 3. 회원 유형에 맞춰서 전문과, 소속에 표출될 수 있도록 코드 수정 필요
 * 4. value랑 selectBox 하드코딩 및 한글 value 수정 필요 => DB에서 받아오던
 */
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

import { Button,
    Card, CardBody, 
    Form, FormGroup, 
    Input, InputGroup, InputGroupText, Container,
    Row, Col, } from "reactstrap";

function RegisterForm() {
    const [phone, setPhone] = useState(""); // 휴대전화번호 상태 선언
      const navigate = useNavigate(); // 페이지 이동에 사용

    // 계정 생성 버튼 클릭 시 발생할 이벤트
    const handleSignupComplete = () => {
        alert("관리자 승인 후 사용 가능합니다");
        navigate("/");
    };


  
    return (
        <>
        <Container className="py-lg-md d-flex justify-content-center">
            <div className="col px-0 text-center">
                <Container className="pt-lg-5">
                    <Row className="justify-content-center">
                        <Col lg="7">
                            {/* 회원가입 Card */}
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <h2 className="login-header">
                                        회원가입
                                    </h2>
                                    <div className="text-center text-muted mb-4">
                                        <small>사용자 정보를 입력하여 주세요.</small>
                                    </div>
                                    
                                    {/* 아이디 */}   
                                    <Form role="form">
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupText>
                                                <i className="fa fa-regular fa-id-badge"></i>
                                                </InputGroupText>
                                                <Input placeholder="ID" type="text" />
                                            </InputGroup>
                                        </FormGroup>
                                        {/* 비밀번호 */}
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupText>
                                                <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                                <Input placeholder="Password" type="password" autoComplete="off"/>
                                            </InputGroup> 
                                            <div className="text-muted font-italic">
                                                <small>
                                                    password strength:{" "}
                                                    <span className="text-success font-weight-700">
                                                    패스워드 안전하다 아니다 체크 추가
                                                    </span>
                                                </small>
                                            </div>
                                        </FormGroup>
                                        {/* 이름 */}
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupText>
                                                <i className="fa fa-solid fa-user"></i>
                                                </InputGroupText>
                                                <Input 
                                                    placeholder="이름을 입력해 주세요." 
                                                    name="name"
                                                    type="text" 
                                                    required
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        {/* 연락처 */}
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupText>
                                                    <i className="fa fa-phone"></i>
                                                </InputGroupText>
                                                <Input
                                                    type="tel"
                                                    name="phone"
                                                    value={phone}
                                                    onChange={(e) => {
                                                        let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만
                                                        if (value.length > 3 && value.length <= 7)
                                                        value = value.replace(/(\d{3})(\d+)/, "$1-$2");
                                                        else if (value.length > 7)
                                                        value = value.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
                                                        setPhone(value);
                                                    }}
                                                    placeholder="연락처를 입력해 주세요."
                                                    maxLength="13"
                                                    />
                                            </InputGroup>
                                        </FormGroup>

                                        {/* 회원 유형 */}
                                        {/* <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupText>
                                            <i className="fa fa-user-circle" />
                                            </InputGroupText>
                                            <Input 
                                                id="memberType" 
                                                name="memberType" 
                                                type="select"
                                                className="form-control form-control-alternative custom-selectbox"
                                            >
                                            <option value="">회원 유형을 선택하세요</option>
                                            <option value="general">일반</option>
                                            <option value="doctor">의사</option>
                                            <option value="nurse">간호사</option>
                                            </Input>
                                        </InputGroup>
                                        </FormGroup> */}

                                        {/* 전문과 */}
                                        {/* <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupText>
                                            <i className="fa fa-stethoscope" />
                                            </InputGroupText>
                                            <Input 
                                                id="specialty" 
                                                name="specialty"
                                                type="select"
                                                className="form-control form-control-alternative custom-selectbox"
                                            >
                                            <option value="">전문과를 선택하세요</option>
                                            <option value="내과">내과</option>
                                            <option value="외과">외과</option>
                                            <option value="소아과">소아과</option>
                                            <option value="정형외과">정형외과</option>
                                            </Input>
                                        </InputGroup>
                                        </FormGroup> */}

                                        {/* 직급 */}
                                        {/* <FormGroup className="mb-4">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupText>
                                            <i className="fa fa-briefcase" />
                                            </InputGroupText>
                                            <Input 
                                                id="position" 
                                                name="position" 
                                                type="select"
                                                className="form-control form-control-alternative custom-selectbox"
                                            >
                                            <option value="">직급을 선택하세요</option>
                                            <option value="정교수">정교수</option>
                                            <option value="부교수">부교수</option>
                                            <option value="조교수">조교수</option>
                                            <option value="임상강사">임상강사</option>
                                            <option value="전임의">전임의 (펠로우)</option>
                                            <option value="전문의">전문의</option>
                                            <option value="레지던트">레지던트</option>
                                            <option value="인턴">인턴</option>
                                            </Input>
                                        </InputGroup>
                                        </FormGroup> */}
                                        

                                        {/* 회원가입 완료 버튼 */}
                                        <div className="text-center">
                                            <Button 
                                                className="my-4" color="primary" type="button" 
                                                onClick={handleSignupComplete}
                                            >
                                                계정 생성
                                            </Button>
                                        </div>

                                    </Form>
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
export default RegisterForm;
