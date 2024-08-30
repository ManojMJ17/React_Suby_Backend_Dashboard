import React from "react";

const Navbar = ({
	showLoginHandler,
	showRegisterHandler,
	showLogOut,
	logOutHandler,
}) => {
	const firmName = localStorage.getItem("firmName");

	return (
		<div className="navSection">
			<div className="company">Vendor Dashboard</div>
			<div className="firmName">
				<h1>Firm Name : {firmName}</h1>
			</div>
			<div className="userAuth">
				{!showLogOut ? (
					<>
						<span onClick={showLoginHandler}>Login / </span>
						<span onClick={showRegisterHandler}>Register</span>
					</>
				) : (
					<span onClick={logOutHandler}>Logout</span>
				)}
			</div>
		</div>
	);
};

export default Navbar;
