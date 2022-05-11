import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "../styles/recycle";

const NextBtnWrap = styled.div`
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
    <NextBtnWrap>
      <Link to={path}>
        <Button>{btnContent}</Button>
      </Link>
    </NextBtnWrap>
  );
}

export default NextBtn;
