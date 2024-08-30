import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<>
			<div className="error-page">
				<Link
					to="/"
					style={{ fontSize: "2rem", color: "", textDecoration: "None" }}
				>
					Go Back
				</Link>
				<h1>404</h1>
				<h1>Page Not Found</h1>
			</div>
		</>
	);
};

export default NotFound;
