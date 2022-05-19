import { useState, useEffect } from "react";
import { RegistTitle, RegistForm, RegistSubBtn } from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";
import AddressModal from "../../modal/AddressModal";
import Modal from "react-modal";
import "../../modal/modal.css";

function Step3_3({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [check, setCheck] = useState<boolean>(false);
  const [emailValidation, setEmailValidation] = useState<boolean | undefined>();
  const [postCodeOpen, setPostCodeOpen] = useState<boolean>(false);
  const step3 = storageData.step3;

  useEffect(() => {
    let isActivate = Object.values(step3).filter((data: any) => {
      if (data.length > 0) return data;
    });
    if (
      isActivate.length >= 6 &&
      step3.mobile.length === 11 &&
      step3.businessNumber.length === 10 &&
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
    if (key === "mobile" || key === "businessNumber") {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }

    if (key === "email" && validationEmail()) {
      setEmailValidation(true);
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
      <RegistTitle>법인 사업자 정보를 입력해 주세요</RegistTitle>
      <RegistForm onSubmit={(e) => e.preventDefault()}>
        <div className="step_info">
          <div className="info_number">
            <p>1</p>
          </div>
          <p className="info_desc">명의자 정보</p>
        </div>
        <label>
          <div className="flex_check">
            <p>대표자명</p>
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
              value={step3.name}
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
              maxLength={11}
              onChange={(e) => {
                validationHandler(e, "mobile");
              }}
            />
          </div>
        </label>
        <label>
          <p>사업장 주소</p>
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
                value={step3.detailAddress}
                onChange={(e) => validationHandler(e, "detailAddress")}
              />
            </div>
          </div>
        </label>
        {/* =================== 사업자 정보 ==================== */}
        <div className="step_info">
          <div className="info_number">
            <p>2</p>
          </div>
          <p className="info_desc">법인 정보</p>
        </div>
        <label>
          <p>법인명</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="법인명 이름을 입력해주세요"
              value={step3.name2}
              onChange={(e) => validationHandler(e, "name2")}
            />
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
              onBlur={() => setEmailValidation(validationEmail())}
              onKeyDown={(e) =>
                e.key === "Backspace"
                  ? setEmailValidation(validationEmail())
                  : null
              }
            />
          </div>
          {emailValidation === false && (
            <p className="certi_warning">이메일 형식이 맞지 않습니다.</p>
          )}
        </label>
      </RegistForm>
    </>
  );
}

export default Step3_3;
