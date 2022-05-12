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
    }

    .close_comfirm {
      color: #0740e4;
      margin-left: 24px;
    }
  }
`;

function CloseModal({
  setCloseModal,
}: {
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <CloseModalWrap>
      <p>홈서비스 신청을 취소하시겠습니까?</p>
      <div>
        <button onClick={() => setCloseModal(false)}>취소</button>
        <button className="close_comfirm">확인</button>
      </div>
    </CloseModalWrap>
  );
}

export default CloseModal;