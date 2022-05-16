import { useState } from "react";
import { RegistTitle, RegistForm, RegistSubBtn } from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";

function Step3_3({ setActivate }: ActiveProps) {
  const [check, setCheck] = useState({ name: false, adress: false });

  return (
    <>
      <RegistTitle>법인 사업자 정보를 입력해 주세요</RegistTitle>
      <RegistForm>
        <div className="step_info">
          <div className="info_number">
            <p>1</p>
          </div>
          <p className="info_desc">명의자 정보</p>
        </div>
        <label>
          <div className="flex_check">
            <p>대표자명</p>
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
          <p>사업장 주소</p>
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
        <div className="step_info">
          <div className="info_number">
            <p>2</p>
          </div>
          <p className="info_desc">법인 정보</p>
        </div>
        <label>
          <p>법인명</p>
          <div className="input_div">
            <input type="text" placeholder="법인명 이름을 입력해주세요" />
          </div>
        </label>
        <label>
          <p>사업자 등록번호</p>
          <div className="input_div">
            <input type="text" placeholder="숫자만 입력해주세요" />
          </div>
        </label>
        <label>
          <p>세금계산서 발행 이메일 주소</p>
          <div className="input_div">
            <input type="text" placeholder="help@charancha.com" />
          </div>
        </label>
      </RegistForm>
    </>
  );
}

export default Step3_3;
