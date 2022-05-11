import styled from "styled-components";

const IntroduceWrap = styled.div`
  /* common */
  height: 88px;
  padding: 24px 17px;
  background-color: #0740e4;

  /* mobile */
  p {
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    font-family: "Noto Sans KR";
    text-align: center;
    letter-spacing: -0.02em;
  }

  /* pc */
  @media screen and (min-width: 750px) {
    p {
      font-size: 15px;
      line-height: 22px;
      max-width: 360px;
      margin: auto;
    }
  }
`;

function Introduce({ topDesc }: { topDesc: string }) {
  return (
    <IntroduceWrap>
      <p>{topDesc}</p>
    </IntroduceWrap>
  );
}

export default Introduce;
