import styled, { css } from "styled-components";

export const Button = styled.button`
  background-color: #0740e4;
  border-radius: 5px;
  color: #fff;
  border: none;
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-weight: 700;
  width: auto;
`;

export const Padding = styled.div`
  /* mobile */
  @media screen and (max-width: 749px) {
    padding: 0 16px 16px 16px;
  }

  /* pc */
  @media screen and (min-width: 750px) {
    padding: 0 32px;
  }
`;

export const stickTop = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  display: flex;
  align-items: center;
  height: 56px;
`;

export const RegistTitle = styled.div`
  margin: 24px 0px;
  font-weight: 700;
  font-size: 17px;
  line-height: 25px;
  letter-spacing: -0.02em;
`;

export const RegistSubBtn = styled.button<{
  backgrondColor: string;
}>`
  background-color: ${(props) => props.backgrondColor};
  width: 106px;
  height: 40px;
  padding: 10px 16px;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -2%;
`;

export const MainBtn = styled.button<{
  backgrondColor: string;
  color: string;
  border: string;
  activat: boolean;
}>`
  background-color: ${(props) => props.backgrondColor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  width: 100%;
  height: 52px;
  border-radius: 5px;

  ${(props) =>
    !props.activat &&
    css`
      opacity: 30%;
    `}
`;

export const RegistForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    margin-bottom: 32px;

    p {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: -2%;
      margin-bottom: 2px;
      color: #a7a7a7;
      display: flex;
      align-items: center;

      img {
        width: 18px;
        height: 18px;
        margin-left: 5px;
      }
    }

    .input_div {
      position: relative;
      height: 40px;

      input {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 24px;
        border: none;
        border-bottom: 2px solid #ededed;
        padding-bottom: 6px;
        color: #101010;
        font-weight: 700;
        font-size: 17px;
        line-height: 25px;

        ::placeholder {
          font-size: 15px;
          font-weight: 400;
          color: #939393;
          letter-spacing: -0.02em;
          vertical-align: bottom;
        }

        .input_margin_top {
          margin-top: 24px;
        }
      }
    }

    .flex_check {
      display: flex;
      justify-content: space-between;

      div {
        display: flex;

        img {
          width: 16px;
          height: 16px;
        }

        p {
          color: #707070;
          font-weight: 400;
          font-size: 13px;
          line-height: 19px;
          letter-spacing: -0.02em;
          margin-left: 4px;
        }
      }
    }

    .flex_form {
      display: flex;
      justify-content: space-between;

      div {
        margin-right: 8px;
        width: Calc(100% - 114px);
      }
    }

    .certi_warning {
      color: #ff673e;
      margin-top: 4px;
      font-size: 11px;
      font-weight: 400;
    }

    .valid_time {
      width: 40px;
      height: 23px;
      position: absolute;
      bottom: 0;
      right: 0;
      font-family: "Poppins";
      font-size: 15px;
      font-weight: 400;
      color: #707070;
      line-height: 23px;
      letter-spacing: -0.02em;
      margin-bottom: 3px;
    }
  }

  .check_bottom {
    display: flex;

    img {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }

    p {
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      letter-spacing: -0.02em;
      color: #707070;
    }
  }

  .step_info {
    width: 100%;
    display: flex;
    flex-direction: row;

    .info_number {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: #101010;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
      margin-bottom: 12px;

      p {
        color: #fff;
        font-family: "Poppins";
        font-weight: 600;
        font-size: 11px;
      }
    }

    .info_desc {
      display: inline-block;
      font-size: 13px;
      font-weight: 700;
      line-height: 19px;
      color: #101010;
    }
  }

  .input_focus {
    color: #101010;
    border-color: #3c3c3c;
  }
`;
