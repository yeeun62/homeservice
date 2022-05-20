import styled from "styled-components";
import { stickTop, PageWrap } from "../styles/recycle";
import { SubModal } from "./ConditionModal";
import axios from "axios";
import { useEffect } from "react";

const ConditionSubWrap = styled(PageWrap)`
  height: 100vh;
  padding: 16px;
  position: relative;

  .condition_content {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-family: "Poppins";
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #555555;

    @media screen and (man-width: 750px) {
      font-size: 17px;
      line-height: 25px;
    }
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
    axios
      .get(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/handle/terms/${subModal.code}`
      )
      .then((res) => {
        if (res.status === 200) {
          let inner = document.getElementsByClassName("condition_content");
          if (inner.length) {
            inner[0].innerHTML = res.data.result.message;
          }
        }
      });
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
