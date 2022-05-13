import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainBtn, RegistTitle } from "../styles/recycle";
import ConditionSubModal from "./ConditionSubModal";

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
        width: 16px;
        height: 16px;
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

export interface SubModal {
  title: string;
  content: any;
  open: boolean;
}

function ConditionModal({
  setConditionModal,
}: {
  setConditionModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  type CkType = {
    [index: string]: boolean;
  };

  const [isChecked, setIsChecked] = useState<CkType>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    all: false,
  });

  const [subModal, setSubModal] = useState<SubModal>({
    title: "개인정보 수집/이용동의(필수)",
    content: "",
    open: false,
  });

  useEffect(() => {
    let checked = Object.keys(isChecked)
      .slice(0, -1)
      .filter((ck: string) => {
        return isChecked[ck];
      });

    if (checked.length < 5) {
      setIsChecked({ ...isChecked, all: false });
    } else {
      setIsChecked({ ...isChecked, all: true });
    }
  }, [isChecked[0], isChecked[1], isChecked[2], isChecked[3], isChecked[4]]);

  const allCheckHandler = () => {
    if (isChecked["all"]) {
      setIsChecked({
        all: false,
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
      });
    } else {
      setIsChecked({
        all: true,
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
      });
    }
  };

  const conditionArr: string[] = [
    "개인정보 수집/이용동의(필수)",
    "고유식별정보 수집/이용동의(필수)",
    "개인정보 처리의 위탁 동의(필수)",
    "홈서비스 이용 약관 동의(필수)",
    "홈서비스 환불 규정(필수)",
  ];

  useEffect(() => {
    if (window.onpopstate) {
      console.log(window);
    }
  });

  return (
    <ConditionWrap>
      {subModal.open && (
        <ConditionSubModal
          title={subModal.title}
          content={subModal.content}
          setSubModal={setSubModal}
        />
      )}

      <button
        type="button"
        className="close_btn"
        onClick={() => setConditionModal((prev) => !prev)}
      ></button>
      <RegistTitle className="condition_title">
        신청 완료를 위해 <br /> 아래 약관에 동의해주세요.
      </RegistTitle>
      <MainBtn
        className="all_check_btn bold_text"
        type="button"
        backgrondColor={`${
          isChecked["all"] ? "rgba(7, 64, 228, 0.03)" : "#fff"
        }`}
        border={`${
          isChecked["all"]
            ? "1px solid rgba(7, 64, 228, 0.1)"
            : "1px solid #ededed"
        }`}
        color={`${isChecked["all"] ? "#0740E4" : "#707070"}`}
        activat={true}
        onClick={allCheckHandler}
      >
        <img
          src={`./img/${
            isChecked["all"]
              ? "icon_checkbox_large_blue.svg"
              : "icon_checkbox_large_gray.svg"
          }`}
          alt="약관 전체동의 확인버튼"
        />
        약관 전체동의
      </MainBtn>
      <ul>
        {conditionArr.map((condition: string, i: number) => {
          return (
            <li key={condition}>
              <div
                onClick={() =>
                  setIsChecked({ ...isChecked, [i]: !isChecked[i] })
                }
              >
                <img
                  src={`./img/${
                    isChecked[i]
                      ? "icon_checkbox_large_blue40.svg"
                      : "icon_checkbox_large_gray.svg"
                  }`}
                  alt={condition}
                />
                <span>{condition}</span>
              </div>
              <img
                src="./img/icon_arrow_right_medium_gray.svg"
                alt="약관 더 보기"
                onClick={() =>
                  setSubModal({ title: condition, content: "", open: true })
                }
              />
            </li>
          );
        })}
      </ul>
      <div className="bottom_div">
        <div></div>
        <span>
          고객님께서는 약관동의를 거부하실 수 있으며, <br /> 필수사항 미동의 시
          차란차 홈서비스 이용이 제한됩니다.
        </span>
      </div>
      <Link to="/complete">
        <MainBtn
          backgrondColor="#0740E4"
          color="#fff"
          border="none"
          activat={isChecked["all"]}
          style={{ fontWeight: 700 }}
        >
          신청 완료
        </MainBtn>
      </Link>
    </ConditionWrap>
  );
}

export default ConditionModal;
