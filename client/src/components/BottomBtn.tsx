import styled from "styled-components";
import { Link } from "react-router-dom";
import { MainBtn } from "../styles/recycle";

const BottomBtn = styled.div`
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #fff;

  button {
    position: absolute;
    bottom: 0;
  }

  @media screen and (max-width: 749px) {
    height: 100px;
  }

  @media screen and (min-width: 749px) {
    height: 140px;
  }
`;

function NextBtn({ btnContent, path }: { btnContent: string; path: string }) {
  return (
    <BottomBtn>
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
    </BottomBtn>
  );
}

export default NextBtn;
