import { Link } from "react-router-dom";
import { MainBtn, Footer } from "../styles/recycle";

function BottomBtn({
  btnContent,
  path,
  activat,
}: {
  btnContent: string;
  path: string;
  activat?: boolean;
}) {
  return (
    <Footer>
      <Link to={path}>
        <div>
          <MainBtn
            backgrondColor="#0740E4"
            color="#fff"
            border="none"
            activat={activat !== undefined ? activat : true}
            className="bold_text"
          >
            {btnContent}
          </MainBtn>
        </div>
      </Link>
    </Footer>
  );
}

export default BottomBtn;
