import styled from "styled-components";
import { RegistMainBtn } from "../../styles/recycle";

const StepBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 100%;
  height: 52px;
`;

interface StepBtnProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  activat: boolean;
  choice: number;
  registIndex: number;
  setRegistIndex: React.Dispatch<React.SetStateAction<number>>;
}

function StepBtn({
  step,
  setStep,
  activat,
  choice,
  registIndex,
  setRegistIndex,
}: StepBtnProps) {
  const prevMove = () => {
    if (registIndex === 0) {
      setRegistIndex(0);
      setStep(1);
    } else if (registIndex === 2 || registIndex === 3 || registIndex === 4) {
      setRegistIndex(1);
      setStep(2);
    } else if (registIndex === 5) {
      setRegistIndex(choice + 2);
      setStep(3);
    } else {
      setRegistIndex(registIndex - 1);
      setStep(step - 1);
    }
  };

  const nextMove = () => {
    if (choice !== -1) {
      setStep(3);
      if (choice === 0) {
        setRegistIndex(2);
      } else if (choice === 1) {
        setRegistIndex(3);
      } else if (choice === 2) {
        setRegistIndex(4);
      }
    } else if (registIndex === 2 || registIndex === 3 || registIndex === 4) {
      setRegistIndex(5);
      setStep(4);
    } else {
      setRegistIndex(registIndex + 1);
      setStep(step + 1);
    }
  };

  return (
    <StepBtnWrap>
      <RegistMainBtn
        backgrondColor=" rgba(7, 64, 228, 0.03)"
        color="#0740E4"
        border="1px solid rgba(7, 64, 228, 0.1)"
        activat={true}
        onClick={prevMove}
        style={{ marginRight: "8px" }}
      >
        이전
      </RegistMainBtn>
      <RegistMainBtn
        backgrondColor="#0740E4"
        color="#fff"
        border="none"
        activat={activat}
        onClick={nextMove}
      >
        다음
      </RegistMainBtn>
    </StepBtnWrap>
  );
}

export default StepBtn;
