import { useEffect, useState } from "react";
import styled from "styled-components";
import { MainBtn, Footer } from "../../styles/recycle";
import ConditionModal from "../../modal/ConditionModal";
import Modal from "react-modal";
import "../../modal/modal.css";
import { StorageType } from "../../App";

const StepBtnWrap = styled(Footer)`
  div {
    display: flex;
    justify-content: space-between;
  }
`;

interface StepBtnProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  activate: boolean;
  registIndex: number;
  setRegistIndex: React.Dispatch<React.SetStateAction<number>>;
  storageData: StorageType;
}

function StepBtn({
  step,
  setStep,
  activate,
  registIndex,
  setRegistIndex,
  storageData,
}: StepBtnProps) {
  const [conditionModal, setConditionModal] = useState<boolean>(false);

  useEffect(() => {}, []);

  const prevMove = () => {
    if (registIndex === 0) {
      window.location.href = "http://localhost:3000";
      setStep(1);
    } else if (registIndex === 2 || registIndex === 3 || registIndex === 4) {
      setRegistIndex(1);
      setStep(2);
    } else {
      setRegistIndex(registIndex - 1);
      setStep(step - 1);
    }
  };

  const nextMove = () => {
    // if (!activate) {
    //   return;
    // }
    if (step === 4 && registIndex === 5) {
      return;
    }
    if (registIndex === 2 || registIndex === 3 || registIndex === 4) {
      setRegistIndex(5);
      setStep(4);
    } else if (registIndex >= 5) {
      setRegistIndex(5);
    } else if (registIndex <= 1) {
      setRegistIndex(registIndex + 1);
      setStep(step + 1);
    }

    localStorage.setItem("test", JSON.stringify(storageData));
  };

  const conditionModalHandler = () => {
    if (registIndex === 5) {
      setConditionModal(true);
    }
  };

  return (
    <>
      <Modal
        isOpen={conditionModal}
        onRequestClose={() => setConditionModal(!conditionModal)}
        overlayClassName="overlay"
        className="bottom_modal"
        ariaHideApp={false}
      >
        <ConditionModal
          setConditionModal={setConditionModal}
          setRegistIndex={setRegistIndex}
          setStep={setStep}
        />
      </Modal>
      <StepBtnWrap>
        <div>
          <MainBtn
            backgrondColor=" rgba(7, 64, 228, 0.03)"
            color="#0740E4"
            border="1px solid rgba(7, 64, 228, 0.1)"
            activate={true}
            onClick={prevMove}
            style={{ marginRight: "8px" }}
          >
            이전
          </MainBtn>
          <MainBtn
            backgrondColor="#0740E4"
            color="#fff"
            border="none"
            activate={activate}
            onClick={() => {
              nextMove();
              conditionModalHandler();
            }}
          >
            {registIndex === 5 ? "약관동의" : "다음"}
          </MainBtn>
        </div>
      </StepBtnWrap>
    </>
  );
}

export default StepBtn;
