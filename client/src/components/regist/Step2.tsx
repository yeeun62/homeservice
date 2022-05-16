import { useEffect } from "react";
import styled, { css } from "styled-components";
import { RegistTitle } from "../../styles/recycle";

const RegistTypeBtn = styled.button<{ choice: boolean }>`
  @media screen and (min-width: 750px) {
    height: 57px;
    font-weight: 700;
    font-size: 17px;
  }

  width: 100%;
  height: 54px;
  border-radius: 5px;
  text-align: left;
  padding-left: 16px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 16px;
  background-color: #fff;
  color: #707070;
  border: 1px solid #ededed;

  ${(props) =>
    props.choice &&
    css`
      background-color: rgba(7, 64, 228, 0.03);
      color: #0740e4;
      border: 1px solid rgba(7, 64, 228, 0.1);
    `}

  &:hover {
    border: ${(props) =>
      props.choice ? "1px solid rgba(7, 64, 228, 0.3)" : "1px solid #c2c2c2"};
  }
`;

interface Step2Props {
  setActivat: React.Dispatch<React.SetStateAction<boolean>>;
  choice: number;
  setChoice: React.Dispatch<React.SetStateAction<number>>;
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
}

function Step2({ setActivat, choice, setChoice, setActivate }: Step2Props) {
  const registType = ["개인", "개인사업자", "법인사업자"];

  useEffect(() => {
    if (choice !== -1) {
      setActivat(true);
    }
  }, [choice]);

  return (
    <>
      <RegistTitle>명의자 유형을 선택해 주세요</RegistTitle>
      {registType.map((type: string, index: number) => (
        <RegistTypeBtn
          key={type}
          choice={choice === index && true}
          onClick={() => setChoice(index)}
        >
          {type}
        </RegistTypeBtn>
      ))}
    </>
  );
}

export default Step2;
