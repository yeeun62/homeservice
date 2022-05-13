import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
import { RegistTitle } from "../../styles/recycle";

const PriceWrap = styled.div`
  padding-top: 20px;
  overflow: visible;
  padding-bottom: 64px;
  border-top: 1px dashed #c4c4c4;

  .bold_text {
    margin-bottom: 24px;
  }

  ul {
    width: 100%;
    padding: 0 8px;

    .price_list,
    li {
      font-family: "Noto Sans KR";
      font-weight: 400;
      font-size: 15px;
      line-height: 22px;
      color: #707070;
    }

    .transfer_cost {
      padding-bottom: 16px;
      border-bottom: 2px solid #d9d9d9;
    }

    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 17px;

      span {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        letter-spacing: -0.02em;
        color: #101010;
      }

      .span_wrap {
        display: flex;
        justify-content: end;
        align-items: center;

        .fake_price {
          margin-right: 6px;
          color: #c2c2c2;
          text-decoration: line-through;
        }
      }

      .price3 {
        width: 16px;
        height: 16px;
        margin-left: 7px;
      }
    }

    .cost_list {
      margin-bottom: 0;
    }

    .inner_ul {
      /* -webkit-animation-name: fade_in_down;
      animation-name: fade_in_down;
      animation-duration: 0.5s; */

      height: 41px;
      margin-bottom: 17px;
      padding: 0;

      li,
      li span,
      li div {
        color: #a7a7a7;
        font-size: 13px;
        line-height: 19px;
        margin-bottom: 3px;
      }

      .tooltip_wrap {
        display: flex;
      }

      .question {
        width: 16px;
        height: 16px;
        margin-left: 5px;
      }
    }
    /* 
    .fadeout {
      -webkit-animation-name: fade_out_up;
      animation-name: fade_out_up;
      animation-duration: 0.5s;
    } */

    /* @keyframes fade_in_down {
      from {
        opacity: 0;
        -webkit-transform: translatey(-30px);
        -moz-transform: translatey(-30px);
        -o-transform: translatey(-30px);
        transform: translatey(-30px);
      }

      to {
        opacity: 1;
        -webkit-transform: translatey(0);
        -moz-transform: translatey(0);
        -o-transform: translatey(0);
        transform: translatey(0);
        display: none;
      }
    }

    @keyframes fade_out_up {
      from {
        opacity: 1;
        -webkit-transform: translatey(0);
        -moz-transform: translatey(0);
        -o-transform: translatey(0);
        transform: translatey(0);
      }

      to {
        opacity: 0;
        -webkit-transform: translatey(-30px);
        -moz-transform: translatey(-30px);
        -o-transform: translatey(-30px);
        transform: translatey(-30px);
      }
    } */

    .total_cost {
      padding: 0 8px;
      margin-bottom: 26px;

      span {
        color: #555555;
        font-family: "Noto Sans KR";
        font-weight: 700;
        font-size: 15px;
        line-height: 22px;
      }

      span:nth-child(2) {
        color: #ff673e;
        font-weight: 600;
        font-size: 17px;
      }
    }
  }

  ul.list_style {
    li {
      display: block;
      list-style-position: inside;
      text-indent: -15px;

      div {
        width: 3px;
        height: 3px;
        background-color: #939393;
        border-radius: 50%;
        display: inline-block;
        margin: 3px 6px;
      }

      font-weight: 400;
      font-size: 11px;
      line-height: 16px;
      letter-spacing: -0.02em;
      color: #939393;
      margin-bottom: 6px;
    }
  }
`;

function PriceInfo({ price, desc6 }: any) {
  const [open, setOpen] = useState(true);

  return (
    <PriceWrap>
      <div>
        <RegistTitle>구매 확정 시 필요한 금액이에요</RegistTitle>
        <ul className="ul1">
          <li key="price1" className="price_list ">
            차량 가격 <span>{price}원</span>
          </li>
          <li key="price2" className="price_list">
            홈서비스 이용료
            <div className="span_wrap">
              <span className="fake_price">299,000원</span>
              <span>0원</span>
            </div>
          </li>
          <li key="price3" className="price_list cost_list">
            <div className="span_wrap" onClick={() => setOpen(!open)}>
              <p className="price_list">부대비용</p>
              <img
                src="./img/w_icon_down_large.svg"
                alt="부대비용"
                className="price3"
                style={open ? { transform: "rotate(180deg)" } : {}}
              />
            </div>
            <span>1,530,000원</span>
          </li>
          <ul
            className={"inner_ul " + (open ? "fadein" : "fadeout")}
            style={{ display: open ? "block" : "none" }}
          >
            <li key="이전비">
              ㄴ이전비 <span>1,200,000원</span>
            </li>
            <li key="매도비">
              <div className="tooltip_wrap">
                ㄴ관리비용(매도비)
                <img
                  src="./img/w_icon_question_medium_gray.svg"
                  alt="물음표"
                  className="question"
                  data-tip="매도비는 실제와 다를 수 있습니다."
                  data-place="bottom"
                />
              </div>
              <span>333,000원</span>
            </li>
            <ReactTooltip offset={{ top: 0, left: 0 }} />
          </ul>
          <li key="price4" className="transfer_cost">
            배송비 <span>4,000~165,000원</span>
          </li>
          <li key="price5" className="total_cost">
            <span className="price_list">예상 합계</span>{" "}
            <span>15,994,000원</span>
          </li>
        </ul>
      </div>
      <ul className="list_style">
        {desc6.map((el: string, i: number) => {
          return (
            <li key={i + "key"} className="list_li">
              <div></div>
              {el}
            </li>
          );
        })}
      </ul>
    </PriceWrap>
  );
}

export default PriceInfo;
