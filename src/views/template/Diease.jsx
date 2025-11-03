/**
 * 질병 안내 페이지
 * 작성자 : 훤
 * 설명   : 갑상선 관련 질환들을 카드로 보여주고, 선택하면 오른쪽에 상세 설명과
 *          "자세한 진료지침 보기" 모달을 띄울 수 있게 한 화면
 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
} from "reactstrap";

// 질환 데이터 (여기만 더 추가하면 카드가 자동으로 늘어남)
const DISEASES = [
  {
    id: 1,
    name: "갑상선 기능 저하증",
    eng: "Hypothyroidism",
    level: "관리 필요",
    color: "info",
    desc: "갑상선 호르몬이 충분히 분비되지 않아 대사가 느려지는 질환입니다.",
    symptoms: ["피로감", "체중 증가", "추위를 잘 탐", "부종"],
    guideline: [
      "TSH, Free T4 기본 갑상선 기능검사 시행",
      "최근 체중 증가, 부종, 피로가 동반되면 약물치료(레보티록신) 고려",
      "3~6개월 간격으로 호르몬 수치 재측정",
      "임신 계획이 있는 경우 내분비내과와 사전 상담",
    ],
  },
  {
    id: 2,
    name: "갑상선 기능 항진증",
    eng: "Hyperthyroidism",
    level: "주의",
    color: "warning",
    desc: "호르몬이 과도하게 분비되어 대사 속도가 빨라지는 질환입니다.",
    symptoms: ["심장 두근거림", "불안", "체중 감소", "손 떨림"],
    guideline: [
      "TSH 저하 + Free T4, T3 상승 확인",
      "항갑상선제(메티마졸, PTU 등) 1차 고려",
      "심계항진이 심하면 베타차단제 병용",
      "안구돌출, 체중 급감 시 조기 진료 권고",
    ],
  },
  {
    id: 3,
    name: "갑상선 결절",
    eng: "Thyroid Nodule",
    level: "경과 관찰",
    color: "success",
    desc: "갑상선에 혹이 생긴 상태로, 대부분 양성이지만 추적이 필요합니다.",
    symptoms: ["목에 혹이 만져짐", "목 이물감", "대부분 무증상"],
    guideline: [
      "경부 초음파로 크기/형태 먼저 확인",
      "1cm 이상이거나 악성 소견 있으면 세침흡인검사(FNA)",
      "양성이면 6~12개월 간격으로 초음파 추적",
      "급격히 커지거나 통증이 생기면 재검",
    ],
  },
  {
    id: 4,
    name: "갑상선암",
    eng: "Thyroid Cancer",
    level: "전문의 진료",
    color: "danger",
    desc: "조기 발견 시 예후가 좋은 여성에서 흔한 암입니다.",
    symptoms: ["목 앞쪽 덩어리", "쉰 목소리", "목 림프절 비대"],
    guideline: [
      "악성 의심 시 내분비외과/이비인후과 의뢰",
      "수술적 절제 후 방사성요오드 치료 여부 결정",
      "수술 후 갑상선호르몬 보충 및 TSH 억제요법",
      "경부 림프절 주기적 추적",
    ],
  },
  {
    id: 5,
    name: "아급성 갑상선염",
    eng: "Subacute Thyroiditis",
    level: "주의",
    color: "warning",
    desc: "감염 이후 갑상선에 염증이 생기며 일시적인 통증과 기능 이상이 동반됩니다.",
    symptoms: ["갑상선 부위 통증", "미열", "전신 피로", "일시적 기능 항진"],
    guideline: [
      "통증 조절이 우선 (NSAIDs, 필요 시 스테로이드)",
      "일시적 기능 항진은 대개 호전되므로 경과관찰",
      "통증/염증이 길어지면 재평가",
      "드물게 기능저하 단계가 와서 호르몬 보충이 필요할 수 있음",
    ],
  },
  {
    id: 6,
    name: "자가면역성 갑상선염 (하시모토병)",
    eng: "Hashimoto’s Thyroiditis",
    level: "관리 필요",
    color: "info",
    desc: "면역계가 갑상선을 공격하는 만성 자가면역 질환입니다.",
    symptoms: ["피로", "기운 없음", "얼굴 붓기", "목 앞쪽 불편감"],
    guideline: [
      "Anti-TPO, Anti-Tg 항체 검사로 자가면역 여부 확인",
      "기능저하가 동반되면 레보티록신 투여",
      "6~12개월 주기로 기능 상태 모니터링",
      "갑상선이 커지는 경우 초음파로 구조 확인",
    ],
  },
  {
    id: 7,
    name: "산후 갑상선염",
    eng: "Postpartum Thyroiditis",
    level: "경과 관찰",
    color: "success",
    desc: "출산 후 일시적인 갑상선 기능 변화가 오는 경우입니다. 대부분은 회복됩니다.",
    symptoms: ["기분 변화", "피로감", "맥박 변화", "일시적 체중 변화"],
    guideline: [
      "출산 후 6~12개월 안에 기능이 흔들리는 패턴",
      "대부분 자연 회복되나 증상이 심하면 내분비내과 의뢰",
      "기능저하 단계로 진행 시 일시적 호르몬 보충",
      "다음 임신 계획이 있으면 사전 상담",
    ],
  },
];

class Diease extends React.Component {
  state = {
    selected: DISEASES[0], // 현재 선택된 질환
    modalOpen: false, // 모달 열림 여부
  };

  // 카드 클릭했을 때 상세 바꿔주기
  handleSelect = (item) => {
    this.setState({ selected: item });
  };

  // 모달 토글
  toggleModal = () => {
    this.setState((prev) => ({ modalOpen: !prev.modalOpen }));
  };

  render() {
    const { selected, modalOpen } = this.state;

    return (
      <main
        className="profile-page"
        // style={{ backgroundColor: "#0e1446", minHeight: "100vh" }}
      >
        {/* 상단 히어로 영역 (홈이랑 톤 맞춤) */}
        <section className="section section-lg pb-6 text-center text-white">
          <Container>
            <h2 className="display-4 font-weight-bold mb-3 page-title">갑상선 질환 안내</h2>
            <p className="lead text-light">
              갑상선의 기능 이상 / 염증성 질환 / 결절 / 암 정보를 만나보세요. <br />
              질환을 클릭하시면 우측화면에서 상세정보를 확인하실 수 있습니다.
            </p>
            <br/>
          </Container>
        </section>

        {/* 본문 영역 */}
        <section
          className="section pb-8"
          style={{
            backgroundColor: "#f8f9fe",
            marginTop: "-80px",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            paddingTop: "80px",
          }}
        >
          <Container>
            <Row>
              {/* 왼쪽: 질환 카드 리스트 */}
              <Col md="7">
                <Row>
                  {DISEASES.map((d) => (
                    <Col md="6" className="mb-4" key={d.id}>
                      <Card
                        className="shadow-sm"
                        style={{
                          border:
                            selected.id === d.id
                              ? "2px solid #11cdef"
                              : "1px solid #e9ecef",
                          borderRadius: "0.75rem",
                          cursor: "pointer",
                          transition: "0.2s",
                        }}
                        onClick={() => this.handleSelect(d)}
                      >
                        <CardBody>
                          <Badge color={d.color} pill className="mb-2">
                            {d.level}
                          </Badge>
                          <h5 className="mb-1">{d.name}</h5>
                          <small className="text-muted">{d.eng}</small>
                          <p
                            className="mt-2 mb-3 text-muted"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {d.desc}
                          </p>
                          {d.symptoms.map((s, i) => (
                            <Badge
                              key={i}
                              color="light"
                              className="text-dark mr-1 mb-1"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {s}
                            </Badge>
                          ))}
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>

              {/* 오른쪽: 선택된 질환 상세 */}
              <Col md="5">
                <Card
                  className="shadow-lg border-0"
                  style={{ borderRadius: "0.75rem", marginBottom: "1.5rem" }}
                >
                  <CardBody>
                    <Badge color={selected.color} pill className="mb-3">
                      {selected.level}
                    </Badge>
                    <h4 className="font-weight-bold">{selected.name}</h4>
                    <p className="text-muted">{selected.eng}</p>
                    <p className="mt-3" style={{ lineHeight: "1.7" }}>
                      {selected.desc}
                    </p>

                    <h6 className="text-muted mt-4 mb-2">주요 증상</h6>
                    <ul style={{ paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
                      {selected.symptoms.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>

                    <h6 className="text-muted mt-4 mb-2">
                      언제 병원에 가야 하나요?
                    </h6>
                    <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                      갑자기 크기가 커지거나, 쉰 목소리가 지속되거나, 목 주변 림프절이 만져질
                      때는 초음파 및 추가 검사가 필요할 수 있어요. 기존 질환이 있는데 피로/부종이
                      심해졌다면 호르몬 수치 재검을 권장해요.
                    </p>

                    <Button color="info" block onClick={this.toggleModal}>
                      🔍 자세한 진료지침 보기
                    </Button>
                  </CardBody>
                </Card>

                {/* 참고 사이트 카드 */}
                <Card className="shadow border-0">
                  <CardBody>
                    <h5 className="mb-3">참고하면 좋은 사이트</h5>
                    <ul className="list-unstyled mb-0" style={{ lineHeight: "1.8" }}>
                      <li>
                        <a
                          href="https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseList.do"
                          target="_blank"
                          rel="noreferrer"
                        >
                          🏥 아산병원 질환백과
                        </a>
                      </li>
                      <li>
                        <a href="https://www.kdca.go.kr" target="_blank" rel="noreferrer">
                          📊 질병관리청(KDCA)
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.who.int/health-topics/thyroid-disease"
                          target="_blank"
                          rel="noreferrer"
                        >
                          🌐 WHO 갑상선 질환 자료
                        </a>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* 🔔 모달: 자세한 진료지침 */}
        <Modal
          isOpen={modalOpen}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <Card className="shadow-lg border-0">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">{selected.name} 진료지침</h4>
                <Button close onClick={this.toggleModal} />
              </div>
              <p className="text-muted mb-3">{selected.eng}</p>
              <p style={{ lineHeight: "1.6" }}>
                {selected.desc}
              </p>
              <h6 className="text-muted mt-3 mb-2">권장 순서</h6>
              <ul style={{ lineHeight: "1.8" }}>
                {selected.guideline &&
                  selected.guideline.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
              <div className="text-right mt-4">
                <Button color="secondary" onClick={this.toggleModal}>
                  닫기
                </Button>
              </div>
            </CardBody>
          </Card>
        </Modal>
      </main>
    );
  }
}

export default Diease;
