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
import { StorageType } from "../App";

interface RegistPageProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  storageData: StorageType;
  setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
  localStep: string;
  setLocalStep: React.Dispatch<React.SetStateAction<string>>;
  data: any;
}

export interface ActiveProps {
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
  setStorageData: React.Dispatch<React.SetStateAction<StorageType>>;
  storageData: StorageType;
  data?: any;
}

function RegistPage({
  step,
  setStep,
  localStep,
  setLocalStep,
  storageData,
  setStorageData,
  data,
}: RegistPageProps) {
  const [activate, setActivate] = useState<boolean>(false);

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

  return (
    <>
      <Header step={step} />
      <PageWrap>
        {
          [
            <Step1
              setActivate={setActivate}
              setStorageData={setStorageData}
              storageData={storageData}
              data={data}
            />,
            <Step2
              setActivate={setActivate}
              storageData={storageData}
              setStorageData={setStorageData}
            />,
            <Step3_1
              setActivate={setActivate}
              setStorageData={setStorageData}
              storageData={storageData}
            />,
            <Step3_2
              setActivate={setActivate}
              setStorageData={setStorageData}
              storageData={storageData}
            />,
            <Step3_3
              setActivate={setActivate}
              setStorageData={setStorageData}
              storageData={storageData}
            />,
            <Step4
              setActivate={setActivate}
              setStorageData={setStorageData}
              storageData={storageData}
            />,
          ][Number(localStep)]
        }
      </PageWrap>
      <StepBtn
        step={step}
        setStep={setStep}
        localStep={localStep}
        setLocalStep={setLocalStep}
        activate={activate}
        storageData={storageData}
      />
    </>
  );
}

export default RegistPage;
