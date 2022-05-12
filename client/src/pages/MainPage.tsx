import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { PageWrap } from "../styles/recycle";
import Introduce from "../components/main/Introduce";
import Visual from "../components/main/Visual";
import PriceInfo from "../components/main/PriceInfo";
import Pay from "../components/main/Pay";
import BottomBtn from "../components/BottomBtn";

function MainPage({ data }: { data: any }) {
  const [payWay, setPayWay] = useState({ btn1: false, btn2: false });
  const scroll: any = useRef(null);

  const scrollDown = () => {
    scroll.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    scrollDown();
  }, [payWay]);

  return (
    <>
      <Header />
      <Introduce topDesc={data.topDesc} />
      <PageWrap>
        <div ref={scroll}>
          <Visual data={data} visualTitle="안전하게 배송해드리겠습니다" />
          <PriceInfo price={data.price} desc6={data.desc6} />
          <Pay payWay={payWay} setPayWay={setPayWay} />
        </div>
      </PageWrap>
      <BottomBtn btnContent="다음" path="/regist" />
    </>
  );
}

export default MainPage;
