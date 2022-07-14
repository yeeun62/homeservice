import styled from "styled-components";
import { MainBtn, RegistTitle } from "../../styles/recycle";
import { StorageType } from "../../App";
import { useRef } from "react";

const PayWrap = styled.div`
    padding-bottom: 32px;
    overflow: visible;

    div {
        display: flex;
    }

    ul {
        li {
            font-weight: 400;
            font-size: 11px;
            line-height: 16px;
            letter-spacing: -0.02em;
            color: #939393;
            width: calc(100% - 32px);
            position: relative;
            padding-left: 10px;
            margin-top: 24px;

            p {
                font-weight: 700;
                color: #5f5e5e;
            }

            ::before {
                content: "";
                width: 3px;
                height: 3px;
                border-radius: 50%;
                background-color: #939393;
                position: absolute;
                left: 0;
                top: 5px;
            }
        }

        :last-child {
            margin-bottom: 100px;
        }

        @media screen and (min-width: 750px) {
            :last-child {
                margin-bottom: 140px;
            }

            li {
                font-size: 13px;
            }
        }
    }
`;

function Pay({
    storageData,
    setStorageData,
    priceTxt,
}: {
    storageData: StorageType;
    setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
    priceTxt: any;
}) {
    const ulRef = useRef<HTMLUListElement>(null);
    return (
        <PayWrap>
            <RegistTitle>결제 수단을 선택해주세요</RegistTitle>
            <div>
                <MainBtn
                    type="button"
                    pay={storageData.payment_cd === "HOME_PAYMENT_001"}
                    activate={true}
                    onClick={() => {
                        setStorageData({
                            ...storageData,
                            payment_cd: "HOME_PAYMENT_001",
                        });
                    }}
                    style={{ marginRight: "8px" }}
                >
                    현금
                </MainBtn>
                <MainBtn
                    type="button"
                    pay={storageData.payment_cd === "HOME_PAYMENT_002"}
                    activate={true}
                    onClick={() => {
                        setStorageData({
                            ...storageData,
                            payment_cd: "HOME_PAYMENT_002",
                        });
                    }}
                >
                    현금 + 할부
                </MainBtn>
            </div>
            {/* <ul ref={ulRef}>
                {storageData.payment_cd === "HOME_PAYMENT_001"
                    ? priceTxt.cash.map((li: string) => {
                          if (
                              li.search("<strong>") >= 0 &&
                              ulRef.current !== null
                          ) {
                              return (ulRef.current.innerHTML = li);
                          }
                      })
                    : storageData.payment_cd === "HOME_PAYMENT_002"
                    ? priceTxt.installment.map((li: string) => {
                          if (
                              li.search("<strong>") >= 0 &&
                              ulRef.current !== null
                          ) {
                              return (ulRef.current.innerHTML = li);
                          }
                      })
                    : null}
            </ul> */}
        </PayWrap>
    );
}

export default Pay;
