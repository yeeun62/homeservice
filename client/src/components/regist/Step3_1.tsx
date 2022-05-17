import { useState, useEffect } from "react";
import styled from "styled-components";
import { RegistTitle, RegistForm, RegistSubBtn } from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";
import { StorageType } from "../../App";

const PublicCheck = styled.div`
  margin-top: 68px;
  cursor: pointer;

  div {
    display: flex;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #707070;
  }
`;

function Step3_1({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [check, setCheck] = useState<boolean>(false);
  const step3 = storageData.step3;
  useEffect(() => {
    // 조건은 다시 하기
    if (step3.name && step3.mobile && step3.postCode) {
      setActivate(true);
    }

    //if(storageData)
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
            <span className="check_inner_1"></span>
            <span className="check_inner_2"></span>
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
              value={step3.name}
              onChange={(e) => validationHandler(e, "name")}
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
              onKeyDown={(e: any) => {
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
        <label>
          <p>
            주민등록주소지
            <img
              src="/img/w_icon_question_medium_gray.svg"
              alt="물음표 이모티콘"
            />
          </p>
          <div className="flex_form">
            <div className="input_div">
              <input
                type="text"
                placeholder="주소를 검색해주세요"
                onChange={(e) => validationHandler(e, "postCode")}
                value={step3.postCode}
                // daum postcode 추가하기
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
              />
            </div>
          </div>
        </label>
        <PublicCheck>
          <div
            onClick={() =>
              setStorageData({
                ...storageData,
                step3: {
                  ...storageData.step3,
                  public: !storageData.step3.public,
                },
              })
            }
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
        </PublicCheck>
      </RegistForm>
    </>
  );
}

export default Step3_1;
