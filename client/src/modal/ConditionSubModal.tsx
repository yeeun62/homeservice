import styled from "styled-components";
import { stickTop } from "../styles/recycle";
import { SubModal } from "./ConditionModal";

const ConditionSubModalHeader = styled(stickTop)`
  img {
    width: 32px;
    height: 32px;
  }
`;

function ConditionSubModal({
  title,
  content,
  setSubModal,
}: {
  title: string;
  content: any;
  setSubModal: React.Dispatch<React.SetStateAction<SubModal>>;
}) {
  return (
    <div>
      <ConditionSubModalHeader>
        <img src="./img/icon_navigation_back_black.svg" alt="약관 뒤로 가기" />
        <span>{title}</span>
      </ConditionSubModalHeader>
      {content}
    </div>
  );
}

export default ConditionSubModal;
