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
  storageData: StorageType;
  localStep: string;
  setLocalStep: React.Dispatch<React.SetStateAction<string>>;
}

function StepBtn({
  step,
  setStep,
  localStep,
  setLocalStep,
  activate,
  storageData,
}: StepBtnProps) {
  const [conditionModal, setConditionModal] = useState<boolean>(false);

  useEffect(() => {
    if (localStep === "0") {
      setStep(1);
      localStorage.setItem("localStep", localStep);
    } else if (localStep === "1") {
      setStep(2);
      localStorage.setItem("localStep", localStep);
    } else if (localStep === "2" || localStep === "3" || localStep === "4") {
      setStep(3);
      localStorage.setItem("localStep", localStep);
    } else if (localStep === "5") {
      setStep(4);
      localStorage.setItem("localStep", localStep);
    }
  }, [localStep]);

  const prevMove = () => {
    if (localStep === "0") {
      window.location.href = window.location.origin;
      setLocalStep("0");
    } else if (localStep === "1") {
      setLocalStep("0");
    } else if (localStep === "2" || localStep === "3" || localStep === "4") {
      setLocalStep("1");
    } else if (localStep === "5") {
      setLocalStep(String(storageData.step2.index));
    }
  };

  const nextMove = () => {
    // if (!activate) {
    //   return;
    // }
    if (step === 4 && localStep === "5") {
      return;
    }
    if (localStep === "0") {
      setLocalStep("1");
    } else if (localStep === "1") {
      setLocalStep(String(storageData.step2.index));
      localStorage.setItem(storageData.sellNo, JSON.stringify(storageData));
      return;
    } else if (localStep === "2" || localStep === "3" || localStep === "4") {
      setLocalStep("5");
    }
    localStorage.setItem(storageData.sellNo, JSON.stringify(storageData));
  };

  const conditionModalHandler = () => {
    if (localStep === "5") {
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
          storageData={storageData}
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
            {localStep === "5" ? "약관동의" : "다음"}
          </MainBtn>
        </div>
      </StepBtnWrap>
    </>
  );
}

export default StepBtn;
