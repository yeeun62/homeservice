import React from "react";
import styled from "styled-components";
import { MainBtn } from "../../styles/recycle";

const PayWrap = styled.div`
  p {
    margin-bottom: 24px;
  }

  .buttonWrapper {
    display: flex;
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
        <MainBtn
          type="button"
          backgrondColor={`${payWay.btn1 ? "rgba(7, 64, 228, 0.03)" : "#fff"}`}
          border={`${
            payWay.btn1
              ? "1px solid rgba(7, 64, 228, 0.1)"
              : "1px solid #ededed"
          }`}
          color={`${payWay.btn1 ? "#0740E4" : "#707070"}`}
          activat={true}
          onClick={() => setPayWay({ btn1: true, btn2: false })}
          style={{ marginRight: "8px" }}
        >
          현금
        </MainBtn>
        <MainBtn
          type="button"
          backgrondColor={`${payWay.btn2 ? "rgba(7, 64, 228, 0.03)" : "#fff"}`}
          border={`${
            payWay.btn2
              ? "1px solid rgba(7, 64, 228, 0.1)"
              : "1px solid #ededed"
          }`}
          color={`${payWay.btn2 ? "#0740E4" : "#707070"}`}
          activat={true}
          onClick={() => setPayWay({ btn1: false, btn2: true })}
        >
          현금 + 할부
        </MainBtn>
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
