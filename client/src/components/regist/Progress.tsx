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
        top: -19px;
        font-size: 11px;
        font-weight: 600;
        line-height: 16px;
        color: #3c3c3c;
        padding-right: 16px;
        letter-spacing: -0.02em;

        span {
            font-weight: 400;
        }
    }

    div {
        position: absolute;
        width: ${(props) => props.stepPercent};
        height: 1px;
        background-color: #101010;
        transition: 1.5s;
    }
`;

function ProgressBar({ step }: { step?: any }) {
    const stepPercent = `${step * 33.333}%`;

    return (
        <ProgressWrap stepPercent={stepPercent}>
            <p>
                {step} <span>/</span> 3
            </p>
            <div></div>
        </ProgressWrap>
    );
}

export default ProgressBar;
