import { useState } from "react";
import styled from "styled-components";
import Progress from "./regist/Progress";
import { stickTop, RegistTitle } from "../styles/recycle";
import Modal from "react-modal";
import CloseModal from "../modal/CloseModal";
import "../modal/modal.css";

const HeaderWrapper = styled(stickTop)`
  .close {
    width: 32px;
    height: 32px;
    margin-left: 8px;
  }

  .beta {
    width: 33px;
    height: 18px;
    margin-left: 6px;
  }

  img {
    cursor: pointer;
  }

  @media screen and (min-width: 750px) {
    .close {
      display: none;
    }

    .header_title {
      margin-left: 32px;
    }
  }
`;

function Header({ step }: { step?: number }) {
  const [closeModal, setCloseModal] = useState(false);

  return (
    <>
      <Modal
        isOpen={closeModal}
        onRequestClose={() => setCloseModal(!closeModal)}
        overlayClassName="overlay"
        className="close_modal"
        ariaHideApp={false}
      >
        <CloseModal setCloseModal={setCloseModal} />
      </Modal>
      <HeaderWrapper>
        <img
          className="close"
          src="./img/icon_header_cancel_circle.svg"
          alt="닫기버튼"
          onClick={() => setCloseModal(true)}
        />
        <RegistTitle className="header_title">차란차 홈서비스 신청</RegistTitle>
        <img className="beta" src="./img/icon_beta_black.svg" alt="베타" />
        {window.location.pathname.slice(1).toLocaleLowerCase() === "regist" && (
          <Progress step={step} />
        )}
      </HeaderWrapper>
    </>
  );
}

export default Header;
