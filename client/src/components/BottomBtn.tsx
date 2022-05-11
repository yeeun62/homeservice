import styled from "styled-components";
import { Link } from "react-router-dom";
import { MainBtn } from "../styles/recycle";

const BottomBtnWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #fff;

  button {
    position: absolute;
    bottom: 16px;
  }

  @media screen and (max-width: 749px) {
    height: 100px;
  }

  @media screen and (min-width: 749px) {
    height: 140px;
  }
`;

function BottomBtn({ btnContent, path }: { btnContent: string; path: string }) {
  return (
    <BottomBtnWrapper>
      <Link to={path}>
        <MainBtn
          backgrondColor="#0740E4"
          color="#fff"
          border="none"
          activat={true}
        >
          {btnContent}
        </MainBtn>
      </Link>
    </BottomBtnWrapper>
  );
}

export default BottomBtn;
