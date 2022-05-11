import styled from "styled-components";
import Header from "../components/Header";
import Visual from "../components/main/Visual";
import BottomBtn from "../components/BottomBtn";
import { PageWrap } from "../styles/recycle";

const CompleteWrap = styled(PageWrap)`
  .complete_footer {
    border-top: 1px solid #d9d9d9;
    padding-top: 16px;
    color: #3c3c3c;
    font-size: 11px;
    line-height: 16px;
    font-weight: 400;

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

function CompletePage({ data }: any) {
  return (
    <>
      <Header />
      <CompleteWrap>
        <div>
          <Visual
            data={data}
            visualTitle="신청 완료되었습니다!"
            visualSpan={`차량이 고객님께 빠르게 배송될 수 있도록 신청하신 내용을 확인 후 상담원이 연락 드리겠습니다.`}
          />
          <div className="complete_footer">
            <p>홈서비스에 대한 궁금하신 사항은 고객센터로 문의해주세요.</p>
            <div>
              <img src="./img/icon_footer_call.png" alt="고객센터 전화" />
              <span>고객센터: </span>
              <span className="bold_span"> 02-466-7923</span>
              <span>운영시간: </span>
              <span className="bold_span"> 10:00 ~ 17:00</span>
            </div>
          </div>
        </div>
        <div>
          <BottomBtn btnContent="닫기" path="/" />
        </div>
      </CompleteWrap>
    </>
  );
}

export default CompletePage;
