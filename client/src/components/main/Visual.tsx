import styled from "styled-components";
import { RegistTitle } from "../../styles/recycle";

const VisualWrap = styled.div<{ bottom: boolean }>`
  padding-bottom: ${(p) => (p.bottom ? "16px" : "40px")};

  .complete_title {
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #555555;
    display: block;
    margin-top: 8px;
    white-space: pre-line;
  }

  img {
    width: 100%;
    margin-bottom: 8px;
  }

  .span_wrapper {
    display: flex;
  }

  span {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    margin-right: 12px;
    position: relative;
    overflow: visible;
  }

  span::after {
    content: "";
    display: inline-block;
    background-color: #c2c2c2;
    width: 1px;
    height: 5px;
    position: absolute;
    top: 8px;
    right: -7px;
  }

  span:last-child::after {
    display: none;
  }

  .name {
    margin: 4px 0 9px 0;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 749px) {
      white-space: nowrap;
    }

    @media screen and (min-width: 750px) {
      width: 100%;
      height: 87px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  .price,
  .price span {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.02em;
  }

  .price {
    position: relative;
  }

  .price span {
    font-weight: 700;
    padding-left: 5px;
    position: absolute;
    bottom: 1px;
  }

  /* pc */
  @media screen and (min-width: 750px) {
    .info_wrap {
      display: flex;
      align-items: flex-start;
      align-items: stretch;

      img {
        width: 33.7%;
        margin-bottom: 0;
      }

      .info_wrap_right {
        width: 55%;
        padding: 16px 0 8px 24px;
        min-height: 190px;
        position: relative;

        .price {
          position: absolute;
          bottom: 8px;
        }
      }
    }
  }
`;

function Visual({ data, visualTitle, visualSpan, bottom }: any) {
  let { carNo, fuel, imageUrl, mileage, releaseDt, sellPrice } = data.simpleCar;
  const { makerNm, modelDetailNm, gradeNm, gradeDetailNm } =
    data.simpleCar.trim;

  const addComma = (data: any) => {
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let releaseDtForm = `${releaseDt.slice(2, 4)}년${releaseDt.slice(4, 6)}월`;
  if (String(mileage).length > 7) {
    mileage = "9,999,999";
  } else {
    mileage = addComma(mileage);
  }
  sellPrice = addComma(String(sellPrice) + "0000");

  return (
    <VisualWrap bottom={bottom}>
      <RegistTitle>
        {visualTitle}
        {visualSpan && <span className="complete_title">{visualSpan}</span>}
      </RegistTitle>
      <div className="info_wrap">
        <img src={imageUrl} alt="차량이미지" />
        <div className="info_wrap_right">
          <div className="span_wrapper">
            <span>{releaseDtForm}</span>
            <span>{mileage}km</span>
            <span>{fuel}</span>
            <span>{carNo}</span>
          </div>
          <RegistTitle className="name">{`${makerNm ? makerNm : ""} ${
            modelDetailNm ? modelDetailNm : ""
          } ${gradeNm ? gradeNm : ""} ${
            gradeDetailNm ? gradeDetailNm : ""
          }`}</RegistTitle>
          <p className="price">
            {sellPrice} <span>원</span>
          </p>
        </div>
      </div>
    </VisualWrap>
  );
}

export default Visual;
