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

function Step3_2({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [check, setCheck] = useState({ name: false, address: false });
  const [tooltip, setTooltip] = useState<boolean>(false);
  const [emailValidation, setEmailValidation] = useState<boolean | undefined>();
  const [emailBlur, setEmailBlur] = useState<boolean>(false);
  const [postCodeOpen, setPostCodeOpen] = useState<{
    nominee: boolean;
    business: boolean;
  }>({ nominee: false, business: false });
  const step3 = storageData.step3;

  // 주소동일체크시 주소 바뀔때 체크 해제함수
  useEffect(() => {
    if (
      storageData.step3.address.zonecode !== storageData.step3.address2.zonecode
    ) {
      setCheck({ ...check, address: false });
    }
  }, [storageData.step3.address, storageData.step3.address2]);

  useEffect(() => {
    if (emailBlur) {
      setEmailValidation(validationEmail());
    }
  }, [storageData.step3.email]);

  useEffect(() => {
    let isActivate = Object.values(step3).filter((data: any) => {
      if (data.length > 0) return data;
    });
    if (
      isActivate.length > 4 &&
      step3.mobile.length === 11 &&
      step3.businessNumber.length === 10 &&
      emailValidation &&
      step3.address.detailAddress &&
      step3.address2.detailAddress &&
      step3.address.zonecode !== "" &&
      step3.address2.zondcode !== ""
    ) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [step3, emailValidation]);

  useEffect(() => {
    if (check.name) {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          name: storageData.step1.name,
          mobile: storageData.step1.mobile,
        },
      });
    }
    if (check.address) {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address2: {
            zonecode: step3.address.zonecode,
            roadAddress: step3.address.roadAddress,
            jibunAddress: step3.address.jibunAddress,
            detailAddress: step3.address.detailAddress,
          },
        },
      });
    }
  }, [check]);

  function validationHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    if (key === "mobile" || key === "name") {
      setCheck({ ...check, name: false });
    }

    if (key === "mobile" || key === "businessNumber") {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }

    if (key === "email" && validationEmail()) {
      setEmailValidation(true);
    }

    if (key === "address") {
      setCheck({ ...check, address: false });
    }

    if (key === "address" || key === "address2") {
      return setStorageData({
        ...storageData,
        step3: {
          ...step3,
          [key]: {
            ...step3[key],
            detailAddress: e.target.value,
          },
        },
      });
    }

    setStorageData({
      ...storageData,
      step3: { ...step3, [key]: e.target.value },
    });
  }

  function validationEmail() {
    let emailReg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailReg.test(storageData.step3.email);
  }

  function postCodeHandler(data: any) {
    let key = postCodeOpen.nominee ? "address" : "address2";
    if (data) {
      const { roadAddress, jibunAddress, zonecode } = data;
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          [key]: {
            ...step3[key],
            roadAddress,
            jibunAddress,
            zonecode,
          },
        },
      });
      setPostCodeOpen({ nominee: false, business: false });
    }
  }

  return (
    <>
      <Modal
        isOpen={postCodeOpen.business || postCodeOpen.nominee}
        onRequestClose={() => {
          postCodeOpen.business
            ? setPostCodeOpen({
                ...postCodeOpen,
                business: false,
              })
            : setPostCodeOpen({
                ...postCodeOpen,
                nominee: false,
              });
        }}
        overlayClassName="overlay"
        className="post_code_modal"
        ariaHideApp={false}
      >
        <AddressModal
          postCodeHandler={postCodeHandler}
          setPostCodeOpen={setPostCodeOpen}
        />
      </Modal>
      <RegistTitle>개인 사업자 정보를 입력해 주세요</RegistTitle>
      <RegistForm onSubmit={(e) => e.preventDefault()}>
        <div className="step_info">
          <div className="info_number">
            <p>1</p>
          </div>
          <p className="info_desc">명의자 정보</p>
        </div>
        <label>
          <div className="flex_check">
            <p>이름</p>
            <div
              onClick={() => {
                setCheck({ ...check, name: !check.name });
                if (check.name) {
                  setStorageData({
                    ...storageData,
                    step3: {
                      ...step3,
                      name: "",
                      mobile: "",
                    },
                  });
                }
              }}
            >
              <img
                src={`./img/${
                  check.name
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
              value={step3.name}
              onChange={(e) => {
                validationHandler(e, "name");
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
              maxLength={11}
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
          <div
            className="flex_form"
            onClick={() => setPostCodeOpen({ nominee: true, business: false })}
          >
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
                value={step3.address.detailAddress}
                onChange={(e) => validationHandler(e, "address")}
              />
            </div>
          </div>
        </label>
        {/* ============================ 사업자 ======================== */}
        <div className="step_info">
          <div className="info_number">
            <p>2</p>
          </div>
          <p className="info_desc">사업자 정보</p>
        </div>
        <label>
          <p>사업장명</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="사업장 이름을 입력해주세요"
              value={step3.name2}
              onChange={(e) => validationHandler(e, "name2")}
            />
          </div>
        </label>
        <label>
          <div className="flex_check">
            <p>사업장 주소</p>
            <div
              onClick={(e) => {
                setCheck({ ...check, address: !check.address });
                if (check.address) {
                  setStorageData({
                    ...storageData,
                    step3: {
                      ...step3,
                      address2: {
                        zonecode: "",
                        roadAddress: "",
                        jibunAddress: "",
                        detailAddress: "",
                      },
                    },
                  });
                }
                e.preventDefault();
              }}
            >
              <img
                src={`./img/${
                  check.address
                    ? "icon_checkbox_large_blue.svg"
                    : "icon_checkbox_large_gray.svg"
                }`}
                alt="체크박스"
              />
              <p>주민등록주소와 동일</p>
            </div>
          </div>
          <div className="flex_form">
            <div className="input_div">
              <input
                type="text"
                placeholder="주소를 검색해주세요"
                readOnly
                value={
                  step3.address2.zonecode
                    ? `[${step3.address2.zonecode}] ` +
                      step3.address2.roadAddress
                    : ""
                }
                onFocus={() => {
                  setPostCodeOpen({ ...postCodeOpen, business: true });
                  (document.activeElement as HTMLElement).blur();
                }}
              />
            </div>
            <RegistSubBtn
              backgrondColor="#0740E4"
              onClick={() => {
                setPostCodeOpen({ ...postCodeOpen, business: true });
              }}
            >
              주소 검색
            </RegistSubBtn>
          </div>
          <div style={{ position: "relative", marginTop: "12px" }}>
            <div className="input_div">
              <input
                className="input_margin_top"
                type="text"
                placeholder="상세주소를 입력해주세요"
                value={step3.address2.detailAddress}
                onChange={(e) => {
                  validationHandler(e, "address2");
                  setCheck({ ...check, address: false });
                }}
              />
            </div>
          </div>
        </label>
        <label>
          <p>사업자 등록번호</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="숫자만 입력해주세요"
              value={step3.businessNumber}
              maxLength={10}
              onChange={(e) => validationHandler(e, "businessNumber")}
            />
          </div>
        </label>
        <label>
          <p>세금계산서 발행 이메일 주소</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="help@charancha.com"
              value={step3.email}
              onChange={(e) => validationHandler(e, "email")}
              onBlur={() => {
                setEmailValidation(validationEmail());
                setEmailBlur(true);
              }}
            />
          </div>
          {emailValidation === false && (
            <p className="certi_warning">이메일 형식이 맞지 않습니다.</p>
          )}
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

export default Step3_2;
