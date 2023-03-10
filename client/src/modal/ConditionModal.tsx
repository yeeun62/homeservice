import styled from "styled-components";
import { useState, useEffect } from "react";
import { MainBtn, RegistTitle } from "../styles/recycle";
import ConditionSubModal from "./ConditionSubModal";
import Modal from "react-modal";
import { StorageType } from "../App";
import axios from "axios";

const ConditionWrap = styled.div`
    padding: 16px;
    max-width: 1200px;
    margin: 0 auto;

    .all_check_btn {
        margin-top: 24px;
        text-align: left;
        display: flex;
        align-items: center;
        font-weight: 700;

        img {
            width: 20px;
            margin: 0 8px 0 16px;
        }

        span {
            color: #0740e4;
            line-height: 54px;
        }

        @media screen and (min-width: 750px) {
            font-size: 17px;
        }
    }

    ul {
        padding: 16px;
        border-bottom: 1px solid #ededed;
        margin-bottom: 16px;

        li {
            height: 36px;
            display: flex;
            justify-content: space-between;

            div {
                display: flex;

                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                }

                span {
                    font-weight: 400;
                    font-size: 13px;
                    line-height: 19px;
                    cursor: pointer;
                }
            }

            .more_condition_btn {
                width: 16px;
                height: 16px;
                margin-left: 8px;
            }

            img {
                cursor: pointer;
            }
        }
    }

    .bottom_div {
        font-weight: 400;
        font-size: 11px;
        line-height: 16px;
        letter-spacing: -0.02em;
        color: #939393;
        margin-bottom: 32px;
        position: relative;
        padding-left: 9px;

        div {
            width: 3px;
            height: 3px;
            background-color: #939393;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 5px;
        }
    }

    @media screen and (min-width: 750px) {
        padding: 16px 32px 32px 32px;

        .bold_text {
            font-size: 20px;
            line-height: 29px;
        }
    }
`;

export interface SubModal {
    [key: string]: any;
    title: string;
    code: string;
}

