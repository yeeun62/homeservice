import { RegistTitle, RegistSubBtn, RegistForm } from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";
import { useState, useEffect } from "react";

function Step1({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [validation, setValidation] = useState<{
    name: string;
    mobile: string;
    mobileAuth: string;
  }>({
    name: "",
    mobile: "",
    mobileAuth: "",
  });

  useEffect(() => {
    if (
      validation.name &&
      validation.mobile.length === 11 &&
      validation.mobileAuth === ""
    ) {
      setActivate(true);
      setStorageData((prevState) => ({
        ...prevState,
        step1: { name: validation.name, mobile: validation.mobile },
      }));
    } else {
      setActivate(false);
    }
  }, [validation]);

  useEffect(() => {
    if (storageData.step1.name !== "") {
      setValidation({
        ...validation,
        name: storageData.step1.name,
        mobile: storageData.step1.mobile,
      });
    }
  }, []);

  return (
    <>
      <RegistTitle>신청자 정보를 입력해 주세요</RegistTitle>
      <RegistForm>
        <label>
          <p className="form_title">이름</p>
          <div className="input_div">
            <input
              type="text"
              value={validation.name}
              placeholder="실명을 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValidation({ ...validation, name: e.target.value })
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
                value={validation.mobile}
                readOnly
                onKeyDown={(e: any) => {
                  if (
                    Number(e.key) >= 0 &&
                    Number(e.key) <= 9 &&
                    validation.mobile.length <= 10
                  ) {
                    setValidation({
                      ...validation,
                      mobile: validation.mobile + e.key,
                    });
                  } else if (e.key === "Backspace") {
                    setValidation({
                      ...validation,
                      mobile: validation.mobile.slice(0, -1),
                    });
                  }
                  return false;
                }}
              />
            </div>
            <RegistSubBtn
              backgrondColor={`${
                validation.mobile.length < 11 ? "#C2C2C2" : "#0740E4"
              }`}
            >
              인증번호 전송
            </RegistSubBtn>
          </div>
          <div style={{ position: "relative" }}>
            <div className="input_div">
              <input
                className="input_margin_top"
                type="text"
                placeholder="인증번호를 입력해주세요"
              />
            </div>
            <p className="valid_time">03:00</p>
          </div>
          <p className="certi_warning">인증번호가 일치하지 않습니다.</p>
        </label>
      </RegistForm>
    </>
  );
}

export default Step1;
