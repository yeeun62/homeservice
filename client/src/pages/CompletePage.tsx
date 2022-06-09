import { useEffect, useState } from "react";
import styled from "styled-components";
import Visual from "../components/main/Visual";
import queryString from "query-string";
import axios from "axios";
import { PageWrap, Footer, MainBtn } from "../styles/recycle";
import Lottie from "lottie-react-web";
import completeAnimation from "../lottie_00.json";
import LoadingPage from "./LoadingPage";

const CompleteWrap = styled(PageWrap)`
  .lottie_wrap {
    position: fixed;
    top: 0;
    height: 60vh;
    left: 50vw;
    width: 100%;
    transform: translate(-50%);
    animation: lottie 1.3s;
    animation-fill-mode: forwards;

    @keyframes lottie {
      from {
        visibility: visible;
      }
      to {
        visibility: hidden;
      }
    }
  }

  .complete_footer {
    border-top: 1px solid #d9d9d9;
    padding-top: 16px;
    color: #3c3c3c;
    font-size: 11px;
    line-height: 16px;
    font-weight: 400;

    p {
      margin-bottom: 3px;
    }

    div {
      display: flex;
      height: 17px;
      align-items: center;

      img {
        width: 12px;
        height: 12px;
        margin-right: 7px;
      }
    }

    .bold_span {
      font-weight: 700;
      margin-right: 8px;
    }
  }

  @media screen and (min-width: 750px) {
    border-top: 1px solid #d9d9d9;
  }
`;

function CompletePage() {
  const [data, setData] = useState<any>();
  let isAlert: boolean = false;

  useEffect(() => {
    const query = queryString.parse(window.location.search);

    if (query.sellNo) {
      axios
        .get(
          `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/handle/products/${query.sellNo}`
          // `${process.env.REACT_APP_FORSALE}/${query.sellNo}`
        )
        .then((data) => {
          if (data.data.status) {
            if (!isAlert) {
              isAlert = true;
              alert("매물정보가 없어 실패하였습니다. 관리자에 문의하세요.");
            }
          } else {
            setData(data.data);
          }
        });
    }
  }, []);

  function completeHandler() {
    localStorage.clear();
  }

  return (
    <>
      {data ? (
        <>
          <CompleteWrap>
            <div className="lottie_wrap">
              <Lottie
                options={{
                  animationData: completeAnimation,
                  loop: false,
                  autoplay: true,
                }}
              />
            </div>
            <div>
              <Visual
                data={data}
                visualTitle="신청 완료되었습니다!"
                visualSpan={`차량이 고객님께 빠르게 배송될 수 있도록 \n 신청하신 내용을 확인 후 상담원이 연락 드리겠습니다.`}
                bottom={true}
              />
              <div className="complete_footer">
                <p>홈서비스에 대한 궁금하신 사항은 고객센터로 문의해주세요.</p>
                <div>
                  <img src="./img/w_icon_footer_call.svg" alt="고객센터 전화" />
                  <span>고객센터: </span>
                  <span className="bold_span">02-466-7923</span>
                  <span>운영시간: </span>
                  <span className="bold_span">10:00 ~ 17:00</span>
                </div>
              </div>
            </div>
            <Footer>
              <div>
                <MainBtn
                  backgrondColor="#0740E4"
                  color="#fff"
                  border="none"
                  activate={true}
                  style={{ fontWeight: "700" }}
                  onClick={completeHandler}
                >
                  닫기
                </MainBtn>
              </div>
            </Footer>
          </CompleteWrap>
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default CompletePage;
