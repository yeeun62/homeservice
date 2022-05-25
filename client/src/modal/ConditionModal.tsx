import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainBtn, RegistTitle } from "../styles/recycle";
import ConditionSubModal from "./ConditionSubModal";
import Modal from "react-modal";
import { StorageType } from "../App";
import axios from "axios";

const ConditionWrap = styled.div`
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;

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
        cursor: pointer;
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
    padding: 16px 32px 32px 32px;
  }
`;

export interface SubModal {
  [key: string]: any;
  title: string;
  code: string;
}

interface ConditionProps {
  setConditionModal: React.Dispatch<React.SetStateAction<boolean>>;
  storageData: StorageType;
}

type CkType = {
  [index: string]: boolean;
};

function ConditionModal({ setConditionModal, storageData }: ConditionProps) {
  const [conditionSubOpen, setConditionSubOpen] = useState<boolean>(false);
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
    code: "code1",
  });

  const dependency = [
    isChecked[0],
    isChecked[1],
    isChecked[2],
    isChecked[3],
    isChecked[4],
    setIsChecked,
  ];

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
  }, [...dependency]);

  const allCheckHandler = () => {
    if (isChecked.all) {
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

  const navigate = useNavigate();

  function CompleteHandler() {
    const { sellNo, payment_cd, step1, step2, step3, step4 } = storageData;
    const { customer_name, customer_hphone } = step1;
    const { nominee_cd } = step2;
    const {
      nominee_name,
      nominee_hphone,
      address,
      address2,
      business_name,
      business_number,
      business_email,
      nominee_reduction_joint,
    } = step3;
    const {
      nominee_address_post,
      nominee_address_road,
      nominee_address_jibun,
      nominee_address,
    } = address;
    const {
      business_address_post,
      business_address_road,
      business_address_jibun,
      business_address,
    } = address2;
    const { refund_accout_name, refund_accout_number, bank } = step4;
    if (isChecked.all) {
      axios
        .post(
          `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/process`,
          {
            sellNo,
            payment_cd,
            customer_name,
            customer_hphone,
            nominee_cd,
            nominee_name,
            nominee_hphone,
            nominee_address_post,
            nominee_address_road,
            nominee_address_jibun,
            nominee_address,
            nominee_reduction_joint: `${nominee_reduction_joint}`,
            business_name,
            business_address_post,
            business_address_road,
            business_address_jibun,
            business_address,
            business_number,
            business_email,
            refund_bank_cd: bank.refund_bank_cd,
            refund_accout_name,
            refund_accout_number,
          }
        )
        .then((result) => {
          console.log(result);
          console.log(nominee_address_road);
          if (result.data.message === "OK") {
            // console.log("제출성공");
            navigate(`/complete${window.location.search}`);
            localStorage.removeItem(sellNo);
            localStorage.removeItem("localStep");
          }
        })
        .catch((err) => {
          console.log("제출 에러", err);
          alert("매물정보가 없어 실패하였습니다. 관리자에 문의하세요.");
        });
    }
    return;
  }

  return (
    <>
      <Modal
        isOpen={conditionSubOpen}
        onRequestClose={() => setConditionSubOpen(!conditionSubOpen)}
        overlayClassName="overlay"
        className="condition_sub_modal"
        ariaHideApp={false}
      >
        <ConditionSubModal
          subModal={subModal}
          setConditionSubOpen={setConditionSubOpen}
        />
      </Modal>
      <ConditionWrap>
        <button
          type="button"
          className="bottom_bar"
          onClick={() => setConditionModal(false)}
          style={{ margin: "0 auto 32px" }}
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
          activate={true}
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
                    alt="체크"
                  />
                  <span>{condition}</span>
                </div>
                <img
                  src="./img/icon_arrow_right_medium_gray.svg"
                  alt="약관 더 보기"
                  onClick={() => {
                    setConditionSubOpen(true);
                    setSubModal({
                      title: condition,
                      code: `code${i + 1}`,
                    });
                  }}
                />
              </li>
            );
          })}
        </ul>
        <div className="bottom_div">
          <div></div>
          <span>
            고객님께서는 약관동의를 거부하실 수 있으며, <br /> 필수사항 미동의
            시 차란차 홈서비스 이용이 제한됩니다.
          </span>
        </div>
        <MainBtn
          backgrondColor="#0740E4"
          color="#fff"
          border="none"
          activate={isChecked["all"]}
          style={{ fontWeight: 700 }}
          onClick={CompleteHandler}
        >
          신청 완료
        </MainBtn>
      </ConditionWrap>
    </>
  );
}

export default ConditionModal;
