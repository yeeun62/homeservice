import { useEffect } from "react";
import styled, { css } from "styled-components";
import { RegistTitle } from "../../styles/recycle";
import { StorageType } from "../../App";
import { ActiveProps } from "../../pages/Page";

const RegistTypeBtn = styled.button<{ choice: boolean }>`
  @media screen and (min-width: 750px) {
    height: 57px;
    font-weight: 700;
    font-size: 17px;
  }

  width: 100%;
  height: 54px;
  border-radius: 5px;
  text-align: left;
  padding-left: 26px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 16px;
  background-color: #fff;
  color: #707070;
  border: 1px solid #ededed;

  ${(props) =>
    props.choice &&
    css`
      background-color: rgba(7, 64, 228, 0.03);
      color: #0740e4;
      border: 1px solid rgba(7, 64, 228, 0.1);
    `}

  &:hover {
    border: ${(props) =>
      props.choice ? "1px solid rgba(7, 64, 228, 0.3)" : "1px solid #c2c2c2"};
  }
`;

function Step2({
  setActivate,
  setStorageData,
  storageData,
  phoneAuth,
  setPhoneAuth,
}: ActiveProps) {
  const registType = ["개인", "개인사업자", "법인사업자"];

  useEffect(() => {
    if (storageData.step2.nominee_cd) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [storageData.step2]);

  // useEffect(() => {
  //   if(setPhoneAuth){

  //   }
  //   console.log(setPhoneAuth);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("phone", storageData.step1.customer_hphone);
  // }, []);

  const storageHandler = (index: number) => {
    setStorageData((storageData) => ({
      ...storageData,
      step2: { index, nominee_cd: `HOME_NOMINEE_00${index - 1}` },
      step3: {
        nominee_name: "",
        nominee_hphone: "",
        nominee_reduction_joint: false,
        address: {
          nominee_address_post: "",
          nominee_address_road: "",
          nominee_address_jibun: "",
          nominee_address: "",
        },
        address2: {
          business_address_post: "",
          business_address_road: "",
          business_address_jibun: "",
          business_address: "",
        },
        business_name: "",
        business_number: "",
        business_email: "",
      },
    }));
    setActivate(true);
  };

  return (
    <>
      <RegistTitle>명의자 유형을 선택해 주세요</RegistTitle>
      {registType.map((type: string, index: number) => (
        <RegistTypeBtn
          key={type}
          choice={storageData.step2.index === index + 2 && true}
          onClick={(e) => {
            storageHandler(index + 2);
            e.currentTarget.blur();
          }}
        >
          {type}
        </RegistTypeBtn>
      ))}
    </>
  );
}

export default Step2;
