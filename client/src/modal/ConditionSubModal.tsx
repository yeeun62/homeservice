import styled from "styled-components";
import { PageWrap } from "../styles/recycle";
import { SubModal } from "./ConditionModal";
import axios from "axios";
import { useEffect } from "react";

const ConditionSubWrap = styled(PageWrap)`
  width: 100%;
  height: 100vh;
  background-color: #fff;

  .condition_header {
    height: 56px;
    display: flex;
    align-items: center;

    p {
      font-weight: 700;
      font-size: 17px;
      line-height: 25px;
      letter-spacing: -0.02em;
      color: #101010;
    }

    img {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }

  .condition_content {
    width: 100%;
    height: Calc(100vh - 56px);
    position: absolute;
    top: 100px;
    padding: 24px 16px;
  }
`;

interface SubModalProp {
  subModal: SubModal;
  setConditionSubOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConditionSubModal({ subModal, setConditionSubOpen }: SubModalProp) {
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
      <div className="condition_header">
        <img
          src="./img/icon_navigation_back_black.svg"
          alt="약관 뒤로 가기"
          onClick={() => setConditionSubOpen(false)}
        />
        <p>{subModal.title}</p>
      </div>
      <div className="condition_content"></div>
    </ConditionSubWrap>
  );
}

export default ConditionSubModal;
