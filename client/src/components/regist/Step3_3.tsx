import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { RegistTitle } from "../../styles/recycle";
import StepBtn from "./StepBtn";

const Step3_1Wrap = styled.div``;

function Step3_3() {
  return (
    <Step3_1Wrap>
      <RegistTitle>명의자 유형을 선택해 주세요</RegistTitle>
      <div>법인사업자</div>
    </Step3_1Wrap>
  );
}

export default Step3_3;
