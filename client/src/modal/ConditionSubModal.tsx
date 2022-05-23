import styled from "styled-components";
import { stickTop, PageWrap } from "../styles/recycle";
import { SubModal } from "./ConditionModal";
import axios from "axios";
import { useEffect } from "react";

const ConditionSubWrap = styled(PageWrap)`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  position: relative;

  .condition_content {
    width: 100vw;
    position: absolute;
    top: 100px;
    white-space: pre-line;
    padding: 24px 16px;
    font-family: "Poppins";
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #555555;
    white-space: pre-line;
    margin-bottom: 30px;
  }
`;

const ConditionSubModalHeader = styled(stickTop)`
  img {
    width: 32px;
    height: 32px;
  }
`;

interface SubModalProp {
  subModal: SubModal;
  setSubModal: React.Dispatch<React.SetStateAction<SubModal>>;
}

function ConditionSubModal({ subModal, setSubModal }: SubModalProp) {
  useEffect(() => {
    // axios
    //   .get(
    //     `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/handle/terms/${subModal.code}`
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       let inner = document.getElementsByClassName("condition_content");
    //       if (inner.length) {
    //         inner[0].innerHTML = res.data.result.message;
    //       }
    //     }
    //   });
    let content = `
    <style>
        .condition_list {
          font-family: "Poppins";
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
          letter-spacing: -0.02em;
          color: #555555;
          white-space: pre-line;
          margin-bottom: 30px;
        }
        h5 {
          font-size: 20px;
          font-weight: 600;
        }
    </style>
    end
    <p>
        당사가 계약서 작성 목적으로 신청자의 고유식별 정보[주민등록번호]를 수집•이용하는 것에 동의합니다.
      </p>
      <h5>제공 및 변경에 관한 세부 사항</h5>
      <ul>
        <li>차란차 주식회사는 위 제휴업체에게 개인 정보를 제공할 경우, 상기한 목적 범위 내에서 제공하며 위 제공 대상 업체 현황, 제공대상 개인 정보 이용목적, 제공 대상 개인 정보 항목의 세부적인 내용은 차란차 홈페이지(www.charancha.com)에서 확인하실 수 있습니다.
        </li>
        <li>차란차 주식회사는 위 사항의 변경이 있을 경우에는 위 홈페이지에 변경 내용을 게시합니다.
        </li>
      </ul>
    `;
    let inner = document.getElementsByClassName("condition_content");
    let html = content.split("end")[1];
    if (inner.length) {
      inner[0].innerHTML = html;
    }
  }, []);

  return (
    <ConditionSubWrap>
      <ConditionSubModalHeader>
        <img
          src="./img/icon_navigation_back_black.svg"
          alt="약관 뒤로 가기"
          onClick={() => setSubModal({ ...subModal, open: false })}
        />
        <span>{subModal.title}</span>
      </ConditionSubModalHeader>
      <div className="condition_content"></div>
    </ConditionSubWrap>
  );
}

export default ConditionSubModal;
