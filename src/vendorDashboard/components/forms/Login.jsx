import React, { useState } from "react";
import { API_URL } from "../../helpers/AppPath";

const Login = ({ showWelcomeHandler }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const loginHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${API_URL}/vendor/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			console.log(data);

			if (response.ok) {
				alert("Login Successfull");
				localStorage.setItem("loginToken", data.token);
				showWelcomeHandler();
			} else {
				setError(data.message || "Loginfailed");
			}
			const vendorId = data.vendorId;
			console.log("checking for VendorId:", vendorId);
			const vendorResponse = await fetch(
				`${API_URL}/vendor/single-vendor/${vendorId}`
			);

			window.location.reload();
			const vendorData = await vendorResponse.json();
			if (vendorResponse.ok) {
				const vendorFirmId = vendorData.vendorFirmId;
				const vendorFirmName = vendorData.vendor.firm[0].firmName;
				localStorage.setItem("firmId", vendorFirmId);
				localStorage.setItem("firmName", vendorFirmName);
			}
		} catch (error) {
			console.error("Login Failed", error);
			setError("An error occurred during login.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="loginSection">
			<div>
				<h1>
					<u>Vendor Login</u>
				</h1>
			</div>
			<form action="" onSubmit={loginHandler}>
				<div className="sub">
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						name="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						placeholder="Enter Your @email"
						id="email"
					/>
				</div>
				<div className="sub">
					<label htmlFor="password">Password:</label>
					<input
						type="text"
						name="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						placeholder="Enter Password"
						id="password"
					/>
				</div>
				<div className="button">
					<button type="submit">Log In</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
