function Visual({ data }: any) {
  const { desc1, desc2, desc3, desc4, desc5, price, image } = data;

  return (
    <div className="imgWrap">
      <h3>안전하게 배송해드리겠습니다</h3>
      <img src={image} alt={desc5} />
      <div>
        <span>{desc1}</span>
        <span>{desc2}</span>
        <span>{desc3}</span>
        <span>{desc4}원</span>
      </div>
      <h3>{desc5}</h3>
      <h3 className="price">{price}원</h3>
    </div>
  );
}

export default Visual;
