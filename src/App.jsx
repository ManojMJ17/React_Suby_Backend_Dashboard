import React from "react";
import LandingPage from "./vendorDashboard/pages/LandingPage";
import NotFound from "./vendorDashboard/components/forms/NotFound";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default App;
