import styled from "styled-components";
import { stickTop, PageWrap } from "../styles/recycle";
import { SubModal } from "./ConditionModal";
import axios from "axios";
import { useEffect } from "react";

const ConditionSubWrap = styled(PageWrap)`
  height: 100vh;
  z-index: 500;
  background: #fff;
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
    // code1
    // axios.get("http://54.180.121.208:80/api/handle/terms/" + "code1")
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
      {subModal.content}
    </ConditionSubWrap>
  );
}

export default ConditionSubModal;
