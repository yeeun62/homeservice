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
  setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
}

function StepBtn({
  step,
  setStep,
  activate,
  storageData,
  setStorageData,
}: StepBtnProps) {
  const [conditionModal, setConditionModal] = useState<boolean>(false);

  useEffect(() => {
    if (storageData.step === 0) {
      setStep(1);
    } else if (storageData.step === 1) {
      setStep(2);
    } else if (
      storageData.step === 2 ||
      storageData.step === 3 ||
      storageData.step === 4
    ) {
      setStep(3);
    } else if (storageData.step === 5) {
      setStep(4);
    }
  }, [storageData.step]);

  const prevMove = () => {
    if (storageData.step === 0) {
      window.location.href = window.location.origin;
      setStorageData({ ...storageData, step: 0 });
    } else if (storageData.step === 1) {
      setStorageData({ ...storageData, step: 0 });
    } else if (
      storageData.step === 2 ||
      storageData.step === 3 ||
      storageData.step === 4
    ) {
      setStorageData({ ...storageData, step: 1 });
    } else if (storageData.step === 5) {
      setStorageData({ ...storageData, step: storageData.step2.index });
    }
  };

  const nextMove = () => {
    // if (!activate) {
    //   return;
    // }
    if (step === 4 && storageData.step === 5) {
      return;
    }
    if (storageData.step === 0) {
      setStorageData({ ...storageData, step: 1 });
    } else if (storageData.step === 1) {
      setStorageData({ ...storageData, step: storageData.step2.index });
    } else if (
      storageData.step === 2 ||
      storageData.step === 3 ||
      storageData.step === 4
    ) {
      setStorageData({ ...storageData, step: 5 });
    }
  };

  const conditionModalHandler = () => {
    if (storageData.step === 5) {
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
            {storageData.step === 5 ? "약관동의" : "다음"}
          </MainBtn>
        </div>
      </StepBtnWrap>
    </>
  );
}

export default StepBtn;
