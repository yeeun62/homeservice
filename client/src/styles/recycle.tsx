import styled, { css } from "styled-components";

export const RegistTitle = styled.div`
  margin: 24px 0px;
  font-weight: 700;
  font-size: 17px;
  line-height: 25px;
  letter-spacing: -0.02em;

  @media screen and (min-width: 750px) {
    font-size: 20px;
    line-height: 29px;
  }
`;

export const RegistSubBtn = styled.button<{
  backgrondColor: string;
}>`
  @media screen and (min-width: 750px) {
    width: 117px;
    height: 43px;
    font-size: 15px;
  }

  background-color: ${(props) => props.backgrondColor};
  width: 106px;
  height: 40px;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -2%;
`;

export const MainBtn = styled.button<{
  backgrondColor?: string;
  color?: string;
  border?: string;
  activate?: boolean;
  pay?: boolean;
}>`
  ${(props) =>
    props.pay
      ? css`
          background-color: rgba(7, 64, 228, 0.03);
          color: #0740e4;
          border: 1px solid rgba(7, 64, 228, 0.1);
        `
      : css`
          background-color: #fff;
          color: #707070;
          border: 1px solid #ededed;
        `}

  background-color: ${(props) => props.backgrondColor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  width: 100%;
  height: 52px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  /* main page */

  &:hover {
    border: ${(props) =>
      props.border === "1px solid #ededed" || props.pay === false
        ? "1px solid #c2c2c2"
        : props.border === "1px solid rgba(23, 23, 24, 0.1)" || props.pay
        ? "1px solid rgba(7, 64, 228, 0.3)"
        : "1px solid" + props.border};
  }

  ${(props) =>
    !props.activate &&
    css`
      opacity: 30%;
    `}
`;

export const RegistForm = styled.form<{ tooltip?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and( min-width: 750px ) {
    label {
      p {
        font-size: 15px;
        line-height: 22px;
      }
    }
  }

  label {
    margin-bottom: 32px;

    .tooltip {
      position: absolute;
      z-index: 100;
      top: 26px;
      left: -9px;
      opacity: ${(props) => (props.tooltip ? "1" : "0")};
      visibility: ${(props) => (props.tooltip ? "" : "hidden")};
      transition: ${(props) =>
        props.tooltip ? "opacity 700ms" : "opacity 500ms , visibility 500ms"};
    }

    :focus-within {
      p {
        color: #101010;
      }

      .certi_warning {
        color: #ff673e;
      }

      .valid_time {
        color: #707070;
      }
    }

    p {
      font-size: 13px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.02em;
      margin-bottom: 2px;
      color: #a7a7a7;
      display: flex;

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
        height: 30px;
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
          padding-left: 2px;
        }

        :focus {
          border-color: #3c3c3c;
        }

        .input_margin_top {
          margin-top: 24px;
        }
      }

      .name_input {
        -webkit-ime-mode: active;
        -moz-ime-mode: active;
        -ms-ime-mode: active;
        ime-mode: active;
      }
      // 한글 자동변환 위한 부분인데 적용되지 않아서 다시 확인해보기

      img {
        position: absolute;
        right: 2%;
        top: 30%;
      }
    }

    .flex_check {
      display: flex;
      justify-content: space-between;

      div {
        display: flex;
        cursor: pointer;

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

export const PageWrap = styled.div`
  width: 100%;

  @media screen and (max-width: 749px) {
    margin-bottom: 100px;
    padding: 0px 16px;
  }

  @media screen and (min-width: 749px) {
    margin-bottom: 140px;
    padding: 0px 32px;
  }
`;

export const Footer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #fff;
  z-index: 100;
  max-width: 1200px;

  div {
    display: flex;
    align-items: flex-end;
  }

  @media screen and (max-width: 749px) {
    height: 100px;
    padding: 0px 16px;

    div {
      height: 100px;

      button {
        height: 52px;
        margin-bottom: 16px;
      }
    }
  }

  @media screen and (min-width: 749px) {
    height: 140px;
    padding: 0px 32px;

    div {
      height: 140px;

      button {
        height: 60px;
        margin-bottom: 32px;
      }
    }
  }
`;

export const Tooltip = styled.div`
  padding: 6px 16px;
  background-color: #3c3c3c;
  border-radius: 5px;
  color: #fff;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: -0.02em;
  position: absolute;
  animation: fadein 1s;

  ::after {
    content: "";
    width: 0px;
    height: 0px;
    border-bottom: calc(4px * 1.732) solid #3c3c3c;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position: absolute;
    top: 1%;
    left: 50%;
    transform: translate(-50%, -100%);
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const PublicCheck = styled.div`
  margin-top: 68px;

  div {
    display: flex;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #707070;
  }
`;
