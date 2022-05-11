import { useState } from "react";
import { RegistTitle, RegistForm, RegistSubBtn } from "../../styles/recycle";

function Step3_2() {
  const [check, setCheck] = useState({ name: false, id: false });

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
                  check.name ? "small_check_point.png" : "small_check.png"
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
              onFocus={(e) => (e.target.style.borderColor = "#3C3C3C")}
              onBlur={(e) => (e.target.style.borderColor = "#ededed")}
            />
          </div>
        </label>
        <label>
          <p>휴대전화 번호</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="숫자만 입력해주세요"
              onFocus={(e) => (e.target.style.borderColor = "#3C3C3C")}
              onBlur={(e) => (e.target.style.borderColor = "#ededed")}
            />
          </div>
        </label>
        <label>
          <div className="flex_check">
            <p>주민등록주소지</p>
            <div onClick={() => setCheck({ ...check, id: !check.id })}>
              <img
                src={`./img/${
                  check.id ? "small_check_point.png" : "small_check.png"
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
                onFocus={(e) => (e.target.style.borderColor = "#3C3C3C")}
                onBlur={(e) => (e.target.style.borderColor = "#ededed")}
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
                onFocus={(e) => (e.target.style.borderColor = "#3C3C3C")}
                onBlur={(e) => (e.target.style.borderColor = "#ededed")}
              />
            </div>
          </div>
        </label>
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
              onFocus={(e) => (e.target.style.borderColor = "#3C3C3C")}
              onBlur={(e) => (e.target.style.borderColor = "#ededed")}
            />
          </div>
        </label>
        <label>
          <p>사업장 주소</p>
          <div className="flex_form">
            <div className="input_div">
              <input
                type="text"
                placeholder="주소를 검색해주세요"
                onFocus={(e) => (e.target.style.borderColor = "#3C3C3C")}
                onBlur={(e) => (e.target.style.borderColor = "#ededed")}
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
                onFocus={(e) => (e.target.style.borderColor = "#3C3C3C")}
                onBlur={(e) => (e.target.style.borderColor = "#ededed")}
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
              onFocus={(e) => (e.target.style.borderColor = "#3C3C3C")}
              onBlur={(e) => (e.target.style.borderColor = "#ededed")}
            />
          </div>
        </label>
        <label style={{ marginBottom: "88px" }}>
          <p>세금계산서 발행 이메일 주소</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="help@charancha.com"
              onFocus={(e) => (e.target.style.borderColor = "#3C3C3C")}
              onBlur={(e) => (e.target.style.borderColor = "#ededed")}
            />
          </div>
        </label>
      </RegistForm>
    </>
  );
}

export default Step3_2;
