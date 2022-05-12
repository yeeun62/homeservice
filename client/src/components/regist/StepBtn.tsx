import { useState } from "react";
import styled from "styled-components";
import { MainBtn, Footer } from "../../styles/recycle";
import Conditions from "../../modal/Conditions";
import Modal from "react-modal";
import "../../modal/modal.css";

const StepBtnWrap = styled(Footer)`
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const PublicCheck = styled.div`
  width: 100%;
  position: absolute;
  height: 24px !important;
  background-color: #fff;
  top: -24px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #707070;
  }
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
  const [check, setCheck] = useState<boolean>(false);
  const [conditionModal, setConditionModal] = useState<boolean>(true);

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
    <>
      <StepBtnWrap>
        <div>
          {(registIndex === 2 || registIndex === 3) && (
            <PublicCheck>
              <div>
                <img
                  src={`./img/${
                    check ? "large_check_point.png" : "large_check.png"
                  }`}
                  alt="체크박스 이미지"
                  onClick={() => setCheck(!check)}
                />
                <p>공동 명의를 원해요</p>
              </div>
            </PublicCheck>
          )}
          <MainBtn
            backgrondColor=" rgba(7, 64, 228, 0.03)"
            color="#0740E4"
            border="1px solid rgba(7, 64, 228, 0.1)"
            activat={true}
            onClick={prevMove}
            style={{ marginRight: "8px" }}
          >
            이전
          </MainBtn>
          <MainBtn
            backgrondColor="#0740E4"
            color="#fff"
            border="none"
            activat={activat}
            onClick={nextMove}
          >
            다음
          </MainBtn>
        </div>
        <Modal
          isOpen={conditionModal}
          overlayClassName="overlay"
          className="condition_modal"
        >
          <Conditions setConditionModal={setConditionModal} />
        </Modal>
      </StepBtnWrap>
    </>
  );
}

export default StepBtn;
