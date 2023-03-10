import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import queryString from "query-string";
import "./App.css";
import Page from "./pages/Page";
import LoadingPage from "./pages/LoadingPage";

const AppWrap = styled.div`
    min-width: 360px;
    max-width: 1200px;
    margin: auto;

    @media screen and( max-width: 750px) {
        min-height: 800px;
    }
`;

export interface StorageType {
    sellNo: string;
    payment_cd: string;
    step1: {
        customer_name: string;
        customer_hphone: string;
        phoneValidation: boolean;
    };
    step2: { nominee_cd: string; index: number };
    step3: any;
    step4: {
        bank: { name: string; refund_bank_cd: string };
        refund_accout_name: string;
        refund_accout_number: string;
    };
    step: number;
}

function App() {
    const [step, setStep] = useState<number>(0);
    const [localStep, setLocalStep] = useState<number>(0);
    const [data, setData] = useState<any>();
    const [storageData, setStorageData] = useState<any>();
    const [introduceMSG, setIntroduceMSG] = useState<string>("");
    const [priceData, setPriceData] = useState<any>();
    const [priceTxt, setPriceTxt] = useState<any>();

    let isAlert: boolean = false;

    useEffect(() => {
        const query = queryString.parse(window.location.search);

        if (query.sellNo) {
            axios
                .get(
                    // `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/products/${query.sellNo}`
                    `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_FORSALE}/${query.sellNo}`
                )
                .then((data) => {
                    if (Object.keys(data.data).length) {
                        setData(data.data);
                    } else {
                        if (!isAlert) {
                            isAlert = true;
                            alert(
                                "매물정보가 없어 실패하였습니다. 관리자에 문의하세요."
                            );
                        }
                    }
                })
                .catch((err) => {
                    if (!isAlert) {
                        isAlert = true;
                        alert(
                            "매물정보가 없어 실패하였습니다. 관리자에 문의하세요."
                        );
                    }
                });
        } else {
            if (!isAlert) {
                isAlert = true;
                alert("매물정보가 없어 실패하였습니다. 관리자에 문의하세요.");
            }
        }

        axios
            .get(
                `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/announce/notice`
            )
            .then((msg) => {
                if (msg.data.status === 200) {
                    setIntroduceMSG(msg.data.result.message);
                } else {
                    setIntroduceMSG(
                        "전문과와 1:1 라이브로 차량을 확인후 원하는 곳으로 받아보세요.\n 3+1일 동안 타보고 맘에 안들면 환불 할 수 있습니다."
                    );
                }
            });

        axios
            .get(
                `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/announce/price`
            )
            .then((txt) => {
                if (txt.data.status === 200) {
                    setPriceTxt(txt.data.result);
                } else {
                    setPriceTxt({
                        priceNotice: [
                            "<li>견적금액은 배송비에 의해 변동될 수 있습니다.<br>(배송비 최대금액 159,000원으로 계산 선반영되었습니다.)</li>\n        <li>배송비는 차량 출발지와 도착지 거리에 따라 책정되며, 상담단계에서 확정됩니다.</li>\n        <li>이전비는 차액 발생 시 계좌로 환급해드립니다.</li>\n        <li>위 예상 합계 금액은 성능보증보험료가 제외된 금액으로 차량마다 보험료가 다를 수 있어서 신청 이후에 상담사가 안내해 드립니다.</li>",
                        ],
                        cash: [
                            "<li>결제를 위한 이체 한도를 미리 확인해 주세요.</li>",
                        ],
                        installment: [
                            "<li>차량비용만 할부 이용이 가능합니다.<br><strong>차량비용 이외의 금액은 계좌이체로 결제 진행됩니다.</strong></li>\n        <li>최대 대출한도는 차량금액으로 설정 됩니다.<br> 상담 시 대출 금액을 설정해주세요.</li>",
                        ],
                    });
                }
            });
    }, []);

    useEffect(() => {
        if (data) {
            axios
                .post(
                    `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/announce/fee`,
                    {
                        type: data.simpleCar.carTypeNm,
                        body: data.simpleCar.bodyTypeNm,
                        fuel: data.simpleCar.fuel,
                        displacement: String(data.simpleCar.displacement),
                        location: "서울",
                        cost: String(data.simpleCar.sellPrice),
                    }
                )
                .then((price) => {
                    if (price.data.status === 200) {
                        setPriceData(price.data.result);
                    } else {
                        if (!isAlert) {
                            isAlert = true;
                            alert(
                                "가격조회에 실패하였습니다. 관리자에 문의하세요."
                            );
                        }
                    }
                });

            setStorageData({
                sellNo: data.simpleCar.sellNo,
                payment_cd: "",
                step1: {
                    customer_name: "",
                    customer_hphone: "",
                },
                step2: { nominee_cd: "", index: 1 },
                step3: "",
                step4: {
                    bank: { name: "", refund_bank_cd: "" },
                    refund_accout_name: "",
                    refund_accout_number: "",
                },
            });
        }
    }, [data]);

    return (
        <AppWrap>
            {data && storageData && introduceMSG && priceData && priceTxt ? (
                <Page
                    data={data}
                    step={step}
                    setStep={setStep}
                    localStep={localStep}
                    setLocalStep={setLocalStep}
                    storageData={storageData}
                    setStorageData={setStorageData}
                    introduceMSG={introduceMSG}
                    priceData={priceData}
                    priceTxt={priceTxt}
                />
            ) : (
                <LoadingPage />
            )}
        </AppWrap>
    );
}

export default App;
