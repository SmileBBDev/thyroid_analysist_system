/**
 * 공통 예사 폼
 * 작성자 : 노현정
 * 작성일 : 2025.10.31
 * 수정자 :
 * 수정일 :
 * 수정내용 :
 */
import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";


class Profile extends React.Component {
  
  render() {
    return (
      <>
        <main className="profile-page">
          <section className="section-shaped my-0" style={{ height: "300px" }}>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Connect
                        </Button>
                        <Button
                          className="float-right"
                          color="default"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Message
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      필요한 내용은 이 템플릿 파일을 복사하신 뒤에 생성해서 만드세요.
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      상단의 메뉴바에 'Components' 탭에 제가 사용한 템플릿 사용법 url로 연결되어 있어요
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      코드 작성하실 때 ui/ux 통일을 위해서 참고하시면서 작성하시면 좋다고 생각해서 같이 올려놨습니다.
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      Components 드롭메뉴 중에 foundation 들어가 보시면 UI배치라던지, <br/> 
                      현재 템플릿에 사용된 색상 RGB 코드, 글씨 크기 조절 어떻게 해서 보여줄 수 있는지,
                      아이콘은 어떤걸 사용했는지 보실 수 있어요 <br/>
                      아이콘은 import 되어있으니까 그 부분은 가져오지 않으셔도 되고 
                      `i태그 className="ni ni-air-baloon" 중에서 <br/> 뒤쪽 ni-air-baloon에서 air-baloon을 check-bold로 
                      변경하면 i태그 아이콘을 수정할 수 있습니다. <br/>아이콘 클릭하면 바로 복사 되니까 붙여 넣기만 해주시면 됩니다.
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                         Components 드롭메뉴 중에 Components 들어가 보시면 사용 Examples들 있고, 
                         사용법 모르시면 제가 설명드릴테니까 부담갖지 말고 물어봐 주세요. 
                        </p>
                        <a>
                          Show more
                        </a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Profile;
