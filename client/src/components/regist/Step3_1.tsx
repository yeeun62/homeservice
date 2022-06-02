import { useState, useEffect, useRef } from "react";
import {
  RegistTitle,
  RegistForm,
  RegistSubBtn,
  PublicCheck,
  Tooltip,
} from "../../styles/recycle";
import { ActiveProps } from "../../pages/Page";
import AddressModal from "../../modal/AddressModal";
import Modal from "react-modal";
import "../../modal/modal.css";

function Step3_1({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [check, setCheck] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<boolean>(false);
  const [postCodeOpen, setPostCodeOpen] = useState<boolean>(false);
  const step3 = storageData.step3;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let changeData: any = localStorage.getItem("sell");
    setStorageData(JSON.parse(changeData));
  }, []);

  useEffect(() => {
    if (
      step3.nominee_name &&
      step3.nominee_hphone.length === 11 &&
      step3.address.nominee_address &&
      step3.address.nominee_address_post
    ) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [step3]);

  useEffect(() => {
    if (check) {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          nominee_name: storageData.step1.customer_name,
          nominee_hphone: storageData.step1.customer_hphone,
        },
      });
    }
  }, [check]);

  function postCodeHandler(data: any) {
    if (data) {
      const { roadAddress, jibunAddress, zonecode } = data;
      setPostCodeOpen(false);
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address: {
            ...step3.address,
            nominee_address_road: roadAddress,
            nominee_address_jibun: jibunAddress,
            nominee_address_post: zonecode,
          },
        },
      });
    }
  }

  return (
    <>
      <Modal
        isOpen={postCodeOpen}
        onRequestClose={() => setPostCodeOpen(!postCodeOpen)}
        overlayClassName="overlay"
        className="post_code_modal"
        ariaHideApp={false}
      >
        <AddressModal
          postCodeHandler={postCodeHandler}
          setPostCodeOpen={setPostCodeOpen}
        />
      </Modal>
      <RegistTitle>명의자 정보를 입력해 주세요</RegistTitle>
      <RegistForm onSubmit={(e) => e.preventDefault()} tooltip={tooltip}>
        <label>
          <div className="flex_check">
            <p>이름</p>
            <div
              onClick={(e) => {
                setCheck(!check);
                if (check) {
                  setStorageData({
                    ...storageData,
                    step3: {
                      ...step3,
                      nominee_name: "",
                      nominee_hphone: "",
                    },
                  });
                } else {
                  inputRef.current?.focus();
                  e.preventDefault();
                }
              }}
            >
              <img
                src={`./img/${
                  check
                    ? "icon_checkbox_large_blue.svg"
                    : "icon_checkbox_large_gray.svg"
                }`}
                alt="체크박스"
              />
              <p>신청자와 동일</p>
            </div>
          </div>
          <div className="input_div">
            <input
              type="text"
              placeholder="실명을 입력해주세요"
              value={step3.nominee_name}
              autoFocus
              onChange={(e) => {
                setStorageData({
                  ...storageData,
                  step3: { ...step3, nominee_name: e.target.value },
                });
                setCheck(false);
              }}
            />
          </div>
        </label>
        <label>
          <p>휴대전화 번호</p>
          <div className="input_div">
            <input
              placeholder="숫자만 입력해주세요"
              type="tel"
              pattern="\d*"
              value={step3.nominee_hphone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length <= 11) {
                  setStorageData({
                    ...storageData,
                    step3: {
                      ...step3,
                      nominee_hphone: e.target.value.replace(/[^0-9]/g, ""),
                    },
                  });
                  setCheck(false);
                }
              }}
            />
          </div>
        </label>
        <label style={{ position: "relative" }}>
          <p>
            주민등록주소지
            <img
              src="/img/w_icon_question_medium_gray.svg"
              alt="물음표 이모티콘"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setTooltip(!tooltip);
                e.preventDefault();
              }}
            />
          </p>
          <Tooltip className="tooltip">
            명의자의 등본상 주소지를 입력해 주세요.
          </Tooltip>
          <div className="flex_form" onClick={() => setPostCodeOpen(true)}>
            <div className="input_div">
              <input
                type="text"
                placeholder="주소를 검색해주세요"
                readOnly
                ref={inputRef}
                value={
                  step3.address.nominee_address_post
                    ? `[${step3.address.nominee_address_post}] ` +
                      step3.address.nominee_address_road
                    : ""
                }
              />
            </div>
            <RegistSubBtn backgrondColor="#0740E4">주소 검색</RegistSubBtn>
          </div>
          <div style={{ position: "relative", marginTop: "12px" }}>
            <div className="input_div">
              <input
                className="input_margin_top"
                type="text"
                value={step3.address.nominee_address}
                placeholder="상세주소를 입력해주세요"
                onChange={(e) =>
                  setStorageData({
                    ...storageData,
                    step3: {
                      ...step3,
                      address: {
                        ...step3.address,
                        nominee_address: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </div>
        </label>
        <PublicCheck>
          <div>
            <div
              onClick={() =>
                setStorageData({
                  ...storageData,
                  step3: {
                    ...step3,
                    nominee_reduction_joint:
                      !storageData.step3.nominee_reduction_joint,
                  },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <img
                src={`./img/${
                  step3.nominee_reduction_joint
                    ? "icon_checkbox_large_blue.svg"
                    : "icon_checkbox_large_gray.svg"
                }`}
                alt="체크박스 이미지"
              />
              <p>공동 명의를 원해요</p>
            </div>
          </div>
        </PublicCheck>
      </RegistForm>
    </>
  );
}

export default Step3_1;
