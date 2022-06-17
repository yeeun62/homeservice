import { RegistTitle, RegistSubBtn, RegistForm } from "../../styles/recycle";
import { ActiveProps } from "../../pages/Page";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import CloseModal from "../../modal/CloseModal";
import CryptoJS from "crypto-js";
import axios from "axios";

function Step1({
  setActivate,
  setStorageData,
  storageData,
  phoneAuth,
  nextInput,
}: ActiveProps) {
  const step1 = storageData.step1;
  const [time, setTime] = useState<boolean>(false);
  const [authMessage, setAuthMessage] = useState<boolean>(false);
  const [authMessage2, setAuthMessage2] = useState<boolean>(false);
  const [authMessage3, setAuthMessage3] = useState<boolean>(false);
  const [authMessage4, setAuthMessage4] = useState<boolean>(false);
  const [inputComplete, setInputComplete] = useState<boolean>(false);
  const [salt, setSalt] = useState<any>("");
  const [minutes, setMinutes] = useState<any>(3);
  const [seconds, setSeconds] = useState<any>(0);
  const [resendCount, setResendCount] = useState(true);
  const [validation, setValidation] = useState<string>("");
  const [closeModal, setCloseModal] = useState(false);
  const [modalTxt, setModalTxt] =
    useState<string>("인증번호가 발급되었습니다.");
  const [phone, setPhone] = useState<string>("");
  const scroll: any = useRef(null);

  useEffect(() => {
    if (phoneAuth) {
      setPhone(step1.customer_hphone);
    }
  }, []);

  useEffect(() => {
    if (time) {
      setActivate(false);
      setSalt("");
      setAuthMessage4(true);
    }
  }, [storageData.step1.customer_hphone]);

  useEffect(() => {
    if (phone) {
      if (phone === step1.customer_hphone) {
        setActivate(true);
      } else {
        setActivate(false);
      }
    } else {
      setActivate(false);
    }
  }, [phone]);

  useEffect(() => {
    if (step1.customer_name) {
      if (
        (!phoneAuth && step1.customer_hphone.length === 11) ||
        (phoneAuth && phone.length === 11)
      ) {
        setInputComplete(true);
      } else {
        setInputComplete(false);
      }
    } else {
      setInputComplete(false);
    }
  }, [validation, step1, phone]);

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
    if (resendCount || (minutes === 2 && seconds <= 54) || minutes < 2) {
      setResendCount(false);
      setModalTxt("인증번호가 발급되었습니다.");
      setCloseModal(true);
      setAuthMessage4(false);
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
      setAuthMessage3(false);
    } else {
      setAuthMessage(false);
      setAuthMessage3(true);
    }
  };

  function focusAccount() {
    if (/Android/i.test(window.navigator.userAgent)) {
      scroll.current.style.height = "calc(100vh - 56px)";
      scroll.current.scrollIntoView(true);
    } else return;
  }

  return (
    <>
      <Modal
        isOpen={closeModal}
        onRequestClose={() => setCloseModal(!closeModal)}
        overlayClassName="overlay"
        className="close_modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <CloseModal setCloseModal={setCloseModal} mainTxt={modalTxt} />
      </Modal>
      <div ref={scroll}>
        <RegistTitle>신청자 정보를 입력해 주세요</RegistTitle>
        <RegistForm
          onSubmit={(e) => e.preventDefault()}
          stepOne={true}
          onKeyDown={(e) => nextInput(e, "step1-")}
        >
          <label>
            <p>이름</p>
            <div className="input_div">
              <input
                name="step1-1"
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
                  name="step1-2"
                  placeholder="숫자만 입력해주세요"
                  type="tel"
                  pattern="\d*"
                  value={!phoneAuth ? step1.customer_hphone : phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length <= 11) {
                      if (phoneAuth) {
                        setPhone(e.target.value.replace(/[^0-9]/g, ""));
                      } else {
                        setStorageData({
                          ...storageData,
                          step1: {
                            ...step1,
                            customer_hphone: e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ),
                          },
                        });
                      }
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
                  name="step1-3"
                  className="input_margin_top"
                  type="tel"
                  pattern="\d*"
                  maxLength={6}
                  placeholder="인증번호를 입력해주세요"
                  value={validation}
                  onClick={focusAccount}
                  onFocus={focusAccount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAuthMessage3(false);
                    if (!time) {
                      setAuthMessage2(true);
                      return;
                    } else {
                      setValidation(e.target.value.replace(/[^0-9]/g, ""));
                    }
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
            {authMessage && !authMessage4 && (
              <p className="certi_warning">인증번호가 일치하지 않습니다.</p>
            )}
            {authMessage2 && (
              <p className="certi_warning">인증번호 전송을 눌러주세요.</p>
            )}
            {authMessage3 && (
              <p className="certi_warning">
                재전송은 5초가 지난 후에 가능합니다.
              </p>
            )}
            {authMessage4 && (
              <p className="certi_warning">
                휴대전화 번호가 수정되어 다시 인증해주세요.
              </p>
            )}
          </label>
        </RegistForm>
      </div>
    </>
  );
}

export default Step1;
