import { useState, StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import MainPage from "./pages/MainPage";
import RegistPage from "./pages/RegistPage";
import CompletePage from "./pages/CompletePage";

// app에서 서버와 통신하여 데이터 받아온 후 다른 페이지로 뿌리기

const AppWrap = styled.div`
	min-width: 360px;
	max-width: 1200px;
	margin: auto;

	@media screen and( max-width: 750px) {
		min-height: 800px;
	}
`;

function App() {
	const [step, setStep] = useState<number>(1);
	const [data] = useState({
		topDesc:
			"전문과와 1:1 라이브로 차량을 확인후 원하는 곳으로 받아보세요. 3+1일 동안 타 보고 맘에 안들면 환불 할 수 있습니다.",
		image: "./img/1808801960R1 1.png",
		desc1: "19년 05월(20년형)",
		desc2: "21,678km",
		desc3: "디젤",
		desc4: "365고8752",
		desc5:
			"현대 넥쏘 프리미엄 인텔리전스 Safty+ 롱 레인지 KRELL 에디션(2020년 한정 블루링크 프리미엄 멤버스 패키지), 현대 넥쏘 프리미엄 인텔리전스 Safty+ 롱 레인지 KRELL 에디션(2020년 한정 블루링크 프리미엄 멤버스 패키지)",
		price: "15,000,000",
		desc6: [
			"견적금액은 배송비에 의해 변동될 수 있습니다. (배송비 최대금액 165,000원으로 계산 선반영되었습니다.)",
			"배송비는 차량 출발지와 도착지 거리에 따라 책정되며, 상담단계에서 확정됩니다.",
			"이전비는 차액 발생 시 계좌로 환급해드립니다.",
		],
	});

	return (
		<StrictMode>
			<AppWrap>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<MainPage data={data} />} />
						<Route
							path="/regist"
							element={<RegistPage step={step} setStep={setStep} />}
						/>
						<Route path="/complete" element={<CompletePage data={data} />} />
					</Routes>
				</BrowserRouter>
			</AppWrap>
		</StrictMode>
	);
}

export default App;
