import styled from "styled-components";
import Progress from "./regist/Progress";

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  height: 56px;
  align-items: center;

  .close {
    width: 32px;
    height: 32px;
    margin-left: 8px;
  }

  .beta {
    width: 33px;
    height: 18px;
    margin-left: 6px;
  }
`;

function Header({ step }: { step: number }) {
  return (
    <HeaderWrapper>
      <img
        className="close"
        src="./img/icon_header_cancel_circle.png"
        alt="닫기버튼"
      />
      <p className="bold_text">차란차 홈서비스 신청</p>
      <img className="beta" src="./img/icon_beta_black.png" alt="베타" />
      <Progress step={step} />
    </HeaderWrapper>
  );
}

export default Header;
