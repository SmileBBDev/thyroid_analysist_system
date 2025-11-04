import React from "react";
import { Container, Row, Col, Button,
  Card, CardBody } from "reactstrap"; // 컴포넌트 추가할 때 작성
import { Brain, ShieldCheck, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"; // 로그인 정보 확인
import { useNavigate } from "react-router-dom";
import mainImage from "../assets/img/main-imge-01.png";
/**
 * Intro 페이지
 * 작성자 : 노현정
 * 작성일 : 2025.10.30
 * 수정자 : 노현정
 * 수정일 : 2025.11.04
 * 수정내용 : 예측하기 버튼 로그인 상태에 따라 화면UI 경로 다르게 부여
 */

export default function Intro(){
    const navigate = useNavigate();
    const { me } = useAuth(); // 현재 로그인된 사용자 정보

    const handlePredictClick = () => {
      if (me) {
        // 로그인 상태면 예측 페이지로 이동
        navigate("/predictDiease");
      } else {
        // 로그인 안되어 있으면 경고 후 로그인 페이지로 이동
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    };

    return (
      <>
      {/* Hero Section */}
      <section className="py-32">
        <Container className="shape-container d-flex align-items-center py-lg">
          <div className="col px-0">
            <Row className="align-items-center justify-content-center">
              <Container className="text-center">
                <Row className="justify-content-center">
                  <Col lg="8">
                    <motion.h1 className="display-3 text-white">갑상선 관련 질환 예측 서비스</motion.h1>
                    <motion.p className="lead text-white">
                      의료 데이터를 분석해 갑상선 질환의 가능성을 예측하고, 맞춤형 건강 관리 정보를 제공합니다.
                    </motion.p>
                    <motion.div className="btn-wrapper">
                      <Button
                        className="btn-icon mb-3 mb-sm-0"
                        color="info"
                        onClick={handlePredictClick}
                      >
                        <span className="btn-inner--icon">
                          <i className="ni ni-favourite-28" />
                        </span>
                        <span className="btn-inner--text">예측하기</span>
                      </Button>
                      {/* <Button
                        className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                        color="default"
                        href="#!"
                      >
                        <span className="btn-inner--icon">
                          <i className="fa fa-play" />
                        </span>
                        <span className="btn-inner--text">시작하기</span>
                      </Button> */}
                    </motion.div>
                  </Col>
                  <Col md="6" className="text-center mt-6 md:mt-0">
                  <div
                      className="image-wrapper bg-white rounded shadow"
                      style={{
                        maxWidth: "480px",
                        padding: "20px",
                        borderRadius: "16px",
                      }}
                    >
                    <img
                      src={mainImage}  //"https://cdn-icons-png.flaticon.com/512/8842/8842150.png"
                      alt="AI Medical Illustration"
                      className="img-fluid rounded shadow"
                      style={{ borderRadius: "12px" }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                    />
                    </div>
                  </Col>
                </Row>
              </Container>
            </Row>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <Container>
          <motion.h2 className="text-center">주요 기능</motion.h2>
          <Row>
            <Col md="4">
              <Card>
                <CardBody>
                  <Brain className="mx-auto text-info mb-4" size={48} />
                  <h5 className="font-bold mb-2">AI 분석 기반 예측</h5>
                  <p className="text-gray-400">
                    머신러닝 모델을 통해 갑상선 질환 가능성을 정밀하게 분석합니다.
                  </p>
                </CardBody>
              </Card>
            </Col>

            <Col md="4">
              <Card>
                <CardBody>
                  <BarChart className="mx-auto text-info mb-4" size={48} />
                  <h5 className="font-bold mb-2">결과 시각화 제공</h5>
                  <p className="text-gray-400">
                    예측 결과를 직관적인 그래프 형태로 제공합니다.
                  </p>
                </CardBody>
              </Card>
            </Col>

            <Col md="4">
              <Card>
                <CardBody>
                  <ShieldCheck className="mx-auto text-info mb-4" size={48} />
                  <h5 className="font-bold mb-2">안전한 데이터 관리</h5>
                  <p className="text-gray-400">
                    모든 의료 데이터는 암호화되어 안전하게 관리됩니다.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      </>
    )
};