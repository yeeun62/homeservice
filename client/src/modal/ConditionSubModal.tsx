import styled from "styled-components";

import { stickTop } from "../styles/recycle";

const ConditionDetailHeader = styled(stickTop)``;

function ConditionSubModal({
  header,
  content,
}: {
  header: string;
  content: any;
}) {
  return (
    <div>
      <ConditionDetailHeader>
        <img src="./left_arrow.png" alt="약관 뒤로 가기" />
        <span>{header}</span>
      </ConditionDetailHeader>
      {content}
    </div>
  );
}

export default ConditionSubModal;
