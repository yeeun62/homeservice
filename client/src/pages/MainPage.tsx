import { useState, useRef, useEffect } from "react";
import { PageWrap, MainBtn, Footer } from "../styles/recycle";
import Introduce from "../components/main/Introduce";
import Visual from "../components/main/Visual";
import PriceInfo from "../components/main/PriceInfo";
import Pay from "../components/main/Pay";
import { StorageType } from "../App";

function MainPage({
    data,
    setLocalStep,
    storageData,
    setStorageData,
    introduceMSG,
    priceData,
    priceTxt,
    setPage,
}: {
    data: any;
    setLocalStep: React.Dispatch<React.SetStateAction<number>>;
    storageData: StorageType;
    setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
    introduceMSG: string;
    priceData: any;
    priceTxt: any;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
    const [tooltip, setTooltip] = useState<boolean>(false);

    const scroll: any = useRef(null);

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
    }, [storageData.payment_cd]);

    function setStorage(): void {
        if (storageData.payment_cd) {
            setLocalStep(0);
            setPage(1);
        } else return;
    }

    return (
        <div ref={scroll} onClick={() => setTooltip(false)}>
            <Introduce introduceMSG={introduceMSG} />
            <PageWrap>
                <div>
                    <Visual
                        data={data}
                        visualTitle="안전하게 배송해 드리겠습니다"
                        bottom={false}
                    />
                    <PriceInfo
                        tooltip={tooltip}
                        setTooltip={setTooltip}
                        data={data}
                        priceData={priceData}
                        priceTxt={priceTxt}
                    />
                    <Pay
                        setStorageData={setStorageData}
                        storageData={storageData}
                        priceTxt={{
                            cash: priceTxt.cash,
                            installment: priceTxt.installment,
                        }}
                    />
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
