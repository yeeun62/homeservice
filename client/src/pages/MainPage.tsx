import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { PageWrap, MainBtn, Footer } from "../styles/recycle";
import Introduce from "../components/main/Introduce";
import Visual from "../components/main/Visual";
import PriceInfo from "../components/main/PriceInfo";
import Pay from "../components/main/Pay";
import { StorageType } from "../App";
import { useNavigate } from "react-router-dom";

function MainPage({
  data,
  setLocalStep,
  storageData,
  setStorageData,
  introduceMSG,
  priceData,
  priceTxt,
}: {
  data: any;
  setLocalStep: React.Dispatch<React.SetStateAction<string>>;
  storageData: StorageType;
  setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
  introduceMSG: string;
  priceData: any;
  priceTxt: any;
}) {
  const [tooltip, setTooltip] = useState<any>(undefined);

  const scroll: any = useRef(null);
  const navigate = useNavigate();

  const scrollDown = () => {
    scroll.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    if (storageData.payment_cd === "") {
      return;
    } else {
      scrollDown();
    }
  }, [storageData]);

  function setStorage(): void {
    if (storageData.payment_cd) {
      localStorage.setItem(storageData.sellNo, JSON.stringify(storageData));
      localStorage.setItem("localStep", "0");
      setLocalStep("0");
      navigate(`/regist${window.location.search}`);
    } else return;
  }

  return (
    <div ref={scroll} onClick={() => setTooltip(false)}>
      <Header data={data} />
      <Introduce introduceMSG={introduceMSG} />
      <PageWrap>
        <div>
          <Visual data={data} visualTitle="안전하게 배송해드리겠습니다" />
          <PriceInfo
            tooltip={tooltip}
            setTooltip={setTooltip}
            data={data}
            priceData={priceData}
            priceTxt={priceTxt}
          />
          <Pay setStorageData={setStorageData} storageData={storageData} />
        </div>
      </PageWrap>
      <Footer>
        <div>
          <MainBtn
            backgrondColor="#0740E4"
            color="#fff"
            border="none"
            activate={Boolean(storageData.payment_cd)}
            style={{ fontWeight: "700" }}
            onClick={setStorage}
          >
            다음
          </MainBtn>
        </div>
      </Footer>
    </div>
  );
}

export default MainPage;
