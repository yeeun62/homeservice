import styled from "styled-components";

const CloseModalWrap = styled.div`
  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #101010;
    margin-bottom: 32px;
  }

  div {
    display: flex;
    justify-content: end;

    button {
      font-weight: 700;
      font-size: 15px;
      line-height: 22px;
      letter-spacing: -0.02em;
      color: #707070;
      background-color: transparent;
    }

    .close_comfirm {
      color: #0740e4;
      margin-left: 24px;
    }
  }
`;

function CloseModal({
  setCloseModal,
  data,
  mainTxt,
}: {
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  mainTxt: string;
}) {
  const closePopup = () => {
    setCloseModal(false);
    // localStorage.removeItem("sell");
    // localStorage.removeItem("localStep");
    // window.open("", "_self")?.close();
    let close = window.open("");
    if (close) close.close();
    // self.close();
    // window.close();
    // window.opener = window.location.href;
    // window.open("", "_self")?.close();
  };

  return (
    <CloseModalWrap>
      <p>{mainTxt}</p>
      <div>
        {mainTxt === "홈서비스 신청을 취소하시겠습니까?" && (
          <button onClick={() => setCloseModal(false)}>취소</button>
        )}
        <button className="close_comfirm" onClick={closePopup}>
          확인
        </button>
      </div>
    </CloseModalWrap>
  );
}

export default CloseModal;
