import styled from "styled-components";
import { useState, useEffect } from "react";

const ConditionWrap = styled.div`
  width: 100%;
  height: 70vh;
  background-color: #fff;
  border: 1px solid red;
  position: sticky;
  bottom: 0;
`;

function Conditions() {
  const [isChecked, setIsChecked] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  useEffect(() => {
    Object.values(isChecked)
      .slice(1)
      .forEach((ck: boolean) => {
        if (!ck) {
          return null;
        }
      });

    setIsChecked({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true });
  }, []);

  return (
    <ConditionWrap>
      <button type="button"></button>
      <p className="boldText">
        신청 완료를 위해 <br /> 아래 약관에 동의해주세요.
      </p>
      <div>
        <img
          src={`./img/${
            isChecked[1] ? "large_check_point.png" : "large_check.png"
          }`}
          alt="약관 전체동의 확인버튼"
          onClick={() =>
            setIsChecked({
              1: !isChecked[1],
              2: !isChecked[2],
              3: !isChecked[3],
              4: !isChecked[4],
              5: !isChecked[5],
              6: !isChecked[6],
            })
          }
        />
        <span>약관 전체동의</span>
      </div>
      <ul>
        <li key="condition1">
          <img
            src={`./img/${
              isChecked[1] ? "checked_lightblue_btn.png" : "large_check.png"
            }`}
            alt="개인정보 수집/이용동의(필수)"
            onClick={() => setIsChecked({ ...isChecked, 2: !isChecked[2] })}
          />
          <span>개인정보 수집/이용동의(필수)</span>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
        <li key="condition2">
          <img
            src="./img/large_check_point.png"
            alt="개인정보 수집/이용동의(필수)"
            onClick={() => setIsChecked({ ...isChecked, 3: !isChecked[3] })}
          />
          <span>고유식별정보 수집/이용동의(필수)</span>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
        <li key="condition3">
          <img
            src="./img/large_check_point.png"
            alt="개인정보 수집/이용동의(필수)"
            onClick={() => setIsChecked({ ...isChecked, 4: !isChecked[4] })}
          />
          <span>개인정보 처리의 위탁 동의(필수)</span>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
        <li key="condition4">
          <img
            src="./img/large_check_point.png"
            alt="개인정보 수집/이용동의(필수)"
            onClick={() => setIsChecked({ ...isChecked, 5: !isChecked[5] })}
          />
          <span>홈서비스 이용 약관 동의(필수)</span>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
        <li key="condition5">
          <img
            src="./img/large_check_point.png"
            alt="개인정보 수집/이용동의(필수)"
            onClick={() => setIsChecked({ ...isChecked, 6: !isChecked[6] })}
          />
          <span>홈서비스 환불 규정(필수)</span>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
      </ul>
    </ConditionWrap>
  );
}

export default Conditions;
