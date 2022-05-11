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

interface RegistPageProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function RegistPage({ step, setStep }: RegistPageProps) {
  const [registIndex, setRegistIndex] = useState<number>(0);
  const [activat, setActivat] = useState<boolean>(false);
  const [choice, setChoice] = useState<number>(-1);

  useEffect(() => {
    setChoice(-1);
    setActivat(false);
  }, [registIndex]);

  return (
    <>
      <Header step={step} />
      <PageWrap>
        {
          [
            <Step1 />,
            <Step2
              setActivat={setActivat}
              choice={choice}
              setChoice={setChoice}
            />,
            <Step3_1 />,
            <Step3_2 />,
            <Step3_3 />,
            <Step4 />,
          ][registIndex]
        }
      </PageWrap>
      <StepBtn
        step={step}
        setStep={setStep}
        activat={activat}
        choice={choice}
        registIndex={registIndex}
        setRegistIndex={setRegistIndex}
      />
    </>
  );
}

export default RegistPage;
