import { useEffect, useState } from "react";
import { MainBtn, Footer } from "../../styles/recycle";
import ConditionModal from "../../modal/ConditionModal";
import Modal from "react-modal";
import "../../modal/modal.css";
import { StorageType } from "../../App";

interface StepBtnProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  activate: boolean;
  storageData: StorageType;
  localStep: number;
  setLocalStep: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function StepBtn({
  step,
  setStep,
  localStep,
  setLocalStep,
  activate,
  storageData,
  setPage,
}: StepBtnProps) {
  const [conditionModal, setConditionModal] = useState<boolean>(false);

  useEffect(() => {
    if (localStep === 0) {
      setStep(1);
    } else if (localStep === 1) {
      setStep(2);
    } else if (localStep === 2 || localStep === 3 || localStep === 4) {
      setStep(3);
    } else if (localStep === 5) {
      setStep(4);
    }
  }, [localStep]);

  const prevMove = () => {
    if (localStep === 0) {
      setPage(0);
      setLocalStep(0);
    } else if (localStep === 1) {
      setLocalStep(0);
    } else if (localStep === 2 || localStep === 3 || localStep === 4) {
      setLocalStep(1);
    } else if (localStep === 5) {
      setLocalStep(storageData.step2.index);
    }
  };

  const nextMove = () => {
    if (!activate) {
      return;
    }
    // step4 있을 때
    // if (step === 4 && localStep === 5) {
    //     return setConditionModal(true);
    // }
    // step4 없을 때
    if (localStep > 1 && step === 3) {
      return setConditionModal(true);
    }
    if (localStep === 0) {
      setLocalStep(1);
    } else if (localStep === 1) {
      setLocalStep(storageData.step2.index);
      return;
    }
    // step4 있을 때
    // else if (localStep === 2 || localStep === 3 || localStep === 4) {
    //     setLocalStep(5);
    // }
  };

  return (
    <>
      <Modal
        isOpen={conditionModal}
        onRequestClose={() => setConditionModal(!conditionModal)}
        overlayClassName="overlay"
        className="bottom_modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <ConditionModal
          setConditionModal={setConditionModal}
          storageData={storageData}
          setPage={setPage}
        />
      </Modal>
      <Footer>
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
            onClick={nextMove}
          >
            {/* {localStep === 4 ? "약관동의" : "다음"} step4 있을 때  */}
            {/* // step4 없을 때 */}
            {localStep > 1 ? "약관동의" : "다음"}
          </MainBtn>
        </div>
      </Footer>
    </>
  );
}

export default StepBtn;
