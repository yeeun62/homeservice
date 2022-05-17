import { useState } from "react";
import styled from "styled-components";
import { RegistTitle, RegistForm, RegistSubBtn } from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";

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
  const [publicCheck, setPublicCheck] = useState<boolean>(false);

  return (
    <>
      <RegistTitle>명의자 정보를 입력해 주세요</RegistTitle>
      <RegistForm>
        <label>
          <div className="flex_check">
            <p>이름</p>
            <span className="check_inner_1"></span>
            <span className="check_inner_2"></span>
            <div onClick={() => setCheck(!check)}>
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
            <input type="text" placeholder="실명을 입력해주세요" />
          </div>
        </label>
        <label>
          <p>휴대전화 번호</p>
          <div className="input_div">
            <input type="text" placeholder="숫자만 입력해주세요" />
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
              <input type="text" placeholder="주소를 검색해주세요" />
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
          <div onClick={() => setPublicCheck(!publicCheck)}>
            <img
              src={`./img/${
                publicCheck
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
