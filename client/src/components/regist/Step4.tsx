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
    let changeData: any = localStorage.getItem("sell");
    setStorageData(JSON.parse(changeData));
  }, []);

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
          // console.log("bankList error");
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

  function focus_account() {
    if (window.screen.width >= 750) {
      scroll.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    } else return;
  }

  return (
    <div id="step4" ref={scroll}>
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
      <RegistForm>
        <label>
          <p>은행</p>
          <div className="input_div">
            <input
              tabIndex={1}
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
              tabIndex={2}
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
              tabIndex={3}
              placeholder="숫자만 입력해주세요"
              type="tel"
              pattern="\d*"
              value={step4.refund_accout_number}
              onFocus={focus_account}
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
