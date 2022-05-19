import { useState, useEffect } from "react";
import {
  RegistTitle,
  RegistForm,
  RegistSubBtn,
  PublicCheck,
  Tooltip,
} from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";
import AddressModal from "../../modal/AddressModal";
import Modal from "react-modal";
import "../../modal/modal.css";

function Step3_1({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [check, setCheck] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<boolean>(false);
  const [postCodeOpen, setPostCodeOpen] = useState<boolean>(false);
  const step3 = storageData.step3;

  useEffect(() => {
    if (storageData.step3 === "") {
      setStorageData({
        ...storageData,
        step3: { name: "", moble: "", postCode: "" },
      });
    }
    // 조건 수정
    if (step3.name && step3.mobile && step3.detailAddress) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [step3]);

  function validationHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    if (key === "mobile" && e.target.value.length <= 11) {
      setCheck(false);
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    } else if (key === "mobile") {
      return;
    }

    setStorageData({
      ...storageData,
      step3: { ...step3, [key]: e.target.value },
    });
  }

  function equalRegister(b: boolean) {
    if (b) {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          name: storageData.step1.name,
          mobile: storageData.step1.mobile,
        },
      });
    } else {
      setStorageData({
        ...storageData,
        step3: { ...step3, name: "", mobile: "" },
      });
    }
  }

  function postCodeHandler(data: any) {
    // 주소 저장시 우편번호 zonecode ,지번주소 jibunAddress ,도로명주소 roadAddress ,상세주소 저장

    if (data) {
      const { roadAddress, jibunAddress, zonecode } = data;
      setPostCodeOpen(false);
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address: {
            roadAddress,
            jibunAddress,
            zonecode,
          },
        },
      });
    }
  }

  return (
    <>
      {postCodeOpen && (
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
      )}
      <RegistTitle>명의자 정보를 입력해 주세요</RegistTitle>
      <RegistForm onSubmit={(e) => e.preventDefault()}>
        <label>
          <div className="flex_check">
            <p>이름</p>
            <div
              onClick={() => {
                setCheck(!check);
                equalRegister(!check);
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
              value={storageData.step3.name}
              onChange={(e) => {
                validationHandler(e, "name");
                setCheck(false);
              }}
            />
          </div>
        </label>
        <label>
          <p>휴대전화 번호</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="숫자만 입력해주세요"
              value={step3.mobile}
              onChange={(e) => {
                validationHandler(e, "mobile");
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
          {tooltip && (
            <Tooltip
              style={{
                position: "absolute",
                zIndex: "100",
                left: "-9px",
                top: "26px",
              }}
            >
              <div></div>명의자의 등본상 주소지를 입력해 주세요.
            </Tooltip>
          )}
          <div className="flex_form" onClick={() => setPostCodeOpen(true)}>
            <div className="input_div">
              <input
                type="text"
                placeholder="주소를 검색해주세요"
                readOnly
                value={
                  step3.address.zonecode
                    ? `[${step3.address.zonecode}] ` + step3.address.roadAddress
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
                placeholder="상세주소를 입력해주세요"
                onChange={(e) => validationHandler(e, "detailAddress")}
              />
              <img
                src="/img/w_icon_question_medium_gray.svg"
                alt="물음표 이모티콘"
                style={{ cursor: "pointer" }}
                onClick={() => setTooltip(!tooltip)}
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
                    public: !storageData.step3.public,
                  },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <img
                src={`./img/${
                  step3.public
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
