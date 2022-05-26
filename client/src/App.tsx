import { useState, StrictMode, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import queryString from "query-string";
import "./App.css";
import MainPage from "./pages/MainPage";
import RegistPage from "./pages/RegistPage";
import CompletePage from "./pages/CompletePage";
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
  const [step, setStep] = useState<number>(1);
  const [localStep, setLocalStep] = useState<string>("0");
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
          `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/products/${query.sellNo}`
          // `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_FORSALE}/${query.sellNo}`
        )
        .then((data) => {
          if (data.data.status) {
            if (!isAlert) {
              isAlert = true;
              alert("매물정보가 없어 실패하였습니다. 관리자에 문의하세요.");
            }
          } else {
            setData(data.data);
          }
        });
    } else {
      alert("매물정보가 없어 실패하였습니다. 관리자에 문의하세요.");
    }

    axios
      .get(
        `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/announce/notice`
      )
      .then((msg) => setIntroduceMSG(msg.data.result.message));
    // .catch((err) => console.log("소개 문구 에러", err));

    axios
      .get(
        `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/announce/price`
      )
      .then((txt) => setPriceTxt(txt.data.result));
    // .catch((err) => console.log("price 문구 에러", err));
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
          setPriceData(price.data.result);
        });
      // .catch((err) => console.log("price 에러", err));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      let localData = localStorage.getItem(data.simpleCar.sellNo);
      let localStep = localStorage.getItem("localStep");
      if (localData && localStep) {
        setStorageData(JSON.parse(localData));
        setLocalStep(localStep);
      } else {
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
          // step: 0,
        });
        setLocalStep("0");
      }
    }
  }, [data]);

  return (
    <StrictMode>
      <AppWrap>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                data && storageData && introduceMSG && priceData && priceTxt ? (
                  <MainPage
                    data={data}
                    setLocalStep={setLocalStep}
                    storageData={storageData}
                    setStorageData={setStorageData}
                    introduceMSG={introduceMSG}
                    priceData={priceData}
                    priceTxt={priceTxt}
                  />
                ) : (
                  <LoadingPage />
                )
              }
            />
            <Route
              path="/regist"
              element={
                data && storageData ? (
                  <RegistPage
                    data={data}
                    step={step}
                    setStep={setStep}
                    localStep={localStep}
                    setLocalStep={setLocalStep}
                    storageData={storageData}
                    setStorageData={setStorageData}
                  />
                ) : (
                  <LoadingPage />
                )
              }
            />
            <Route
              path="/complete"
              element={data ? <CompletePage /> : <LoadingPage />}
            />
          </Routes>
        </BrowserRouter>
      </AppWrap>
    </StrictMode>
  );
}

export default App;

// app.tsx
