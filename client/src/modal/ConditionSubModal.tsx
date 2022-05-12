import styled from "styled-components";
import { stickTop } from "../styles/recycle";
const ConditionSubModalHeader = styled(stickTop)``;

function ConditionSubModal({
  header,
  content,
}: {
  header: string;
  content: any;
}) {
  return (
    <div>
      <ConditionSubModalHeader>
        <img src="./left_arrow.png" alt="약관 뒤로 가기" />
        <span>{header}</span>
      </ConditionSubModalHeader>
      {content}
    </div>
  );
}

export default ConditionSubModal;
