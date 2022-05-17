import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../modal/modal.css";
import { RegistTitle, RegistForm } from "../../styles/recycle";
import BankModal from "../../modal/BankModal";
import { ActiveProps } from "../../pages/RegistPage";

function Step4({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [bankModal, setBankModal] = useState<boolean>(false);
  const step4 = storageData.step4;

  useEffect(() => {
    let isActivate = Object.values(step4).filter((data: any) => {
      if (data.length > 0) return data;
    });
    if (isActivate.length > 2) {
      setActivate(true);
    }
  }, []);

  function validationHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    if (key === "account") {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }
    setStorageData({
      ...storageData,
      step4: { ...step4, [key]: e.target.value },
    });
  }

  return (
    <>
      <Modal
        isOpen={bankModal}
        onRequestClose={() => setBankModal(!bankModal)}
        overlayClassName="overlay"
        className="bottom_modal"
        ariaHideApp={false}
      >
        <BankModal
          setBankModal={setBankModal}
          setStorageData={setStorageData}
        />
      </Modal>
      <RegistTitle style={{ marginBottom: "6px" }}>
        환불 계좌 정보를 입력해주세요
      </RegistTitle>
      <div style={{ marginBottom: "32px" }}>
        <p className="gray_text">
          차액 이전비 또는 차량대금 환불받을 때 필요한 정보입니다.
        </p>
        <p className="gray_text">정확히 확인 후 입력 부탁드립니다.(선택)</p>
      </div>
      <RegistForm>
        <label>
          <p>은행</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="은행을 선택해주세요"
              readOnly
              value={step4.bank}
              onClick={() => setBankModal(true)}
            />
            <img
              src="./img/w_icon_down_large.svg"
              alt="올라가는 화살표"
              className="union_down"
            />
          </div>
        </label>
        <label>
          <p>예금주</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="실명을 입력해주세요"
              value={step4.name}
              onChange={(e) => {
                validationHandler(e, "name");
              }}
            />
          </div>
        </label>
        <label>
          <p>계좌번호</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="숫자만 입력해주세요"
              value={step4.account}
              onChange={(e) => {
                validationHandler(e, "account");
              }}
            />
          </div>
        </label>
      </RegistForm>
    </>
  );
}

export default Step4;
