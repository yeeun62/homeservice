import styled from "styled-components";
import { stickTop, PageWrap } from "../styles/recycle";
import { SubModal } from "./ConditionModal";

const ConditionSubWrap = styled(PageWrap)`
	height: 100vh;
	z-index: 500;
	background: #fff;
`;

const ConditionSubModalHeader = styled(stickTop)`
	img {
		width: 32px;
		height: 32px;
	}
`;

interface SubModalProp {
	subModal: SubModal;
	setSubModal: React.Dispatch<React.SetStateAction<SubModal>>;
}

function ConditionSubModal({ subModal, setSubModal }: SubModalProp) {
	return (
		<ConditionSubWrap>
			<ConditionSubModalHeader>
				<img
					src="./img/icon_navigation_back_black.svg"
					alt="약관 뒤로 가기"
					onClick={() => setSubModal({ ...subModal, open: false })}
				/>
				<span>{subModal.title}</span>
			</ConditionSubModalHeader>
			{subModal.content}
		</ConditionSubWrap>
	);
}

export default ConditionSubModal;
