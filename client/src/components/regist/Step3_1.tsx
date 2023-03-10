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

function Step3_1({
  setActivate,
  setStorageData,
  storageData,
  nextInput,
  postCodeOpen,
  setPostCodeOpen,
}: ActiveProps) {
  const [check, setCheck] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<boolean>(false);
  const step3 = storageData.step3;
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (data && setPostCodeOpen) {
      const { roadAddress, jibunAddress, zonecode } = data;
      setPostCodeOpen({ nominee: false, business: false });
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
        isOpen={postCodeOpen ? postCodeOpen : false}
        onRequestClose={() =>
          setPostCodeOpen &&
          setPostCodeOpen((p) => ({ nominee: !p.nominee, business: false }))
        }
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
      <RegistTitle>????????? ????????? ????????? ?????????</RegistTitle>
      <RegistForm
        onSubmit={(e) => e.preventDefault()}
        tooltip={tooltip}
        onKeyDown={(e) => nextInput(e, "step3-1-")}
      >
        <label>
          <div className="flex_check">
            <p>??????</p>
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
                alt="????????????"
              />
              <p>???????????? ??????</p>
            </div>
          </div>
          <div className="input_div">
            <input
              name="step3-1-1"
              type="text"
              placeholder="????????? ??????????????????"
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
          <p>???????????? ??????</p>
          <div className="input_div">
            <input
              name="step3-1-2"
              placeholder="????????? ??????????????????"
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
            ?????????????????????
            <img
              src="/img/w_icon_question_medium_gray.svg"
              alt="????????? ????????????"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setTooltip(!tooltip);
                e.preventDefault();
              }}
            />
          </p>
          <Tooltip className="tooltip">
            ???????????? ????????? ???????????? ????????? ?????????.
          </Tooltip>
          <div
            className="flex_form"
            onClick={() =>
              setPostCodeOpen &&
              setPostCodeOpen({ nominee: true, business: false })
            }
          >
            <div className="input_div">
              <input
                name="step3-1-3"
                type="text"
                placeholder="????????? ??????????????????"
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
            <RegistSubBtn backgrondColor="#0740E4">?????? ??????</RegistSubBtn>
          </div>
          <div style={{ position: "relative", marginTop: "12px" }}>
            <div className="input_div">
              <input
                name="step3-1-4"
                className="input_margin_top"
                type="text"
                value={step3.address.nominee_address}
                placeholder="??????????????? ??????????????????"
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
                alt="???????????? ?????????"
              />
              <p>?????? ????????? ?????????</p>
            </div>
          </div>
        </PublicCheck>
      </RegistForm>
    </>
  );
}

export default Step3_1;
