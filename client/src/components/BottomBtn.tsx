import { Link } from "react-router-dom";
import { MainBtn, Footer } from "../styles/recycle";

function BottomBtn({ btnContent, path }: { btnContent: string; path: string }) {
  return (
    <Footer>
      <Link to={path}>
        <div>
          <MainBtn
            backgrondColor="#0740E4"
            color="#fff"
            border="none"
            activat={true}
          >
            {btnContent}
          </MainBtn>
        </div>
      </Link>
    </Footer>
  );
}

export default BottomBtn;
