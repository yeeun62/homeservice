import { useEffect, useState } from "react";
import { PageWrap } from "../styles/recycle";
import Header from "../components/Header";
import Step1 from "../components/regist/Step1";
import Step2 from "../components/regist/Step2";
import Step3_1 from "../components/regist/Step3_1";
import Step3_2 from "../components/regist/Step3_2";
import Step3_3 from "../components/regist/Step3_3";
import Step4 from "../components/regist/Step4";
import StepBtn from "../components/regist/StepBtn";
import MainPage from "./MainPage";
import CompletePage from "./CompletePage";
import { StorageType } from "../App";

interface PageProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  storageData: StorageType;
  setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
  localStep: number;
  setLocalStep: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  introduceMSG: string;
  priceData: any;
  priceTxt: any;
}

export interface ActiveProps {
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
  setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
  storageData: StorageType;
  phoneAuth?: boolean;
  setPhoneAuth?: React.Dispatch<React.SetStateAction<boolean>>;
  nextInput?: any;
  postCodeOpen?: any;
  setPostCodeOpen?: React.Dispatch<
    React.SetStateAction<{ nominee: boolean; business: boolean }>
  >;
}

function Page({
  step,
  setStep,
  localStep,
  setLocalStep,
  storageData,
  setStorageData,
  data,
  introduceMSG,
  priceData,
  priceTxt,
}: PageProps) {
  const [activate, setActivate] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [phoneAuth, setPhoneAuth] = useState<boolean>(false);
  const [postCodeOpen, setPostCodeOpen] = useState<{
    nominee: boolean;
    business: boolean;
  }>({ nominee: false, business: false });

  useEffect(() => {
    let input: any = document.getElementsByTagName("input");
    for (let key of input) {
      key.addEventListener("keydown", (e: any) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      });
    }
  }, [localStep]);

  function nextInput(e: any, s: string) {
    if (e.key === "Enter") {
      let input;

      if (
        s.slice(4, 7) === "3-2" &&
        e.target.attributes[0].value.slice(-1) === "5"
      ) {
        setPostCodeOpen({ nominee: false, business: true });
        input = document.getElementsByName(s + "7");
        if (input.length) {
          input[0].focus();
        }
      } else if (
        s.slice(4, 5) === "3" &&
        e.target.attributes[0].value.slice(-1) === "2"
      ) {
        setPostCodeOpen({ nominee: true, business: false });
        input = document.getElementsByName(s + "4");
        if (input.length) input[0].focus();
      } else {
        input = document.getElementsByName(
          s + (Number(e.target.attributes[0].value.slice(-1)) + 1).toString()
        );
        if (input.length) {
          input[0].focus();
        }
      }
    }
  }

  return (
    <>
      <Header step={step} data={data} page={page} />
      {
        [
          <MainPage
            data={data}
            setLocalStep={setLocalStep}
            storageData={storageData}
            setStorageData={setStorageData}
            introduceMSG={introduceMSG}
            priceData={priceData}
            priceTxt={priceTxt}
            setPage={setPage}
          />,
          <>
            <PageWrap>
              {
                [
                  <Step1
                    setActivate={setActivate}
                    setStorageData={setStorageData}
                    storageData={storageData}
                    phoneAuth={phoneAuth}
                    nextInput={nextInput}
                  />,
                  <Step2
                    setActivate={setActivate}
                    storageData={storageData}
                    setStorageData={setStorageData}
                    setPhoneAuth={setPhoneAuth}
                  />,
                  <Step3_1
                    setActivate={setActivate}
                    setStorageData={setStorageData}
                    storageData={storageData}
                    nextInput={nextInput}
                    postCodeOpen={postCodeOpen.nominee}
                    setPostCodeOpen={setPostCodeOpen}
                  />,
                  <Step3_2
                    setActivate={setActivate}
                    setStorageData={setStorageData}
                    storageData={storageData}
                    nextInput={nextInput}
                    postCodeOpen={postCodeOpen}
                    setPostCodeOpen={setPostCodeOpen}
                  />,
                  <Step3_3
                    setActivate={setActivate}
                    setStorageData={setStorageData}
                    storageData={storageData}
                    nextInput={nextInput}
                    postCodeOpen={postCodeOpen.nominee}
                    setPostCodeOpen={setPostCodeOpen}
                  />,
                  // <Step4
                  //   setActivate={setActivate}
                  //   setStorageData={setStorageData}
                  //   storageData={storageData}
                  // />,
                ][localStep]
              }
            </PageWrap>
            <StepBtn
              step={step}
              setStep={setStep}
              localStep={localStep}
              setLocalStep={setLocalStep}
              activate={activate}
              storageData={storageData}
              setPage={setPage}
            />
          </>,
          <CompletePage data={data} />,
        ][page]
      }
    </>
  );
}

export default Page;
