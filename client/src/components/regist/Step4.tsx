import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import "../../modal/modal.css";
import { RegistTitle, RegistForm } from "../../styles/recycle";
import BankModal from "../../modal/BankModal";
import { ActiveProps } from "../../pages/Page";
import axios from "axios";

function Step4({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [bankModal, setBankModal] = useState<boolean>(false);
  const [bankList, setBankList] = useState<any>();
  const step4 = storageData.step4;
  const scroll: any = useRef(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/banks`
      )
      .then((res) => {
        if (res.status === 200) {
          setBankList(res.data.result);
        } else {
          alert("서버오류입니다. 관리자에 문의하세요.");
        }
      });
  }, []);

  useEffect(() => {
    if (
      step4.bank.name &&
      step4.refund_accout_number.length >= 11 &&
      step4.refund_accout_name
    ) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [step4]);

  function focusAccount() {
    if (/Android/i.test(window.navigator.userAgent)) {
      scroll.current.style.height = "100vh";
      scroll.current.scrollIntoView(true);
    } else return;
  }

  function nextInput(e: any) {
    if (e.key === "Enter") {
      let input = document.getElementsByName(
        (Number(e.target.attributes[0].value) + 1).toString()
      );
      if (input.length) {
        input[0].focus();
      }
    }
  }

  return (
    <div ref={scroll}>
      <Modal
        isOpen={bankModal}
        onRequestClose={() => setBankModal(!bankModal)}
        overlayClassName="overlay"
        className="bottom_modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <BankModal
          setBankModal={setBankModal}
          setStorageData={setStorageData}
          bankList={bankList}
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
      <RegistForm onKeyDown={nextInput}>
        <label>
          <p>은행</p>
          <div className="input_div">
            <input
              name="1"
              type="text"
              placeholder="은행을 선택해주세요"
              readOnly
              value={step4.bank.name}
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
              name="2"
              type="text"
              placeholder="실명을 입력해주세요"
              value={step4.refund_accout_name}
              onChange={(e) =>
                setStorageData({
                  ...storageData,
                  step4: { ...step4, refund_accout_name: e.target.value },
                })
              }
            />
          </div>
        </label>
        <label>
          <p>계좌번호</p>
          <div className="input_div">
            <input
              name="3"
              placeholder="숫자만 입력해주세요"
              type="tel"
              pattern="\d*"
              value={step4.refund_accout_number}
              onClick={focusAccount}
              onFocus={focusAccount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length <= 14) {
                  setStorageData({
                    ...storageData,
                    step4: {
                      ...step4,
                      refund_accout_number: e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      ),
                    },
                  });
                }
              }}
            />
          </div>
        </label>
      </RegistForm>
    </div>
  );
}

export default Step4;
