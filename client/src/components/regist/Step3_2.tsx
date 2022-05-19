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
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [postCodeOpen, setPostCodeOpen] = useState<{
    nominee: boolean;
    business: boolean;
  }>({ nominee: false, business: false });
  const step3 = storageData.step3;

  useEffect(() => {
    let isActivate = Object.values(step3).filter((data: any) => {
      if (data.length > 0) return data;
    });
    if (
      isActivate.length > 6 &&
      step3.mobile.toString().length === 11 &&
      step3.businessNumber.toString().length === 10 &&
      emailValidation
    ) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [step3, emailValidation]);

  function validationHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    if (
      (key === "mobile" && e.target.value.length <= 11) ||
      key === "businessNumber"
    ) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    } else if (key === "mobile") {
      return;
    } else if (key === "businessNumber" && e.target.value.length > 10) {
      return;
    } else if (key === "email" && validationEmail()) {
      setEmailValidation(true);
    } else if (key === "detailAddress") {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address: {
            ...step3.address,
            [key]: e.target.value,
          },
        },
      });
    } else if (key === "detailAddress2") {
      setCheck({ ...check, address: false });
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address2: {
            ...step3.address2,
            [key]: e.target.value,
          },
        },
      });
    } else {
      setStorageData({
        ...storageData,
        step3: { ...step3, [key]: e.target.value },
      });
    }
  }

  function validationEmail() {
    let emailReg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailReg.test(storageData.step3.email);
  }

  function equalRegister(b: boolean, key: string) {
    if (b && key === "name") {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          name: storageData.step1.name,
          mobile: storageData.step1.mobile,
        },
      });
    } else if (key === "name") {
      setStorageData({
        ...storageData,
        step3: { ...step3, name: "", mobile: "" },
      });
    } else if (b) {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address2: step3.address,
          detailAddress2: step3.address.detailAddress2,
        },
      });
    } else if (!b && key === "address") {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address2: {
            zonecode: "",
            jibunAddress: "",
            roadAddress: "",
            detailAddress2: "",
          },
        },
      });
    }
  }

  function postCodeHandler(data: any) {
    // 주소 저장시 우편번호 zonecode ,지번주소 jibunAddress ,도로명주소 roadAddress ,상세주소 저장
    if (data) {
      const { roadAddress, jibunAddress, zonecode } = data;
      if (postCodeOpen.nominee) {
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
      } else if (postCodeOpen.business) {
        setStorageData({
          ...storageData,
          step3: {
            ...step3,
            address2: {
              roadAddress,
              jibunAddress,
              zonecode,
            },
          },
        });
      }
      setPostCodeOpen({ nominee: false, business: false });
    }
  }

  return (
    <>
      {postCodeOpen && (
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
      )}
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
                equalRegister(!check.name, "name");
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
                setCheck({ ...check, name: false });
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
                onChange={(e) => validationHandler(e, "detailAddress")}
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
              onClick={() => {
                setCheck({ ...check, address: !check.address });
                equalRegister(!check.address, "address");
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
                onFocus={(e) => {
                  setCheck({ ...check, address: false });
                  equalRegister(false, "address");
                  setPostCodeOpen({ ...postCodeOpen, business: true });
                  (document.activeElement as HTMLElement).blur();
                }}
              />
            </div>
            <RegistSubBtn
              backgrondColor="#0740E4"
              onClick={() => {
                setCheck({ ...check, address: false });
                equalRegister(false, "address");
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
                value={step3.address.detailAddress2}
                onChange={(e) => {
                  validationHandler(e, "detailAddress2");
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
              onBlur={() => setEmailValidation(validationEmail())}
            />
          </div>
          {!emailValidation && (
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
