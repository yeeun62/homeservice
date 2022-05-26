import { useState, useEffect } from "react";
import { RegistTitle, RegistForm, RegistSubBtn } from "../../styles/recycle";
import { ActiveProps } from "../../pages/RegistPage";
import AddressModal from "../../modal/AddressModal";
import Modal from "react-modal";
import "../../modal/modal.css";

function Step3_3({ setActivate, setStorageData, storageData }: ActiveProps) {
  const [check, setCheck] = useState<boolean>(false);
  const [emailValidation, setEmailValidation] = useState<boolean | undefined>();
  const [emailBlur, setEmailBlur] = useState<boolean>(false);
  const [postCodeOpen, setPostCodeOpen] = useState<boolean>(false);
  const step3 = storageData.step3;

  useEffect(() => {
    let changeData: any = localStorage.getItem(storageData.sellNo);
    setStorageData(JSON.parse(changeData));
  }, []);

  useEffect(() => {
    if (emailBlur) {
      setEmailValidation(validationEmail());
    }
  }, [step3.business_email]);

  useEffect(() => {
    let isActivate = Object.values(step3).filter((data: any) => {
      if (data.length > 0) return data;
      if (data === "address") {
        if (data.nominee_address_post) return data;
      }
    });
    if (
      isActivate.length >= 5 &&
      step3.nominee_hphone.length === 11 &&
      step3.business_number.length === 10 &&
      validationEmail()
    ) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [step3]);

  function validationHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    if (key === "nominee_hphone" || key === "business_number") {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }

    if (key === "business_email" && validationEmail()) {
      setEmailValidation(true);
    }

    if (key === "nominee_address") {
      return setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address: {
            ...step3.address,
            nominee_address: e.target.value,
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
    return emailReg.test(storageData.step3.business_email);
  }

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
                if (check) {
                  setStorageData({
                    ...storageData,
                    step3: { ...step3, nominee_name: "", nominee_hphone: "" },
                  });
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
              onChange={(e) => {
                validationHandler(e, "nominee_name");
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
              value={step3.nominee_hphone}
              maxLength={11}
              onChange={(e) => {
                validationHandler(e, "nominee_hphone");
                setCheck(false);
              }}
            />
          </div>
        </label>
        <label style={{ marginBottom: "40px" }}>
          <p>사업장 주소</p>
          <div className="flex_form" onClick={() => setPostCodeOpen(true)}>
            <div className="input_div">
              <input
                type="text"
                placeholder="주소를 검색해주세요"
                readOnly
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
                placeholder="상세주소를 입력해주세요"
                value={step3.address.nominee_address}
                onChange={(e) => validationHandler(e, "nominee_address")}
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
              value={step3.business_name}
              onChange={(e) => validationHandler(e, "business_name")}
            />
          </div>
        </label>
        <label>
          <p>사업자 등록번호</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="숫자만 입력해주세요"
              value={step3.business_number}
              maxLength={10}
              onChange={(e) => validationHandler(e, "business_number")}
            />
          </div>
        </label>
        <label>
          <p>세금계산서 발행 이메일 주소</p>
          <div className="input_div">
            <input
              type="text"
              placeholder="help@charancha.com"
              value={step3.business_email}
              onChange={(e) => validationHandler(e, "business_email")}
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
      </RegistForm>
    </>
  );
}

export default Step3_3;
