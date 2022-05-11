import React from "react";
import styled from "styled-components";
import { Button } from "../../styles/recycle";

const PayWrap = styled.div`
  p {
    margin-bottom: 24px;
  }

  .buttonWrapper {
    display: flex;

    button {
      font-weight: 500;
      width: 100%;
      height: 52px;
      border-radius: 5px;
      font-family: "Noto Sans KR";
      background-color: #fff;
    }

    button:nth-child(1) {
      margin-right: 8px;
    }

    .false_btn {
      color: #707070;
      font-weight: 500;
      border: 1px solid #ededed;
    }

    .true_btn {
      background-color: #0740e4;
      color: #fff;
      border: none;
    }

    .cashBtn1 {
      margin-right: 8px;
    }
  }

  ul {
    margin: 24px 0;

    li {
      list-style-position: inside;
      text-indent: -20px;
      padding-left: 20px;
      /* 모바일사이즈에서 리스트 들여쓰기 확인하기 */
      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 16px;
      letter-spacing: -0.02em;
      color: #939393;
      width: calc(100% - 32px);
      margin: 0 auto 7px;
    }
  }
`;

function Pay({
  payWay,
  setPayWay,
}: {
  payWay: { btn1: boolean; btn2: boolean };
  setPayWay: React.Dispatch<
    React.SetStateAction<{ btn1: boolean; btn2: boolean }>
  >;
}) {
  return (
    <PayWrap>
      <p className="bold_text">결제 수단을 선택해주세요</p>
      <div className="buttonWrapper">
        <button
          type="button"
          className={payWay.btn1 ? "true_btn" : "false_btn"}
          onClick={() => setPayWay({ btn1: true, btn2: false })}
        >
          현금
        </button>
        <Button
          type="button"
          className={payWay.btn2 ? "true_btn" : "false_btn"}
          onClick={() => setPayWay({ btn1: false, btn2: true })}
        >
          현금 + 할부
        </Button>
      </div>
      <ul style={{ listStyle: "circle" }}>
        {payWay.btn1 && <li>이전비는 차액 발생 시 계좌로 환급해드립니다.</li>}
        {payWay.btn2 && (
          <>
            <li>
              차량비용만 할부 이용이 가능합니다.
              <p>차량비용 이외의 금액은 계좌이체로 결제 진행됩니다.</p>
            </li>
            <li>
              최대대출한도는 차량금액으로 설정 됩니다. <br /> 상담 시 대출
              금액을 설정해주세요
            </li>
          </>
        )}
      </ul>
    </PayWrap>
  );
}

export default Pay;
