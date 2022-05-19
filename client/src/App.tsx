import { useState, StrictMode, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
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
  id: string;
  main: string;
  step1: { name: string; mobile: string };
  step2: number;
  step3: any;
  step4: { bank: string; name: string; account: string };
  step: number;
}

function App() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<any>();
  const [storageData, setStorageData] = useState<any>();

  useEffect(() => {
    axios
      .get(
        "http://3.34.98.110/dealers/-/products/ffc32180-d59f-11ec-9d64-0242ac120002"
      )
      .then((data) => {
        setData(data.data);
      });
  }, []);

  useEffect(() => {
    // 처음에 요청 들어오는 파라미터로 로컬스토리지에서 데이터 있는지 검사해서 있으면 스토리지데이터 스테이트 업데이트하고 없으면 초기값 넣어주기
    if (data) {
      let localData = localStorage.getItem(data.simpleCar.sellNo);
      if (localData) {
        setStorageData(JSON.parse(localData));
      } else {
        setStorageData({
          id: data.simpleCar.sellNo,
          main: "",
          step1: { name: "", mobile: "" },
          step2: 0,
          step3: "",
          step4: { bank: "", name: "", account: "" },
          step: 0,
        });
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
                data && storageData ? (
                  <MainPage
                    data={data}
                    storageData={storageData}
                    setStorageData={setStorageData}
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
                    step={step}
                    setStep={setStep}
                    storageData={storageData}
                    setStorageData={setStorageData}
                  />
                ) : (
                  <LoadingPage />
                )
              }
            />
            <Route path="/complete" element={<CompletePage data={data} />} />
          </Routes>
        </BrowserRouter>
      </AppWrap>
    </StrictMode>
  );
}

export default App;
