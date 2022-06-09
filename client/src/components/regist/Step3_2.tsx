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
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefBusiness = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   let changeData: any = localStorage.getItem("sell");
  //   setStorageData(JSON.parse(changeData));
  // }, []);

  // 주소동일체크시 주소 바뀔때 체크 해제함수
  useEffect(() => {
    if (
      storageData.step3.address.nominee_address_post !==
      storageData.step3.address2.business_address_post
    ) {
      setCheck({ ...check, address: false });
    }
  }, [storageData.step3.address, storageData.step3.address2]);

  useEffect(() => {
    if (emailBlur) {
      setEmailValidation(validationEmail());
    }
  }, [storageData.step3.business_email]);

  useEffect(() => {
    let isActivate = Object.values(step3).filter((data: any) => {
      if (data.length > 0) return data;
    });
    if (
      isActivate.length > 4 &&
      step3.nominee_hphone.length === 11 &&
      step3.business_number.length === 10 &&
      validationEmail() &&
      step3.address.nominee_address &&
      step3.address2.business_address &&
      step3.address.nominee_address_post !== "" &&
      step3.address2.business_address_post !== ""
    ) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [step3]);

  useEffect(() => {
    if (check.name) {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          nominee_name: storageData.step1.customer_name,
          nominee_hphone: storageData.step1.customer_hphone,
        },
      });
    }
    if (check.address) {
      setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address2: {
            business_address_post: step3.address.nominee_address_post,
            business_address_road: step3.address.nominee_address_road,
            business_address_jibun: step3.address.nominee_address_jibun,
            business_address: step3.address.nominee_address,
          },
        },
      });
    }
  }, [check]);

  function validationHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    if (key === "nominee_hphone" || key === "nominee_name") {
      setCheck({ ...check, name: false });
    }

    if (key === "nominee_hphone" || key === "business_number") {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }

    if (key === "business_email" && validationEmail()) {
      setEmailValidation(true);
    }

    if (key === "address") {
      setCheck({ ...check, address: false });
    }

    if (key === "address") {
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

    if (key === "address2") {
      return setStorageData({
        ...storageData,
        step3: {
          ...step3,
          address2: {
            ...step3.address2,
            business_address: e.target.value,
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

  function postCodeHandler(data: any) {
    if (data) {
      const { roadAddress, jibunAddress, zonecode } = data;
      if (postCodeOpen.nominee) {
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
      } else if (!postCodeOpen.nominee) {
        setStorageData({
          ...storageData,
          step3: {
            ...step3,
            address2: {
              ...step3.address2,
              business_address_road: roadAddress,
              business_address_jibun: jibunAddress,
              business_address_post: zonecode,
            },
          },
        });
      }
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
        shouldCloseOnOverlayClick={false}
      >
        <AddressModal
          postCodeHandler={postCodeHandler}
          setPostCodeOpen={setPostCodeOpen}
        />
      </Modal>
      <RegistTitle>개인 사업자 정보를 입력해 주세요</RegistTitle>
      <RegistForm onSubmit={(e) => e.preventDefault()} tooltip={tooltip}>
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
              onClick={(e) => {
                setCheck({ ...check, name: !check.name });
                if (check.name) {
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
              tabIndex={1}
              type="text"
              placeholder="실명을 입력해주세요"
              autoFocus
              value={step3.nominee_name}
              onChange={(e) => {
                validationHandler(e, "nominee_name");
              }}
            />
          </div>
        </label>
        <label>
          <p>휴대전화 번호</p>
          <div className="input_div">
            <input
              tabIndex={2}
              placeholder="숫자만 입력해주세요"
              type="tel"
              pattern="\d*"
              value={step3.nominee_hphone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length <= 11) {
                  validationHandler(e, "nominee_hphone");
                }
              }}
            />
          </div>
        </label>
        <label style={{ position: "relative", marginBottom: "40px" }}>
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
          <div
            className="flex_form"
            onClick={() => setPostCodeOpen({ nominee: true, business: false })}
          >
            <div className="input_div">
              <input
                tabIndex={3}
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
                tabIndex={4}
                className="input_margin_top"
                type="text"
                placeholder="상세주소를 입력해주세요"
                value={step3.address.nominee_address}
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
              tabIndex={5}
              type="text"
              placeholder="사업장 이름을 입력해주세요"
              value={step3.business_name}
              onChange={(e) => validationHandler(e, "business_name")}
            />
          </div>
        </label>
        <label>
          <div className="flex_check">
            <p>사업장 주소</p>
            <div
              style={{ marginBottom: "12px" }}
              onClick={(e) => {
                setCheck({ ...check, address: !check.address });
                if (check.address) {
                  setStorageData({
                    ...storageData,
                    step3: {
                      ...step3,
                      address2: {
                        business_address_post: "",
                        business_address_road: "",
                        business_address_jibun: "",
                        business_address: "",
                      },
                    },
                  });
                } else {
                  inputRefBusiness.current?.focus();
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
                tabIndex={6}
                type="text"
                placeholder="주소를 검색해주세요"
                readOnly
                value={
                  step3.address2.business_address_post
                    ? `[${step3.address2.business_address_post}] ` +
                      step3.address2.business_address_road
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
                tabIndex={7}
                className="input_margin_top"
                type="text"
                placeholder="상세주소를 입력해주세요"
                value={step3.address2.business_address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
              tabIndex={8}
              placeholder="숫자만 입력해주세요"
              type="tel"
              pattern="\d*"
              value={step3.business_number}
              ref={inputRefBusiness}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length <= 10) {
                  validationHandler(e, "business_number");
                }
              }}
            />
          </div>
        </label>
        <label>
          <p>세금계산서 발행 이메일 주소</p>
          <div className="input_div">
            <input
              tabIndex={9}
              type="text"
              placeholder="help@charancha.com"
              value={step3.business_email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validationHandler(e, "business_email")
              }
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

export default Step3_2;
