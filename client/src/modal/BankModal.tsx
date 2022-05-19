import styled from "styled-components";
import { StorageType } from "../App";
import { useEffect, useState } from "react";

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
    overflow: auto;
    cursor: pointer;

    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
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
  setStorageData,
}: {
  setBankModal: React.Dispatch<React.SetStateAction<boolean>>;
  setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
}) {
  const [bankList, setBankList] = useState();
  // 지울거
  useEffect(() => {}, []);

  const bankListss = [
    { name: "국민", code: "" },
    { name: "농협", code: "" },
    { name: "신한", code: "" },
    { name: "IBK기업", code: "" },
    { name: "하나", code: "" },
    { name: "우리", code: "" },
    { name: "SC제일", code: "" },
    { name: "대구", code: "" },
    { name: "부산", code: "" },
    { name: "광주", code: "" },
    { name: "새마을금고", code: "" },
    { name: "경남", code: "" },
    { name: "전북", code: "" },
    { name: "제주", code: "" },
    { name: "산업", code: "" },
    { name: "우체국", code: "" },
    { name: "신협", code: "" },
    { name: "수협", code: "" },
    { name: "시티", code: "" },
    { name: "카카오뱅크", code: "" },
    { name: "케이뱅크", code: "" },
    { name: "토스뱅크", code: "" },
  ];

  return (
    <BankModalWrap>
      <button
        type="button"
        className="bottom_bar"
        onClick={() => setBankModal(false)}
        style={{ margin: "16px auto" }}
      />
      {/* <div className="bank_list">
        {bankList.map((list: { name: string; code: string }) => (
          <div
            className="bank"
            key={list.code}
            onClick={() => {
              setStorageData((p) => ({
                ...p,
                step4: { ...p.step4, bank: list.code },
              }));
              setBankModal(false);
            }}
          >
            <p className="bank_name">{list.name}</p>
          </div>
        ))}
      </div> */}
      <div className="bank_close">
        <p onClick={() => setBankModal(false)}>닫기</p>
      </div>
    </BankModalWrap>
  );
}

export default BankModal;
