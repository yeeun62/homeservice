import styled from "styled-components";
import { useState } from "react";

import Header from "../components/Header";
import { Padding } from "../styles/recycle";
import Introduce from "../components/main/Introduce";
import Visual from "../components/main/Visual";
import PriceInfo from "../components/main/PriceInfo";
import Pay from "../components/main/Pay";
import BottomBtn from "../components/BottomBtn";

const MainPageWrap = styled.div`
  /* common */

  /* mobile */
  @media screen and (max-width: 749px) {
  }

  /* pc */
  @media screen and (min-width: 750px) {
  }
`;

function MainPage({ data }: { data: any }) {
  const [payWay, setPayWay] = useState({ btn1: false, btn2: false });

  return (
    <MainPageWrap>
      <Header />
      <Introduce topDesc={data.topDesc} />
      <Padding>
        <Visual data={data} visualTitle="안전하게 배송해드리겠습니다" />
        <PriceInfo price={data.price} desc6={data.desc6} />
        <Pay payWay={payWay} setPayWay={setPayWay} />
        <BottomBtn btnContent="다음" path="/regist" />
      </Padding>
    </MainPageWrap>
  );
}

export default MainPage;
