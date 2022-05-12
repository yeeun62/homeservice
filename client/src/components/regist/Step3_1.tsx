import { useState } from "react";
import { RegistTitle, RegistForm, RegistSubBtn } from "../../styles/recycle";

function Step3_1() {
  const [check, setCheck] = useState<boolean>(false);

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
                  check ? "small_check_point.png" : "small_check.png"
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
            <img src="/img/w_icon_question_gray.png" alt="물음표 이모티콘" />
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
      </RegistForm>
    </>
  );
}

export default Step3_1;
