import styled from "styled-components";
import { MainBtn, RegistTitle } from "../../styles/recycle";

const PayWrap = styled.div`
  padding-bottom: 32px;
  overflow: visible;

  div {
    display: flex;
  }

  ul {
    .pay_li {
      margin-bottom: 100px;
    }

    li {
      font-family: "Poppins";
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

      div {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: #939393;
        position: absolute;
        left: 0;
        top: 5px;
      }
    }

    @media screen and (min-width: 750px) {
      .pay_li {
        margin-bottom: 140px;
      }

      li {
        font-size: 13px;
      }
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
      <RegistTitle>결제 수단을 선택해주세요</RegistTitle>
      <div>
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
      <ul>
        {payWay.btn1 && (
          <li className="pay_li">
            <div></div>결제를 위한 이체 한도를 미리 확인해 주세요.
          </li>
        )}
        {payWay.btn2 && (
          <>
            <li>
              <div></div>
              차량비용만 할부 이용이 가능합니다.
              <p>차량비용 이외의 금액은 계좌이체로 결제 진행됩니다.</p>
            </li>
            <li className="pay_li">
              <div></div>
              최대대출한도는 차량금액으로 설정 됩니다. <br /> 상담 시 대출
              금액을 설정해주세요.
            </li>
          </>
        )}
      </ul>
    </PayWrap>
  );
}

export default Pay;
