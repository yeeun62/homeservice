import styled from "styled-components";

const VisualWrap = styled.div`
  padding-bottom: 40px;

  .visual_title {
    margin: 24px 0;

    span {
      font-weight: 400;
      font-size: 13px;
      line-height: 19px;
      letter-spacing: -0.02em;
      color: #555555;
      display: block;
      margin-top: 8px;
    }
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
      <p className="bold_text visual_title">
        {visualTitle} {visualSpan && <span>{visualSpan}</span>}
      </p>
      <div className="info_wrap">
        <img src={image} alt={desc5} />
        <div className="info_wrap_right">
          <div className="span_wrapper">
            <span>{desc1}</span>
            <span>{desc2}</span>
            <span>{desc3}</span>
            <span>{desc4}원</span>
          </div>
          <p className="bold_text name">{desc5}</p>
          <p className="price">{price}원</p>
        </div>
      </div>
    </VisualWrap>
  );
}

export default Visual;
