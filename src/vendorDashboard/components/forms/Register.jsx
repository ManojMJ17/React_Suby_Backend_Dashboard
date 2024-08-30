import React, { useState } from "react";
import { API_URL } from "../../helpers/AppPath";

const Register = ({ showLoginHandler }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log({ username, email, password });
			const response = await fetch(`${API_URL}/vendor/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			const data = await response.json();
			console.log(data);
			if (response.ok) {
				setUsername("");
				setEmail("");
				setPassword("");
				showLoginHandler();
				alert("Vendor Registered Successfully");
			} else {
				setError(data.message || "Registration failed");
			}
		} catch (error) {
			console.error("Registration Failed", error);
			setError("An error occurred during registration.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="registerSection">
			<div>
				<h1>
					<u>Vendor Registration</u>
				</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="sub">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						value={username}
						placeholder="Enter Username"
						id="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="sub">
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						name="email"
						value={email}
						placeholder="Enter Your @email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="sub">
					<label htmlFor="password">Password:</label>
					<input
						type="text"
						name="password"
						value={password}
						placeholder="Enter Password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="button">
					<button type="submit">Register</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
