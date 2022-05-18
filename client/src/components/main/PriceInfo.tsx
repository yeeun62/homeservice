import styled from "styled-components";
import { useState } from "react";
import { RegistTitle, Tooltip } from "../../styles/recycle";

const PriceWrap = styled.div`
  padding-top: 16px;
  overflow: visible;
  padding-bottom: 40px;
  border-top: 1px dashed #c4c4c4;

  .price_ul {
    padding: 0 8px;

    .underline {
      width: 100%;
      height: 2px;
      background: #d9d9d9;
    }

    li {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-bottom: 17px;

      .price_list_title {
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        letter-spacing: -0.02em;
        color: #707070;
      }

      .price_list_value {
        font-family: "Poppins";
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        letter-spacing: -0.02em;
        color: #101010;
      }

      .fake_price {
        margin-right: 6px;
        color: #c2c2c2;
        text-decoration: line-through;
      }

      .price_arrow {
        position: absolute;
        top: 30%;
        width: 12px;
        height: 12px;
        margin-left: 7px;
      }

      .more_price {
        display: block;
        position: absolute;
        top: 31px;
        width: 100%;
        letter-spacing: -0.02em;
        font-weight: 400;
        font-size: 13px;

        li {
          .more_price_title {
            width: 100%;
            color: #a7a7a7;
            position: relative;

            img {
              width: 16px;
              height: 16px;
              position: absolute;
              top: 2px;
              left: 104px;
            }

            .main_tooltip {
              z-index: 100;
              position: absolute;
              top: 150%;
              left: 20px;
            }
          }
        }

        .more_price_value {
          color: #707070;
        }
      }
    }

    .total_cost {
      padding: 0 8px;
      margin-top: 18px;
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

  .list_style {
    padding: 0 16px;

    li {
      display: block;
      list-style-position: inside;
      text-indent: -15px;
      font-weight: 400;
      font-size: 11px;
      line-height: 16px;
      letter-spacing: -0.02em;
      color: #939393;
      margin-bottom: 6px;

      div {
        width: 3px;
        height: 3px;
        background-color: #939393;
        border-radius: 50%;
        display: inline-block;
        margin: 3px 6px;
      }
    }
  }

  @media screen and (min-width: 750px) {
    .list_style {
      li {
        font-size: 13px;
      }
    }
  }
`;

function PriceInfo({ data }: any) {
  let { carNo, fuel, imageUrl, mileage, releaseDt, sellNo, sellPrice } =
    data.simpleCar;
  const { gradeDetailNm, gradeNm, makerNm, modelDetailNm, modelNm } =
    data.simpleCar.trim;

  releaseDt = `${releaseDt.slice(2, 4)}년${releaseDt.slice(4, 6)}월`;
  mileage = mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  sellPrice = String(sellPrice) + "0000";
  sellPrice = sellPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const [priceOpen, setPriceOpen] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<boolean>(false);

  return (
    <PriceWrap>
      <div>
        <RegistTitle>구매 확정 시 필요한 금액이에요</RegistTitle>
        <ul className="price_ul">
          <li>
            <p className="price_list_title">차량 가격</p>
            <p className="price_list_value">{sellPrice}원</p>
          </li>
          <li>
            <p className="price_list_title">홈서비스 이용료</p>
            <div>
              <span className="price_list_value fake_price">299,000원</span>
              <span className="price_list_value">0원</span>
            </div>
          </li>
          <li
            style={{
              marginBottom: priceOpen ? "67px" : "17px",
            }}
          >
            <p
              className="price_list_title"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => setPriceOpen(!priceOpen)}
            >
              부대비용
              <img
                src="./img/w_icon_down_large.svg"
                alt="부대비용"
                className="price_arrow"
                style={priceOpen ? { transform: "rotate(180deg)" } : {}}
              />
            </p>
            <span className="price_list_value">1,530,000원</span>
            <ul
              className="more_price"
              style={{ display: priceOpen ? "block" : "none" }}
            >
              <li style={{ marginBottom: "3px" }}>
                <p className="more_price_title">ㄴ이전비</p>
                <p className="more_price_value">1,200,000원</p>
              </li>
              <li style={{ marginBottom: "0px" }}>
                <div className="more_price_title">
                  <span style={{ color: "#a7a7a7" }}>ㄴ관리비용(매도비)</span>
                  <img
                    src="./img/w_icon_question_medium_gray.svg"
                    alt="물음표"
                    onClick={() => setTooltip(!tooltip)}
                    style={{ cursor: "pointer" }}
                  />
                  {tooltip && (
                    <Tooltip className="main_tooltip">
                      <div></div>매도비는 실제와 다를 수 있습니다.
                    </Tooltip>
                  )}
                </div>
                <p className="more_price_value">330,000원</p>
              </li>
            </ul>
          </li>
          <li>
            <p className="price_list_title">배송비</p>
            <span className="price_list_value">44,000~159,000원</span>
          </li>
          <div className="underline"></div>
          <li className="total_cost">
            <span>예상 합계</span>
            <span>15,994,000원</span>
          </li>
        </ul>
      </div>
      <ul className="list_style">
        {[
          "견적금액은 배송비에 의해 변동될 수 있습니다. (배송비 최대금액 165,000원으로 계산 선반영되었습니다.)",
          "배송비는 차량 출발지와 도착지 거리에 따라 책정되며, 상담단계에서 확정됩니다.",
          "이전비는 차액 발생 시 계좌로 환급해드립니다.",
        ].map((el: string, i: number) => {
          return (
            <li key={el}>
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
