import React from "react";
import { Container, Row, Col, Button } from "reactstrap"; // ✅ 이 줄 꼭 필요!

/**
 * Intro 페이지
 * 작성자 : 노현정
 * 작성일 : 2025.10.30
 * 수정자 :
 * 수정일 :
 * 수정내용 :
 */

export default function Intro(){
    return (
    <Container className="text-center">
      <Row className="justify-content-center">
        <Col lg="8">
          <h1 className="display-3 text-white">갑상선 관련 질환 예측 서비스</h1>
          <p className="lead text-white">
            갑상선 관련 질환 예측 서비스
            Argon Design System 템플릿에 맞춘 메인 인트로 섹션입니다.
          </p>
          <div className="btn-wrapper">
            <Button
              className="btn-icon mb-3 mb-sm-0"
              color="info"
              href="#!"
            >
              <span className="btn-inner--icon">
                <i className="fa fa-code" />
              </span>
              <span className="btn-inner--text">코드 보기</span>
            </Button>
            <Button
              className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
              color="default"
              href="#!"
            >
              <span className="btn-inner--icon">
                <i className="fa fa-play" />
              </span>
              <span className="btn-inner--text">시작하기</span>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    )
};