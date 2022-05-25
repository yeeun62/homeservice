import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Visual from "../components/main/Visual";
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
    transform: translate(-50%);

    @media screen and (max-width: 749px) {
      width: 100%;
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
        width: 15px;
        height: 15px;
        margin-right: 7.27px;
      }
    }

    .bold_span {
      font-weight: 700;
      margin-right: 8px;
    }
  }
`;

function CompletePage() {
  const [data, setData] = useState<any>();
  let isAlert: boolean = false;

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${
          process.env.REACT_APP_PORT
        }/api/handle/products/${window.location.search.slice(8)}`
        // `${process.env.REACT_APP_FORSALE}/ffc32180-d59f-11ec-9d64-0242ac120002`
      )
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        // console.log("complete 데이터 에러", err);
        if (!isAlert) {
          isAlert = true;
          alert("매물정보가 없어 실패하였습니다. 관리자에 문의하세요.");
        }
      });
  }, []);

  function completeHandler() {
    window.open("", "_self")?.close();
  }

  return (
    <>
      {data ? (
        <>
          <Header />
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
                visualSpan={`차량이 고객님께 빠르게 배송될 수 있도록 신청하신 내용을 확인 후 상담원이 연락 드리겠습니다.`}
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
