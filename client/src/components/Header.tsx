import styled from "styled-components";
import Progress from "./regist/Progress";
import { stickTop } from "../styles/recycle";

const HeaderWrapper = styled(stickTop)`
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

  @media screen and (min-width: 750px) {
    .close {
      display: none;
    }

    p {
      margin-left: 32px;
    }
  }
`;

function Header({ step }: { step?: number }) {
  return (
    <HeaderWrapper>
      <img
        className="close"
        src="./img/icon_header_cancel_circle.png"
        alt="닫기버튼"
      />
      <p className="bold_text">차란차 홈서비스 신청</p>
      <img className="beta" src="./img/icon_beta_black.png" alt="베타" />
      {window.location.pathname.slice(1).toLocaleLowerCase() === "regist" && (
        <Progress step={step} />
      )}
    </HeaderWrapper>
  );
}

export default Header;
