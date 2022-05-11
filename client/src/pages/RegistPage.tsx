import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Step1 from "../components/regist/Step1";
import Step2 from "../components/regist/Step2";
import Step3_1 from "../components/regist/Step3_1";
import Step3_2 from "../components/regist/Step3_2";
import Step3_3 from "../components/regist/Step3_3";
import Step4 from "../components/regist/Step4";
import StepBtn from "../components/regist/StepBtn";

const RegistPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
  height: Calc(100vh - 52px);
  padding: 0px 16px;
`;
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
      <RegistPageWrap>
        <div>
          {
            [
              <Step1 />,
              <Step2
                setActivat={setActivat}
                choice={choice}
                setChoice={setChoice}
              />,
              <Step3_1 setActivat={setActivat} />,
              <Step3_2 />,
              <Step3_3 />,
              <Step4 />,
            ][registIndex]
          }
        </div>
        <div>
          <StepBtn
            step={step}
            setStep={setStep}
            activat={activat}
            choice={choice}
            registIndex={registIndex}
            setRegistIndex={setRegistIndex}
          />
        </div>
      </RegistPageWrap>
    </>
  );
}

export default RegistPage;
