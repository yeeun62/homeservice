import styled from "styled-components";

const IntroduceWrap = styled.div`
  height: 88px;
  padding: 24px 17px;
  background-color: #0740e4;

  p {
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    font-family: "Noto Sans KR";
    text-align: center;
    letter-spacing: -0.02em;
    max-width: 400px;
    margin: auto;
  }

  /* pc */
  @media screen and (min-width: 750px) {
    p {
      font-size: 15px;
      line-height: 22px;
    }
  }
`;

function Introduce() {
  return (
    <IntroduceWrap>
      <p>
        전문과와 1:1 라이브로 차량을 확인후 원하는 곳으로 받아보세요. 3+1일 동안
        타 보고 맘에 안들면 환불 할 수 있습니다.
      </p>
    </IntroduceWrap>
  );
}

export default Introduce;
