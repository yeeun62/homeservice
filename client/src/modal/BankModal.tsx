import styled from "styled-components";

const BankModalWrap = styled.div`
  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #101010;
  }

  .bar {
    width: 40px;
    height: 4px;
    background: #c2c2c2;
    border-radius: 10px;
    margin: 16px auto;
  }

  .bank {
    border-bottom: 1px solid #ededed;
    height: 54px;
    display: flex;
    align-items: center;

    .bank_name {
      padding-left: 16px;
    }
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
    position: fixed;
    bottom: 0%;

    p {
      margin-top: 32px;
      font-weight: 700;
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
      <div className="bar" onClick={() => setBankModal(false)} />
      <div className="bank_list">
        {bankList.map((list: string) => (
          <div className="bank">
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
