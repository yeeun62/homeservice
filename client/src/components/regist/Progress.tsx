import styled from "styled-components";

const ProgressWrap = styled.div<{ stepPercent: string }>`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  position: absolute;
  bottom: 0px;

  p {
    position: absolute;
    right: 0;
    top: -18px;
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    color: #3c3c3c;
    padding-right: 16px;
  }

  div {
    position: absolute;
    width: ${(props) => props.stepPercent};
    height: 1px;
    background-color: #101010;
    transition: 1.5s;
  }
`;

function ProgressBar({ step }: { step: number }) {
  const stepPercent = `${step * 25}%`;

  return (
    <ProgressWrap stepPercent={stepPercent}>
      <p>{step} / 4</p>
      <div></div>
    </ProgressWrap>
  );
}

export default ProgressBar;