interface ConditionProps {
    setConditionModal: React.Dispatch<React.SetStateAction<boolean>>;
    storageData: StorageType;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

type CkType = {
    [index: string]: boolean;
};

function ConditionModal({
    setConditionModal,
    storageData,
    setPage,
}: ConditionProps) {
    const [conditionSubOpen, setConditionSubOpen] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<CkType>({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        all: false,
    });
    const [subModal, setSubModal] = useState<SubModal>({
        title: "???????????? ??????/????????????(??????)",
        code: "code1",
    });

    const dependency = [
        isChecked[0],
        isChecked[1],
        isChecked[2],
        isChecked[3],
        isChecked[4],
        setIsChecked,
    ];

    useEffect(() => {
        let checked = Object.keys(isChecked)
            .slice(0, -1)
            .filter((ck: string) => {
                return isChecked[ck];
            });

        if (checked.length < 5) {
            setIsChecked({ ...isChecked, all: false });
        } else {
            setIsChecked({ ...isChecked, all: true });
        }
    }, [...dependency]);

    const allCheckHandler = () => {
        if (isChecked.all) {
            setIsChecked({
                all: false,
                0: false,
                1: false,
                2: false,
                3: false,
                4: false,
            });
        } else {
            setIsChecked({
                all: true,
                0: true,
                1: true,
                2: true,
                3: true,
                4: true,
            });
        }
    };

    const conditionArr: string[] = [
        "???????????? ??????/????????????(??????)",
        "?????????????????? ??????/????????????(??????)",
        "???????????? ????????? ?????? ??????(??????)",
        "???????????? ?????? ?????? ??????(??????)",
        "???????????? ?????? ??????(??????)",
    ];

    function CompleteHandler() {
        const { sellNo, payment_cd, step1, step2, step3, step4 } = storageData;
        const { customer_name, customer_hphone } = step1;
        const { nominee_cd } = step2;
        const {
            nominee_name,
            nominee_hphone,
            address,
            address2,
            business_name,
            business_number,
            business_email,
            nominee_reduction_joint,
        } = step3;
        const {
            nominee_address_post,
            nominee_address_road,
            nominee_address_jibun,
            nominee_address,
        } = address;
        const {
            business_address_post,
            business_address_road,
            business_address_jibun,
            business_address,
        } = address2;
        const { refund_accout_name, refund_accout_number, bank } = step4;

        if (isChecked.all) {
            axios
                .post(
                    `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/process`,
                    {
                        sellNo,
                        payment_cd,
                        customer_name,
                        customer_hphone,
                        nominee_cd,
                        nominee_name,
                        nominee_hphone,
                        nominee_address_post,
                        nominee_address_road,
                        nominee_address_jibun,
                        nominee_address,
                        nominee_reduction_joint: `${nominee_reduction_joint}`,
                        business_name,
                        business_address_post,
                        business_address_road,
                        business_address_jibun,
                        business_address,
                        business_number,
                        business_email,
                        refund_bank_cd: bank.refund_bank_cd,
                        refund_accout_name,
                        refund_accout_number,
                    }
                )
                .then((result) => {
                    if (result.data.status === 200) {
                        setPage(2);
                    }
                })
                .catch((err) => {
                    alert(
                        "??????????????? ?????? ?????????????????????. ???????????? ???????????????."
                    );
                });
        }
        return;
    }

    return (
        <>
            <Modal
                isOpen={conditionSubOpen}
                onRequestClose={() => setConditionSubOpen(!conditionSubOpen)}
                overlayClassName="overlay"
                className="condition_sub_modal"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={false}
            >
                <ConditionSubModal
                    subModal={subModal}
                    setConditionSubOpen={setConditionSubOpen}
                />
            </Modal>
            <ConditionWrap>
                <button
                    type="button"
                    className="bottom_bar"
                    onClick={() => setConditionModal(false)}
                    style={{ margin: "0 auto 32px" }}
                ></button>
                <RegistTitle className="condition_title">
                    ?????? ????????? ?????? <br /> ?????? ????????? ??????????????????.
                </RegistTitle>
                <MainBtn
                    className="all_check_btn"
                    type="button"
                    backgrondColor={`${
                        isChecked["all"] ? "rgba(7, 64, 228, 0.03)" : "#fff"
                    }`}
                    border={`${
                        isChecked["all"]
                            ? "1px solid rgba(7, 64, 228, 0.1)"
                            : "1px solid #ededed"
                    }`}
                    color={`${isChecked["all"] ? "#0740E4" : "#707070"}`}
                    activate={true}
                    onClick={allCheckHandler}
                >
                    <img
                        src={`./img/${
                            isChecked["all"]
                                ? "icon_checkbox_large_blue.svg"
                                : "icon_checkbox_large_gray.svg"
                        }`}
                        alt="?????? ???????????? ????????????"
                    />
                    ?????? ????????????
                </MainBtn>
                <ul>
                    {conditionArr.map((condition: string, i: number) => {
                        return (
                            <li key={condition}>
                                <div
                                    onClick={() =>
                                        setIsChecked({
                                            ...isChecked,
                                            [i]: !isChecked[i],
                                        })
                                    }
                                >
                                    <img
                                        src={`./img/${
                                            isChecked[i]
                                                ? "icon_checkbox_large_blue40.svg"
                                                : "icon_checkbox_large_gray.svg"
                                        }`}
                                        alt="??????"
                                    />
                                    <span>{condition}</span>
                                </div>
                                <img
                                    src="./img/icon_arrow_right_medium_gray.svg"
                                    alt="?????? ??? ??????"
                                    className="more_condition_btn"
                                    onClick={() => {
                                        setConditionSubOpen(true);
                                        setSubModal({
                                            title: condition,
                                            code: `code${i + 1}`,
                                        });
                                    }}
                                />
                            </li>
                        );
                    })}
                </ul>
                <div className="bottom_div">
                    <div></div>
                    <span>
                        ?????????????????? ??????????????? ???????????? ??? ?????????, <br />{" "}
                        ???????????? ????????? ??? ????????? ???????????? ????????? ???????????????.
                    </span>
                </div>
                <MainBtn
                    backgrondColor="#0740E4"
                    color="#fff"
                    border="none"
                    activate={isChecked["all"]}
                    style={{ fontWeight: 700 }}
                    onClick={CompleteHandler}
                >
                    ?????? ??????
                </MainBtn>
            </ConditionWrap>
        </>
    );
}

export default ConditionModal;
