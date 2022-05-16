import { RegistTitle, RegistSubBtn, RegistForm } from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";

function Step1({ setActivate, setStorageData }: ActiveProps) {
  return (
    <>
      <RegistTitle>신청자 정보를 입력해 주세요</RegistTitle>
      <RegistForm>
        <label>
          <p className="form_title">이름</p>
          <div className="input_div">
            <input type="text" placeholder="실명을 입력해주세요" />
          </div>
        </label>
        <label>
          <p>휴대전화 번호</p>
          <div className="flex_form">
            <div className="input_div">
              <input type="text" placeholder="숫자만 입력해주세요" />
            </div>
            <RegistSubBtn backgrondColor="#C2C2C2">인증번호 전송</RegistSubBtn>
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
