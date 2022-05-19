import styled from "styled-components";
import { StorageType } from "../App";

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
  bankList,
}: {
  setBankModal: React.Dispatch<React.SetStateAction<boolean>>;
  setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
  bankList: any;
}) {
  return (
    <BankModalWrap>
      <button
        type="button"
        className="bottom_bar"
        onClick={() => setBankModal(false)}
        style={{ margin: "16px auto" }}
      />
      <div className="bank_list">
        {bankList &&
          bankList.name.map((list: string, index: number) => (
            <div
              className="bank"
              key={list}
              onClick={() => {
                setStorageData((p) => ({
                  ...p,
                  step4: {
                    ...p.step4,
                    bank: { name: list, code: bankList.code[index] },
                  },
                }));
                setBankModal(false);
              }}
            >
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
