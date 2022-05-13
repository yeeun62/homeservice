import styled from "styled-components";

const BankModalWrap = styled.div`
  width: 100%;
  height: 390px;
  max-width: 1200px;
  margin: 0 auto;

  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #101010;
  }

  .bank {
    border-bottom: 1px solid #ededed;
    height: 54px;
    display: flex;
    align-items: center;
  }

  .bank_name {
    padding-left: 24px;
  }

  .bank_list {
    height: 275px;
    overflow: scroll;
  }

  .bank_close {
    display: flex;
    justify-content: end;
    padding-right: 16px;
    width: 100%;
    height: 78px;
    background-color: #fff;
    bottom: 0%;

    p {
      margin-top: 32px;
      font-weight: 700;
    }
  }

  @media screen and (min-width: 750px) {
    .bank_name {
      padding-left: 28px;
    }
  }
`;

function BankModal({
  setBankModal,
}: {
  setBankModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const bankList = [
    "국민",
    "농협",
    "신한",
    "IBK기업",
    "하나",
    "우리",
    "SC제일",
    "대구",
    "부산",
    "광주",
    "새마을금고",
    "경남",
    "전북",
    "제주",
    "산업",
    "우체국",
    "신협",
    "수협",
    "시티",
    "카카오뱅크",
    "케이뱅크",
    "토스뱅크",
  ];

  return (
    <BankModalWrap>
      <button
        type="button"
        className="bottom_bar"
        onClick={() => setBankModal(false)}
        style={{ margin: "16px auto" }}
      />
      <div className="bank_list">
        {bankList.map((list: string) => (
          <div className="bank" key={list}>
            <p className="bank_name">{list}</p>
          </div>
        ))}
      </div>
      <div className="bank_close">
        <p onClick={() => setBankModal(false)}>닫기</p>
      </div>
    </BankModalWrap>
  );
}

export default BankModal;
