import { Button } from "../../styles/recycle";

function Pay() {
  return (
    <div>
      <h3>결제 수단을 선택해주세요</h3>
      <div className="buttonWrapper">
        <Button type="button" className="cashBtn">
          현금
        </Button>
        <Button type="button" className="bothBtn">
          현금 + 할부
        </Button>
      </div>
    </div>
  );
}

export default Pay;
