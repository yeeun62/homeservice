import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import "./modal.css";

const AddressModalWrap = styled.div`
  background-color: #fff;
  height: 40px;

  div {
    margin: 0 auto;
    width: 94%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: 700;
      font-size: 13px;
    }

    .address_close {
      font-weight: 400;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .post_code {
    height: 470px !important;
  }
`;

function AddressModal({ postCodeHandler, setPostCodeOpen }: any) {
  return (
    <AddressModalWrap>
      <div>
        <p>주소검색</p>
        <p className="address_close" onClick={() => setPostCodeOpen(false)}>
          X
        </p>
      </div>
      <DaumPostcode className="post_code" onComplete={postCodeHandler} />
    </AddressModalWrap>
  );
}

export default AddressModal;
