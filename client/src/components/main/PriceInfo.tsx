function PriceInfo({ price, desc6 }: any) {
  console.log(desc6);
  return (
    <>
      <div className="priceWrap">
        <h3>구매 시 필요한 금액이에요</h3>
        <ul className="ul">
          <li key="price1">
            차량 가격 <span>{price}원</span>
          </li>
          <li key="price2">
            홈서비스 이용료 <span>0원</span>
          </li>
          <li key="price3">
            부대비용
            <span>1,530,000원</span>
            <ul>
              <li key="이전비">
                이전비 <span>1,200,000원</span>
              </li>
              <li key="매도비">
                관리비용(매도비)? <span>333,000원</span>{" "}
              </li>
              {/* 툴팁 */}
            </ul>
          </li>
          <li key="price4">
            배송비 <span>4,000~165,000원</span>
          </li>
          <li key="price5">
            <span>예상 합계</span> <span>15,994,000원</span>
          </li>
        </ul>
      </div>
      <ul>
        {desc6.map((el: string, i: number) => {
          return <li key={i + "key"}>{el}</li>;
        })}
      </ul>
    </>
  );
}

export default PriceInfo;
