import { RegistTitle, RegistSubBtn, RegistForm } from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";
import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

function Step1({ setActivate, setStorageData, storageData }: ActiveProps) {
  const step1 = storageData.step1;
  const [time, setTime] = useState<boolean>(false);
  const [timeStop, setTimeStop] = useState<boolean>(false);
  const [authMessage, setAuthMessage] = useState<boolean>(false);
  const [inputComplete, setInputComplete] = useState<boolean>(false);
  const [salt, setSalt] = useState<any>("");
  const [minutes, setMinutes] = useState<any>(3);
  const [seconds, setSeconds] = useState<any>(0);
  const [validation, setValidation] = useState<{ mobileAuth: string }>({
    mobileAuth: "",
  });

  useEffect(() => {
    if (step1.name && step1.mobile.length === 11) {
      setInputComplete(true);
    } else {
      setInputComplete(false);
    }
  }, [validation, storageData]);

  useEffect(() => {
    if (time && !timeStop) {
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
  }, [minutes, seconds, time, timeStop]);

  useEffect(() => {
    if (validation.mobileAuth.length === 6) {
      let bytes = CryptoJS.AES.decrypt(salt, `${process.env.REACT_APP_SALT}`);
      if (bytes.toString(CryptoJS.enc.Utf8) === validation.mobileAuth) {
        setActivate(true);
        setAuthMessage(false);
        setTimeStop(true);
      } else {
        setActivate(false);
        setAuthMessage(true);
        setTimeStop(false);
      }
    } else {
      setActivate(false);
      setTimeStop(false);
    }
  }, [validation]);

  const authHandler = () => {
    let authNumber = String(Math.random()).slice(2, 8);
    console.log(authNumber);
    // authNumber 인증번호를 포함한 문자 발송 로직 구현

    let crypto = CryptoJS.AES.encrypt(
      authNumber,
      `${process.env.REACT_APP_SALT}`
    ).toString();
    setSalt(crypto);
    setTime(true);
    setMinutes(3);
    setSeconds(0);
    setValidation({ mobileAuth: "" });
    setAuthMessage(false);
  };

  return (
    <>
      <RegistTitle>신청자 정보를 입력해 주세요</RegistTitle>
      <RegistForm onSubmit={(e) => e.preventDefault()}>
        <label>
          <p className="form_title">이름</p>
          <div className="input_div">
            <input
              type="text"
              value={step1.name}
              placeholder="실명을 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStorageData({
                  ...storageData,
                  step1: { ...step1, name: e.target.value },
                })
              }
            />
          </div>
        </label>
        <label>
          <p>휴대전화 번호</p>
          <div className="flex_form">
            <div className="input_div">
              <input
                type="text"
                placeholder="숫자만 입력해주세요"
                value={step1.mobile}
                maxLength={11}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setStorageData({
                    ...storageData,
                    step1: {
                      ...step1,
                      mobile: e.target.value.replace(/[^0-9]/g, ""),
                    },
                  });
                }}
              />
            </div>
            <RegistSubBtn
              onClick={() => inputComplete && authHandler()}
              backgrondColor={`${inputComplete ? "#0740E4" : "#C2C2C2"}`}
            >
              {time ? "인증번호 재전송" : "인증번호 전송"}
            </RegistSubBtn>
          </div>
          <div style={{ position: "relative", marginTop: "12px" }}>
            <div className="input_div">
              <input
                className="input_margin_top"
                type="text"
                maxLength={6}
                value={validation.mobileAuth}
                placeholder="인증번호를 입력해주세요"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValidation({ ...validation, mobileAuth: e.target.value })
                }
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
        </label>
      </RegistForm>
    </>
  );
}

export default Step1;
