import { useEffect, useState } from "react";
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

function Step3_2({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [check, setCheck] = useState({ name: false, adress: false });
  const step3 = storageData.step3;

  // useEffect(() => {
  //   if()
  // }, [])

  // useEffect 는 사라질 거
  // useEffect(() => {
  //   if (storageData.step3 === "") {
  //     setStorageData({
  //       ...storageData,
  //       step3: {
  //         name: "",
  //         mobile: "",
  //         address: "",
  //         detailAddress: "",
  //         name2: "",
  //         address2: "",
  //         detailAddress3: "",
  //         buisnessNumer: "",
  //         email: "",
  //         public: "",
  //       },
  //     });
  //   }
  // }, []);

  function validationHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    setStorageData({
      ...storageData,
      step3: { ...step3, [key]: e.target.value },
    });
  }

  return (
    <>
      <RegistTitle>개인 사업자 정보를 입력해 주세요</RegistTitle>
      <RegistForm>
        <div className="step_info">
          <div className="info_number">
            <p>1</p>
          </div>
          <p className="info_desc">명의자 정보</p>
        </div>
        <label>
          <div className="flex_check">
            <p>이름</p>
            <div onClick={() => setCheck({ ...check, name: !check.name })}>
              <img
                src={`./img/${
                  check.name
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
                value={step3.detailAddress}
                onChange={(e) => validationHandler(e, "detailAddress")}
              />
            </div>
          </div>
        </label>
        {/* ============================ 사업자 ======================== */}
        <div className="step_info">
          <div className="info_number">
            <p>2</p>
          </div>
          <p className="info_desc">사업자 정보</p>
        </div>
        <label>
          <p>사업장명</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="사업장 이름을 입력해주세요"
              value={step3.name2}
              onChange={(e) => validationHandler(e, "name2")}
            />
          </div>
        </label>
        <label>
          <div className="flex_check">
            <p>사업장 주소</p>
            <div onClick={() => setCheck({ ...check, adress: !check.adress })}>
              <img
                src={`./img/${
                  check.adress
                    ? "icon_checkbox_large_blue.svg"
                    : "icon_checkbox_large_gray.svg"
                }`}
                alt="체크박스"
              />
              <p>주민등록주소와 동일</p>
            </div>
          </div>
          <div className="flex_form">
            <div className="input_div">
              <input
                type="text"
                placeholder="주소를 검색해주세요"
                readOnly
                value={step3.address2}
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
                value={step3.detailAddress2}
                onChange={(e) => validationHandler(e, "detailAddress2")}
              />
            </div>
          </div>
        </label>
        <label>
          <p>사업자 등록번호</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="숫자만 입력해주세요"
              value={step3.buisnessNumer}
              onChange={(e) => validationHandler(e, "buisnessNumer")}
            />
          </div>
        </label>
        <label>
          <p>세금계산서 발행 이메일 주소</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="help@charancha.com"
              value={step3.email}
              onChange={(e) => validationHandler(e, "email")}
            />
          </div>
        </label>
        <PublicCheck>
          <div
            onClick={() =>
              setStorageData({
                ...storageData,
                step3: { ...step3, publick: !step3.public },
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

export default Step3_2;
