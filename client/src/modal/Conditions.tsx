import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import BottomBtn from "../components/BottomBtn";
import { MainBtn } from "../styles/recycle";

const ConditionWrap = styled.div`
  padding: 16px;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 1200px;
  background-color: #fff;

  .close_btn {
    width: 40px;
    height: 4px;
    background: #c2c2c2;
    border-radius: 10px;
    display: block;
    margin: 0 auto 32px;
  }

  .all_check_btn {
    margin-top: 24px;
    text-align: left;
    display: flex;
    align-items: center;

    img {
      width: 20px;
      margin: 0 8px 0 16px;
    }

    span {
      color: #0740e4;
      line-height: 54px;
    }
  }

  ul {
    /* height: 34%; */
    padding: 16px;
    border-bottom: 1px solid #ededed;
    margin-bottom: 16px;

    li {
      height: 36px;
      display: flex;
      justify-content: space-between;

      div {
        display: flex;

        img {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }

        span {
          font-weight: 400;
          font-size: 13px;
          line-height: 19px;
          cursor: pointer;
        }
      }

      img {
        width: 12px;
        height: 12px;
        margin-left: 8px;
      }
    }
  }

  .bottom_div {
    font-weight: 400;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #939393;
    margin-bottom: 32px;
    position: relative;
    padding-left: 9px;

    div {
      width: 3px;
      height: 3px;
      background-color: #939393;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 5px;
    }
  }

  @media screen and (min-width: 750px) {
    padding: 32px;
  }
`;

function Conditions({
  setConditionModal,
}: {
  setConditionModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  type CkType = {
    [index: string]: boolean;
  };
  const [isChecked, setIsChecked] = useState<CkType>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  useEffect(() => {
    // Object.keys(isChecked)
    //   .slice(1)
    //   .forEach((ck: string) => {
    //     if (isChecked[ck]) setIsChecked({ ...isChecked, 1: false });
    //   });

    let allCk = { ...isChecked, 1: false };
    if (!isChecked[2]) setIsChecked(allCk);
    if (!isChecked[3]) setIsChecked(allCk);
    if (!isChecked[4]) setIsChecked(allCk);
    if (!isChecked[5]) setIsChecked(allCk);
    if (!isChecked[6]) setIsChecked(allCk);
  }, [isChecked[2], isChecked[3], isChecked[4], isChecked[5], isChecked[6]]);

  const checkHandler = (ck: string) => {
    if (isChecked === { 1: false, 2: true, 3: true, 4: true, 5: true, 6: true })
      setIsChecked({ ...isChecked, 1: true });
  };

  const allCheckHandler = () => {
    let checkArr = Object.values(isChecked);
    let arr = [];
    checkArr.forEach((ck: boolean) => {
      if (ck) arr.push(ck);
    });

    if (arr.length > 5) {
      setIsChecked({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      });
    } else {
      setIsChecked({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true });
    }
  };

  return (
    <ConditionWrap>
      <button
        type="button"
        className="close_btn"
        onClick={() => setConditionModal((prev) => !prev)}
      ></button>
      <p className="bold_text condition_title">
        신청 완료를 위해 <br /> 아래 약관에 동의해주세요.
      </p>
      <MainBtn
        className="all_check_btn bold_text"
        type="button"
        backgrondColor={`${isChecked[1] ? "rgba(7, 64, 228, 0.03)" : "#fff"}`}
        border={`${
          isChecked[1] ? "1px solid rgba(7, 64, 228, 0.1)" : "1px solid #ededed"
        }`}
        color={`${isChecked[1] ? "#0740E4" : "#707070"}`}
        activat={true}
        onClick={allCheckHandler}
      >
        <img
          src={`./img/${
            isChecked[1] ? "large_check_point.png" : "large_check.png"
          }`}
          alt="약관 전체동의 확인버튼"
        />
        약관 전체동의
      </MainBtn>
      <ul>
        <li key="condition1">
          <div onClick={() => setIsChecked({ ...isChecked, 2: !isChecked[2] })}>
            <img
              src={`./img/${
                isChecked[2] ? "checked_lightblue_btn.png" : "large_check.png"
              }`}
              alt="개인정보 수집/이용동의(필수)"
              onClick={() => setIsChecked({ ...isChecked, 2: !isChecked[2] })}
            />
            <span>개인정보 수집/이용동의(필수)</span>
          </div>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
        <li key="condition2">
          <div onClick={() => setIsChecked({ ...isChecked, 3: !isChecked[3] })}>
            <img
              src={`./img/${
                isChecked[3] ? "checked_lightblue_btn.png" : "large_check.png"
              }`}
              alt="개인정보 수집/이용동의(필수)"
              onClick={() => setIsChecked({ ...isChecked, 3: !isChecked[3] })}
            />
            <span>고유식별정보 수집/이용동의(필수)</span>
          </div>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
        <li key="condition3">
          <div onClick={() => setIsChecked({ ...isChecked, 4: !isChecked[4] })}>
            <img
              src={`./img/${
                isChecked[4] ? "checked_lightblue_btn.png" : "large_check.png"
              }`}
              alt="개인정보 수집/이용동의(필수)"
              onClick={() => setIsChecked({ ...isChecked, 4: !isChecked[4] })}
            />
            <span>개인정보 처리의 위탁 동의(필수)</span>
          </div>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
        <li key="condition4">
          <div onClick={() => setIsChecked({ ...isChecked, 5: !isChecked[5] })}>
            <img
              src={`./img/${
                isChecked[5] ? "checked_lightblue_btn.png" : "large_check.png"
              }`}
              alt="개인정보 수집/이용동의(필수)"
              onClick={() => setIsChecked({ ...isChecked, 5: !isChecked[5] })}
            />
            <span>홈서비스 이용 약관 동의(필수)</span>
          </div>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
        <li key="condition5">
          <div onClick={() => setIsChecked({ ...isChecked, 6: !isChecked[6] })}>
            <img
              src={`./img/${
                isChecked[6] ? "checked_lightblue_btn.png" : "large_check.png"
              }`}
              alt="개인정보 수집/이용동의(필수)"
            />
            <span>홈서비스 환불 규정(필수)</span>
          </div>
          <img
            src="./img/w_icon_arrow_right_large_gray.png"
            alt="약관 더 보기"
          />
        </li>
      </ul>
      <div className="bottom_div">
        <div></div>
        <span>
          고객님께서는 약관동의를 거부하실 수 있으며, <br /> 필수사항 미동의 시
          차란차 홈서비스 이용이 제한됩니다.
        </span>
      </div>
      <Link to="/">
        <MainBtn
          backgrondColor="#0740E4"
          color="#fff"
          border="none"
          activat={isChecked[1]}
          className="bold_text"
        >
          신청 완료
        </MainBtn>
      </Link>
    </ConditionWrap>
  );
}

export default Conditions;
