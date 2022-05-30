import styled from "styled-components";
import { SubModal } from "./ConditionModal";
import axios from "axios";
import { useEffect, useRef } from "react";

const ConditionSubWrap = styled.div`
  width: 100%;
  height: 100vh;

  .condition_header {
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    background-color: #fff;

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
    padding: 24px 16px 64px 16px;
    background-color: #fff;
    overflow: scroll;
  }

  li,
  p,
  h5 {
    color: #555;
  }
`;

interface SubModalProp {
  subModal: SubModal;
  setConditionSubOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConditionSubModal({ subModal, setConditionSubOpen }: SubModalProp) {
  const condition_content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/terms/${subModal.code}`
      )
      .then((res) => {
        if (res.status === 200) {
          let inner = condition_content;
          if (inner.current !== null) {
            inner.current.innerHTML = res.data.result.message;
          }
        }
      });
  }, [subModal.code]);

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
      <div className="condition_content" ref={condition_content}></div>
    </ConditionSubWrap>
  );
}

export default ConditionSubModal;
