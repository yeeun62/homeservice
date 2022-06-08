import styled from "styled-components";
import { useState } from "react";
import { RegistTitle, Tooltip } from "../../styles/recycle";

const PriceWrap = styled.div<{ tooltip: boolean }>`
  padding-top: 16px;
  overflow: visible;
  padding-bottom: 40px;
  border-top: 1px dashed #c4c4c4;

  .price_ul {
    .underline {
      width: 100%;
      height: 2px;
      background: #d9d9d9;
    }

    li {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      .price_list_title {
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        letter-spacing: -0.02em;
        color: #707070;
      }

      .price_list_value {
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
            display: flex;
            align-items: center;

            img {
              width: 15px;
              height: 15px;
              margin-left: 5px;
            }

            .main_tooltip {
              z-index: 100;
              position: absolute;
              top: 26px;
              left: 26px;
              opacity: ${(props) => (props.tooltip ? "1" : "0")};
              visibility: ${(props) => (props.tooltip ? "" : "hidden")};
              transition: ${(props) =>
                props.tooltip
                  ? "opacity 700ms"
                  : "opacity 500ms , visibility 500ms"};
            }
          }
        }

        .more_price_value {
          color: #707070;
        }
      }
    }

    .total_cost {
      margin-top: 16px;
      margin-bottom: 26px;

      span {
        color: #555555;
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
    margin-left: 10px;

    li {
      white-space: pre-line;
      display: block;
      list-style-position: inside;
      text-indent: -15px;
      font-weight: 400;
      font-size: 11px;
      line-height: 20px;
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

    .price_ul {
      li {
        .more_price {
          li {
            .more_price_title {
              img {
                width: 17px;
                height: 17px;
                margin-left: 8px;
              }

              .main_tooltip {
                top: 27px;
                left: 30px;
              }
            }
          }
        }
      }
    }
  }
`;

function PriceInfo({ data, priceData, priceTxt, tooltip, setTooltip }: any) {
  const [priceOpen, setPriceOpen] = useState<boolean>(false);

  let { releaseDt, sellPrice } = data.simpleCar;
  const {
    acquisitionTax,
    carCost,
    discountBond,
    tax1Cost,
    tax2Cost,
    numberPlateCost,
    sellingCost,
    transferCost,
    homeserviceFee,
    homeserviceFeeDisplay,
  } = priceData;

  // 이전비
  let transfer =
    acquisitionTax + discountBond + tax1Cost + tax2Cost + numberPlateCost;

  // 부대비용
  let management =
    acquisitionTax +
    discountBond +
    tax1Cost +
    tax2Cost +
    numberPlateCost +
    sellingCost;

  // 예상합계
  let totalPrice = carCost + homeserviceFee + management + transferCost;

  const addComma = (data: any) => {
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  releaseDt = `${releaseDt.slice(2, 4)}년${releaseDt.slice(4, 6)}월`;
  sellPrice = addComma(String(sellPrice) + "0000");

  return (
    <PriceWrap tooltip={tooltip}>
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
              <span className="price_list_value fake_price">
                {addComma(homeserviceFeeDisplay)}원
              </span>
              <span className="price_list_value">
                {addComma(homeserviceFee)}원
              </span>
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
            <span className="price_list_value">{`${addComma(
              management
            )}원`}</span>
            <ul
              className="more_price"
              style={{ display: priceOpen ? "block" : "none" }}
            >
              <li style={{ marginBottom: "3px" }}>
                <p className="more_price_title">ㄴ이전비</p>
                <p className="more_price_value">{addComma(transfer)}원</p>
              </li>
              <li style={{ marginBottom: "0px" }}>
                <div className="more_price_title">
                  <span style={{ color: "#a7a7a7" }}>ㄴ관리비용(매도비)</span>
                  <img
                    src="./img/w_icon_question_medium_gray.svg"
                    alt="물음표"
                    onClick={(e) => {
                      setTooltip(!tooltip);
                      e.stopPropagation();
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <Tooltip className="main_tooltip">
                    매도비는 실제와 다를 수 있습니다.
                  </Tooltip>
                </div>
                <p className="more_price_value">330,000원</p>
              </li>
            </ul>
          </li>
          <li>
            <p className="price_list_title">배송비(VAT 별도)</p>
            <span className="price_list_value">44,000~159,000원</span>
          </li>
          <div className="underline"></div>
          <li className="total_cost">
            <span>예상 합계</span>
            <span>{`${addComma(totalPrice)}원`}</span>
          </li>
        </ul>
      </div>
      <ul className="list_style">
        {priceTxt.map((el: string, i: number) => {
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
