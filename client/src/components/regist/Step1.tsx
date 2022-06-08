import { RegistTitle, RegistSubBtn, RegistForm } from "../../styles/recycle";
import { ActiveProps } from "../../pages/Page";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import CloseModal from "../../modal/CloseModal";
import CryptoJS from "crypto-js";
import axios from "axios";

function Step1({
  setActivate,
  setStorageData,
  storageData,
  data,
}: ActiveProps) {
  const step1 = storageData.step1;
  const [time, setTime] = useState<boolean>(false);
  const [authMessage, setAuthMessage] = useState<boolean>(false);
  const [authMessage2, setAuthMessage2] = useState<boolean>(false);
  const [inputComplete, setInputComplete] = useState<boolean>(false);
  const [salt, setSalt] = useState<any>("");
  const [minutes, setMinutes] = useState<any>(3);
  const [seconds, setSeconds] = useState<any>(0);
  const [localData, setLocalData] = useState<any>();
  const [validation, setValidation] = useState<string>("");
  const [closeModal, setCloseModal] = useState(false);
  const [modalTxt, setModalTxt] =
    useState<string>("인증번호가 발급되었습니다.");

  useEffect(() => {
    let changeData: any = localStorage.getItem("sell");
    setStorageData(JSON.parse(changeData));
  }, []);

  // localstorage 데이터 state에 저장
  useEffect(() => {
    let originData: any = localStorage.getItem("sell");
    if (originData) {
      setLocalData(JSON.parse(originData));
    }
  }, []);

  // localstorage 모바일이 11자라면 다음버튼 활성화
  useEffect(() => {
    if (localData && localData.step1.customer_hphone.length === 11) {
      setActivate(true);
    }
  }, [localData]);

  // 모바일 인풋이 변경될때마다 스토리지의모바일 데이터와 다르다면 다음버튼 비활성화
  useEffect(() => {
    if (localData) {
      if (
        localData.step1.customer_hphone !== storageData.step1.customer_hphone
      ) {
        setActivate(false);
      } else if (
        localData.step1.customer_hphone.length &&
        localData.step1.customer_hphone === storageData.step1.customer_hphone
      ) {
        setActivate(true);
      }
    }
  }, [step1, localData]);

  // 이름과 모바일이 채워져있다면 인증번호 전송 활성화
  useEffect(() => {
    if (step1.customer_name && step1.customer_hphone.length === 11) {
      setInputComplete(true);
    } else {
      setInputComplete(false);
    }
  }, [validation, step1]);

  // 시간초 함수
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setActivate(false);
      setModalTxt("입력 시간이 지났습니다.");
      setTime(false); // 시간초 끝나도 보이게 해야한다면 삭제
      setCloseModal(true);
      setValidation("");
      setAuthMessage(false);
      setAuthMessage2(false);
    }
    if (time) {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [minutes, seconds, time]);

  // 인증번호 인풋이 변경될때마다 인증번호가 일치하는지 검사
  useEffect(() => {
    if (validation.length === 6 && seconds > 0) {
      // let bytes = CryptoJS.AES.decrypt(salt, `${process.env.REACT_APP_SALT}`);
      // if (bytes.toString(CryptoJS.enc.Utf8) === validation) {
      //   setActivate(true);
      //   setAuthMessage(false);
      // } else {
      //   setActivate(false);
      //   setAuthMessage(true);
      // }
      if (validation === salt) {
        setActivate(true);
        setAuthMessage(false);
      } else {
        setActivate(false);
        setAuthMessage(true);
      }
    } else {
      setActivate(false);
      setAuthMessage(false);
    }
  }, [validation]);

  const authHandler = () => {
    setModalTxt("인증번호가 발급되었습니다.");
    setCloseModal(true);
    let authNumber = String(Math.random()).slice(2, 8);
    let crypto = CryptoJS.AES.encrypt(
      authNumber,
      `${process.env.REACT_APP_SALT}`
    ).toString();

    axios
      .post(
        `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/ppurio/sendmessage`,
        {
          phone: step1.customer_hphone,
          security: authNumber, // 암호화시 crypto로 변경
        }
      )
      .then((result) => {});
    // setSalt(crypto);
    setSalt(authNumber);
    setTime(true);
    setMinutes(3);
    setSeconds(0);
    setValidation("");
    setAuthMessage(false);
    setAuthMessage2(false);
  };

  return (
    <>
      <Modal
        isOpen={closeModal}
        onRequestClose={() => setCloseModal(!closeModal)}
        overlayClassName="overlay"
        className="close_modal"
        ariaHideApp={false}
      >
        <CloseModal
          setCloseModal={setCloseModal}
          data={data}
          mainTxt={modalTxt}
        />
      </Modal>
      <RegistTitle>신청자 정보를 입력해 주세요</RegistTitle>
      <RegistForm onSubmit={(e) => e.preventDefault()} stepOne={true}>
        <label>
          <p>이름</p>
          <div className="input_div">
            <input
              tabIndex={1}
              type="text"
              value={step1.customer_name}
              placeholder="실명을 입력해주세요"
              className="name_input"
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStorageData({
                  ...storageData,
                  step1: { ...step1, customer_name: e.target.value },
                });
              }}
            />
          </div>
        </label>
        <label>
          <p>휴대전화 번호</p>
          <div className="flex_form">
            <div className="input_div">
              <input
                tabIndex={2}
                placeholder="숫자만 입력해주세요"
                type="tel"
                pattern="\d*"
                value={step1.customer_hphone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length <= 11) {
                    setStorageData({
                      ...storageData,
                      step1: {
                        ...step1,
                        customer_hphone: e.target.value.replace(/[^0-9]/g, ""),
                      },
                    });
                  }
                }}
              />
            </div>
            <RegistSubBtn
              onClick={() => inputComplete && authHandler()}
              backgrondColor={`${inputComplete ? "#0740E4" : "#C2C2C2"}`}
              step1={true}
            >
              {time ? "인증번호 재전송" : "인증번호 전송"}
            </RegistSubBtn>
          </div>
          <div style={{ position: "relative", marginTop: "12px" }}>
            <div className="input_div">
              <input
                tabIndex={3}
                className="input_margin_top"
                type="tel"
                pattern="\d*"
                maxLength={6}
                placeholder="인증번호를 입력해주세요"
                value={validation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!time) {
                    setAuthMessage2(true);
                    return;
                  } else {
                    setValidation(e.target.value.replace(/[^0-9]/g, ""));
                  }
                  // else if (seconds === 0 && minutes === 0) {
                  //   setAuthMessage2(true);
                  // }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
              />
            </div>
            {time && (
              <p className="valid_time">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            )}
          </div>
          {authMessage && (
            <p className="certi_warning">인증번호가 일치하지 않습니다.</p>
          )}
          {authMessage2 && (
            <p className="certi_warning">인증번호 전송을 눌러주세요.</p>
          )}
        </label>
      </RegistForm>
    </>
  );
}

export default Step1;
