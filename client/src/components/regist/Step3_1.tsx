import { useState, useEffect } from "react";
import {
  RegistTitle,
  RegistForm,
  RegistSubBtn,
  PublicCheck,
  Tooltip,
} from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";

function Step3_1({ setActivate, setStorageData, storageData }: ActiveProps) {
  const step3 = storageData.step3;
  const [check, setCheck] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (storageData.step3 === "") {
      setStorageData({
        ...storageData,
        step3: { name: "", moble: "", postCode: "" },
      });
    }
    // 조건은 다시 하기
    if (step3.name && step3.mobile && step3.postCode) {
      setActivate(true);
    }
  }, []);

  function validationHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    setStorageData({
      ...storageData,
      step3: { ...step3, [key]: e.target.value },
    });
  }

  function equalRegister(b: boolean) {
    if (b) {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          name: storageData.step1.name,
          mobile: storageData.step1.mobile,
        },
      });
    } else {
      setStorageData({
        ...storageData,
        step3: { ...step3, name: "", mobile: "" },
      });
    }
  }

  return (
    <>
      <RegistTitle>명의자 정보를 입력해 주세요</RegistTitle>
      <RegistForm>
        <label>
          <div className="flex_check">
            <p>이름</p>
            <div
              onClick={() => {
                setCheck(!check);
                equalRegister(!check);
              }}
            >
              <img
                src={`./img/${
                  check
                    ? "icon_checkbox_large_blue.svg"
                    : "icon_checkbox_large_gray.svg"
                }`}
                alt="체크박스"
              />
              <p>신청자와 동일</p>
            </div>
          </div>
          <div className="input_div">
            <input
              type="text"
              placeholder="실명을 입력해주세요"
              value={storageData.step3.name}
              onChange={(e) => {
                validationHandler(e, "name");
                setCheck(false);
              }}
            />
          </div>
        </label>
        <label>
          <p>휴대전화 번호</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="숫자만 입력해주세요"
              value={step3.mobile}
              readOnly
              onKeyDown={(e: any) => {
                setCheck(false);
                if (
                  Number(e.key) >= 0 &&
                  Number(e.key) <= 9 &&
                  step3.mobile.length <= 10
                ) {
                  setStorageData({
                    ...storageData,
                    step3: {
                      ...step3,
                      mobile: step3.mobile + e.key,
                    },
                  });
                } else if (e.key === "Backspace") {
                  setStorageData({
                    ...storageData,
                    step3: {
                      ...step3,
                      mobile: step3.mobile.slice(0, -1),
                    },
                  });
                }
                return false;
              }}
            />
          </div>
        </label>
        <label style={{ position: "relative" }}>
          <p>
            주민등록주소지
            <img
              src="/img/w_icon_question_medium_gray.svg"
              alt="물음표 이모티콘"
              style={{ cursor: "pointer" }}
              onClick={() => setTooltip(!tooltip)}
            />
          </p>
          {tooltip && (
            <Tooltip
              style={{
                position: "absolute",
                zIndex: "100",
                left: "-9px",
                top: "26px",
              }}
            >
              <div></div>명의자의 등본상 주소지를 입력해 주세요.
            </Tooltip>
          )}
          <div className="flex_form">
            <div className="input_div">
              <input
                type="text"
                placeholder="주소를 검색해주세요"
                readOnly
                value={step3.address}
              />
            </div>
            <RegistSubBtn backgrondColor="#0740E4">주소 검색</RegistSubBtn>
          </div>
          <div style={{ position: "relative" }}>
            <div className="input_div">
              <input
                className="input_margin_top"
                type="text"
                placeholder="상세주소를 입력해주세요"
                onChange={(e) => validationHandler(e, "detailAddress")}
              />
            </div>
          </div>
        </label>
        <PublicCheck>
          <div>
            <div
              onClick={() =>
                setStorageData({
                  ...storageData,
                  step3: {
                    ...step3,
                    public: !storageData.step3.public,
                  },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <img
                src={`./img/${
                  step3.public
                    ? "icon_checkbox_large_blue.svg"
                    : "icon_checkbox_large_gray.svg"
                }`}
                alt="체크박스 이미지"
              />
              <p>공동 명의를 원해요</p>
            </div>
          </div>
        </PublicCheck>
      </RegistForm>
    </>
  );
}

export default Step3_1;
