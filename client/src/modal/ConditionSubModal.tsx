import styled from "styled-components";
import { stickTop, PageWrap } from "../styles/recycle";
import { SubModal } from "./ConditionModal";
import axios from "axios";
import { useEffect, useState } from "react";

const ConditionSubWrap = styled(PageWrap)`
  height: 100vh;
  padding: 16px;
  position: relative;

  p {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-family: "Poppins";
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #555555;
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
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/handle/terms/${subModal.code}`
      )
      .then((res) => {
        if (res.status === 200) {
          setContent(res.data.result.message);
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
      <p>{content}</p>
    </ConditionSubWrap>
  );
}

export default ConditionSubModal;
