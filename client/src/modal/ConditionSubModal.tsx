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
    padding: 24px 16px;
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
