import { RegistTitle, RegistForm, RegistSubBtn } from "../../styles/recycle";

interface Step3_1Props {
  setActivat: React.Dispatch<React.SetStateAction<boolean>>;
}

function Step3_1({ setActivat }: Step3_1Props) {
  return (
    <>
      <RegistTitle>명의자 정보를 입력해 주세요</RegistTitle>
      <RegistForm>
        <label>
          <div className="flex_check">
            <p>이름</p>
            <div>
              <img src="./img/small_check.png" alt="체크박스" />
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
          <p>
            주민등록주소지
            <img src="/img/w_icon_question_gray.png" alt="물음표 이모티콘" />
          </p>
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
        <div className="check_bottom">
          <img src="./img/large_check.png" />
          <p>공동 명의를 원해요</p>
        </div>
      </RegistForm>
    </>
  );
}

export default Step3_1;
