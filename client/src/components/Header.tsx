import { useEffect, useState } from "react";
import styled from "styled-components";
import Progress from "./regist/Progress";
import { RegistTitle } from "../styles/recycle";
import Modal from "react-modal";
import CloseModal from "../modal/CloseModal";
import "../modal/modal.css";

const HeaderWrapper = styled.div`
	background-color: #fff;
	display: flex;
	align-items: center;
	width: 100%;
	height: 56px;

	.close {
		width: 38px;
		height: 38px;
		margin-left: 8px;
	}

	.beta {
		width: 33px;
		height: 18px;
		margin-left: 4px;
	}

	img {
		cursor: pointer;
	}

	@media screen and (min-width: 750px) {
		.close {
			display: none;
		}

		.header_title {
			margin-left: 32px;
		}
	}

	@media screen and (max-width: 749px) {
		position: sticky;
		top: 0;
		z-index: 100;
	}
`;

function Header({
	step,
	data,
	page,
}: {
	step?: number;
	data?: any;
	page: string;
}) {
	const [closeModal, setCloseModal] = useState(false);

	return (
		<>
			<Modal
				isOpen={closeModal}
				onRequestClose={() => setCloseModal(!closeModal)}
				overlayClassName="overlay"
				className="close_modal"
				ariaHideApp={false}
			>
				<CloseModal
					setCloseModal={setCloseModal}
					data={data}
					mainTxt="홈서비스 신청을 취소하시겠습니까?"
				/>
			</Modal>
			<HeaderWrapper>
				<img
					className="close"
					src="./img/icon_header_cancel_circle.svg"
					alt="닫기버튼"
					onClick={() => setCloseModal(true)}
				/>
				<RegistTitle className="header_title">차란차 홈서비스 신청</RegistTitle>
				<img className="beta" src="./img/icon_beta_black.svg" alt="베타" />
				{page === "1" && <Progress step={step} />}
			</HeaderWrapper>
		</>
	);
}

export default Header;
