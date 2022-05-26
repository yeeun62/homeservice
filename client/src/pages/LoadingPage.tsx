import styled from "styled-components";

const LodingWrap = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      width: 80px;
      height: 80px;
      animation: rotation 6s linear infinite;
      transform-origin: 50% 50%;
    }

    p {
      color: #0740e4;
      font-size: 20px;
      font-weight: 700;
      margin-top: 10px;
    }
  }

  @keyframes rotation {
    100% {
      transform: rotate(45deg);
    }
  }
`;

function LoadingPage() {
  return (
    <LodingWrap>
      <div>
        <img src="./img/logo.png" alt="차란차 로고" />
        <p>Loading...</p>
      </div>
    </LodingWrap>
  );
}

export default LoadingPage;
