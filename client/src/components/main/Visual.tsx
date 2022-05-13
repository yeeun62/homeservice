import styled from "styled-components";
import { RegistTitle } from "../../styles/recycle";

const VisualWrap = styled.div`
  padding-bottom: 40px;

  .complete_title {
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #555555;
    display: block;
    margin-top: 8px;
  }

  img {
    width: 100%;
    margin-bottom: 8px;
  }

  .span_wrapper {
    display: flex;
  }

  span {
    font-family: "Poppins";
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
    top: 6px;
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

  .price {
    font-family: "Poppins";
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.02em;
  }

  /* pc */
  @media screen and (min-width: 750px) {
    .info_wrap {
      display: flex;

      img {
        width: 34%;
        margin-bottom: 0;
      }

      .info_wrap_right {
        width: 55%;
        padding: 16px 0 8px 24px;
        position: relative;

        .price {
          position: absolute;
          bottom: 8px;
        }
      }
    }
  }
`;

function Visual({ data, visualTitle, visualSpan }: any) {
  const { desc1, desc2, desc3, desc4, desc5, price, image } = data;

  return (
    <VisualWrap>
      <RegistTitle>
        {visualTitle}
        {visualSpan && <span className="complete_title">{visualSpan}</span>}
      </RegistTitle>
      <div className="info_wrap">
        <img src={image} alt={desc5} />
        <div className="info_wrap_right">
          <div className="span_wrapper">
            <span>{desc1}</span>
            <span>{desc2}</span>
            <span>{desc3}</span>
            <span>{desc4}원</span>
          </div>
          <RegistTitle className="name">{desc5}</RegistTitle>
          <p className="price">{price}원</p>
        </div>
      </div>
    </VisualWrap>
  );
}

export default Visual;
