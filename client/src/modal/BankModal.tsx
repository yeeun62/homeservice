import styled from "styled-components";
import { StorageType } from "../App";

const BankModalWrap = styled.div`
  width: 100%;
  height: 373px;
  max-width: 1200px;
  margin: 0 auto;

  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #101010;
  }

  .bank_list {
    background-color: #fff;
    height: 275px;
    overflow: auto;
    cursor: pointer;

    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }

    .bank {
      border-bottom: 1px solid #ededed;
      height: 54px;
      display: flex;
      align-items: center;

      .bank_name {
        padding-left: 24px;
      }
    }
  }

  .bank_close {
    background-color: transparent;
    position: relative;
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 94px;

    p {
      padding-right: 24px;
    }

    .gradient {
      position: absolute;
      width: 100%;
      top: -14%;
      height: 18px;
      background: linear-gradient(to top, #fff 20%, transparent);
    }

    p {
      cursor: pointer;
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
          bankList.map((bank: any) => {
            return (
              <div
                className="bank"
                key={bank.name}
                onClick={() => {
                  setStorageData((p) => ({
                    ...p,
                    step4: {
                      ...p.step4,
                      bank: {
                        name: bank.name,
                        refund_bank_cd: bank.id,
                      },
                    },
                  }));
                  setBankModal(false);
                }}
              >
                <p className="bank_name">{bank.name}</p>
              </div>
            );
          })}
      </div>
      <div className="bank_close">
        <div className="gradient"></div>
        <p onClick={() => setBankModal(false)}>닫기</p>
      </div>
    </BankModalWrap>
  );
}

export default BankModal;
