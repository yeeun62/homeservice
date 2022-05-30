import styled from "styled-components";

const IntroduceWrap = styled.div`
  height: 88px;
  padding: 24px 17px;
  background-color: #0740e4;
  white-space: pre-line;
  color: #fff;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  // font-family: "Noto Sans KR";
  text-align: center;
  letter-spacing: -0.02em;

  /* pc */
  @media screen and (min-width: 750px) {
    font-size: 15px;
    line-height: 22px;
  }

  /* mobile */
  @media screen and (max-width: 380px) {
    line-height: 14px;
  }
`;

function Introduce({ introduceMSG }: { introduceMSG: string }) {
  return <IntroduceWrap>{introduceMSG}</IntroduceWrap>;
}

export default Introduce;
