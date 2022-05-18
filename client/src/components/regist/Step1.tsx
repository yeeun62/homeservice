import { RegistTitle, RegistSubBtn, RegistForm } from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

function Step1({ setActivate, setStorageData, storageData }: ActiveProps) {
  const step1 = storageData.step1;
  const [auth, setAuth] = useState<boolean>(false);
  const [authMessage, setAuthMessage] = useState<boolean>(true);
  const [salt, setSalt] = useState<any>("");
  const [minutes, setMinutes] = useState<any>(2);
  const [seconds, setSeconds] = useState<any>(59);
  const [validation, setValidation] = useState<{ mobileAuth: string }>({
    mobileAuth: "",
  });

  useEffect(() => {
    if (
      step1.name &&
      step1.mobile.length === 11 &&
      validation.mobileAuth === "success"
    ) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [validation, storageData]);

  useEffect(() => {
    if (auth) {
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
  }, [minutes, seconds, auth]);

  useEffect(() => {
    if (validation.mobileAuth.length === 6) {
      let bytes = CryptoJS.AES.decrypt(
        salt,
        `${process.env.REACT_APP_SECRET_KEY}`
      );
      if (bytes.toString(CryptoJS.enc.Utf8) === validation.mobileAuth) {
        setValidation({ mobileAuth: "success" });
        setAuthMessage(true);
      } else {
        setAuthMessage(false);
      }
    }
  }, [validation]);

  const authHandler = () => {
    if (step1.mobile.length === 11) {
      let authNumber = String(Math.random()).slice(2, 8);
      console.log(authNumber);
      // authNumber 인증번호를 포함한 문자 발송 로직 구현

      let crypto = CryptoJS.AES.encrypt(
        authNumber,
        `${process.env.REACT_APP_SECRET_KEY}`
      ).toString();
      setSalt(crypto);

      setAuth(true);
    } else {
      return;
    }
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
                value={storageData.step1.mobile}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length <= 11) {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    setStorageData({
                      ...storageData,
                      step1: { ...step1, mobile: e.target.value },
                    });
                  }
                }}
              />
            </div>
            <RegistSubBtn
              onClick={authHandler}
              backgrondColor={`${
                step1.mobile.length < 11 ? "#C2C2C2" : "#0740E4"
              }`}
            >
              인증번호 전송
            </RegistSubBtn>
          </div>
          <div style={{ position: "relative", marginTop: "12px" }}>
            <div className="input_div">
              <input
                className="input_margin_top"
                type="text"
                placeholder="인증번호를 입력해주세요"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValidation({ ...validation, mobileAuth: e.target.value })
                }
              />
            </div>
            {auth && (
              <p className="valid_time">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            )}
          </div>
          {!authMessage && (
            <p className="certi_warning">인증번호가 일치하지 않습니다.</p>
          )}
        </label>
      </RegistForm>
    </>
  );
}

export default Step1;
