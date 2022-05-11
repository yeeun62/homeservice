import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Padding } from "../styles/recycle";
import Introduce from "../components/main/Introduce";
import Visual from "../components/main/Visual";
import PriceInfo from "../components/main/PriceInfo";
import Pay from "../components/main/Pay";

const MainPageWrap = styled.div`
  /* common */
  .topDesc {
    height: 40px;
    background-color: #0740e4;
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    font-family: "Noto Sans KR";
    text-align: center;
    letter-spacing: -0.02em;
    padding: 24px 17px;
  }

  .imgWrap {
    img {
      width: 328px;
      height: 246px;
      margin-bottom: 8px;
    }

    div {
      display: flex;
    }

    span {
      font-family: "Poppins";
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      position: relative;
      margin-right: 10px;
    }

    span::after {
      content: "";
      display: inline-block;
      background-color: #c2c2c2;
      width: 1px;
      height: 5px;
      position: absolute;
      top: 5px;
      right: -5px;
    }

    span:last-child::after {
      display: none;
    }

    .price {
      font-family: "Poppins";
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      letter-spacing: -0.02em;
    }

    padding-bottom: 20px;
    border-bottom: 1px dashed #c4c4c4;
  }

  .priceWrap {
    padding-top: 20px;

    .ul {
      width: 100%;
      padding: 0;

      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-family: "Noto Sans KR";
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        color: #707070;

        span {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
          text-align: right;
          letter-spacing: -0.02em;
          color: #101010;
        }
      }
    }

    .buttonWrapper {
      width: 100%;

      .cashBtn,
      .bothBtn {
        width: 50%;
      }
    }
  }

  /* mobile */
  @media screen and (max-width: 749px) {
    .padding {
      padding: 7px 16px 16px 16px;
    }
  }

  /* pc */
  @media screen and (min-width: 750px) {
  }
`;

function MainPage({ data, step }: { data: any; step: number }) {
  return (
    <MainPageWrap>
      <Header step={step} />
      <Introduce topDesc={data.topDesc} />
      <Padding>
        <Visual data={data} />
        <PriceInfo price={data.price} desc6={data.desc6} />
        <Pay />
        <Link to="/page2">
          <Button type="button">다음</Button>
        </Link>
      </Padding>
    </MainPageWrap>
  );
}

export default MainPage;
