import styled from "styled-components";

export const Button = styled.button`
  background-color: #0740e4;
  color: #fff;
  border: none;
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-weight: 700;
  width: 100%;
  height: 52px;
  border-radius: 5px;
`;

export const stickTop = styled.div`
  @media screen and (max-width: 749px) {
    position: sticky;
    top: 0;
  }

  display: flex;
  height: 56px;
  align-items: center;
  background-color: #fff;
`;

export const Padding = styled.div`
  /* mobile */
  @media screen and (max-width: 749px) {
    padding: 0 16px 16px 16px;
  }

  /* pc */
  @media screen and (min-width: 750px) {
    padding: 0 32px;
  }
`;
