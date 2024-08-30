import React, { useEffect, useState } from "react";
import { API_URL } from "../../helpers/AppPath";

const AddFirm = () => {
	const [firmName, setFirmName] = useState("");
	const [area, setArea] = useState("");
	const [category, setCategory] = useState([]);
	const [region, setRegion] = useState([]);
	const [offer, setOffer] = useState("");
	const [file, setFile] = useState(null);

	const handleCategoryChange = (event) => {
		const value = event.target.value;
		if (category.includes(value)) {
			setCategory(category.filter((item) => item != value));
		} else {
			setCategory([...category, value]);
		}
	};

	const handleRegionChange = (event) => {
		const value = event.target.value;
		if (region.includes(value)) {
			setRegion(region.filter((item) => item != value));
		} else {
			setRegion([...region, value]);
		}
	};

	const handleImageUpload = (event) => {
		const selectedImage = event.target.value;
		setFile(selectedImage);
	};

	const handleFirmSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginToken = localStorage.getItem("loginToken");
			if (!loginToken) {
				console.error("User not Authenticated");
			}

			const formData = new FormData();
			formData.append("firmName", firmName);
			formData.append("area", area);
			formData.append("offer", offer);
			formData.append("image", file);

			category.forEach((value) => {
				formData.append("category", value);
			});

			region.forEach((value) => {
				formData.append("region", value);
			});

			const response = await fetch(`${API_URL}/firm/add-firm`, {
				method: "POST",
				headers: {
					token: `${loginToken}`,
				},
				body: formData,
			});
			const data = await response.json();

			if (response.ok) {
				console.log(data);
				setFirmName("");
				setArea("");
				setCategory([]);
				setRegion([]);
				setOffer("");
				setFile(null);
				alert("Firm added Successfully");
			} else if (data.message === "vendor can have only one firm") {
				alert("Firm exists. Only One Firm Can be Added");
			} else {
				alert("Failed to add Firm");
			}

			console.log("firmId: ", data.firmId);

			const firmId = data.firmId;

			localStorage.setItem("firmId", firmId);
		} catch (error) {
			console.error("Failed to add Firm");
		}
	};

	return (
		<div className="firmSection">
			<div>
				<h1>Add Firm</h1>
			</div>

			<form action="" onSubmit={handleFirmSubmit}>
				<div className="tableForm">
					<div className="firm-fields">
						<label htmlFor="firm-name">
							Firm Name:
							<input
								type="text"
								name="firmName"
								id="firm-name"
								value={firmName}
								onChange={(e) => setFirmName(e.target.value)}
							/>
						</label>
					</div>
					<div className="firm-fields">
						<label htmlFor="firm-area">
							Area:
							<input
								type="text"
								name="area"
								id="firm-area"
								value={area}
								onChange={(e) => setArea(e.target.value)}
							/>
						</label>
					</div>

					{/* // Category */}

					<div className="checkinp">
						<label htmlFor="firm-cat">Category:</label>
						<div className="checkboxcontainer">
							<label htmlFor="">Veg</label>
							<input
								type="checkbox"
								checked={category.includes("veg")}
								value="veg"
								onChange={handleCategoryChange}
							/>
						</div>
						<div className="checkboxcontainer">
							<label htmlFor="">Non-veg</label>
							<input
								type="checkbox"
								checked={category.includes("non-veg")}
								value="non-veg"
								onChange={handleCategoryChange}
							/>
						</div>
					</div>

					{/* //	Region */}

					<div className="rcheckinp">
						<label htmlFor="firm-reg">Region:</label>
						<div className="rcheckboxcontainer">
							<label htmlFor="south-indian">South-Indian</label>
							<input
								type="checkbox"
								checked={region.includes("south-indian")}
								value="south-indian"
								id="south-indian"
								onChange={handleRegionChange}
							/>
						</div>
						<div className="rcheckboxcontainer">
							<label htmlFor="north-indian">North-Indian</label>
							<input
								type="checkbox"
								checked={region.includes("north-indian")}
								value="north-indian"
								id="north-indian"
								onChange={handleRegionChange}
							/>
						</div>
						<div className="rcheckboxcontainer">
							<label htmlFor="chinese">Chinese</label>
							<input
								type="checkbox"
								checked={region.includes("chinese")}
								value="chinese"
								id="chinese"
								onChange={handleRegionChange}
							/>
						</div>
						<div className="rcheckboxcontainer">
							<label htmlFor="bakery">Bakery</label>
							<input
								type="checkbox"
								checked={region.includes("bakery")}
								value="bakery"
								id="bakery"
								onChange={handleRegionChange}
							/>
						</div>
					</div>

					<div className="firm-fields">
						<label htmlFor="firm-off">
							Offer:
							<input
								type="text"
								name="offer"
								id="firm-off"
								value={offer}
								onChange={(e) => setOffer(e.target.value)}
							/>
						</label>
					</div>
					<div className="firm-fields">
						<label htmlFor="firm-img">
							Firm Image:
							<input type="file" onChange={handleImageUpload} id="firm-img" />
						</label>
					</div>
				</div>
				<div className="firm-btn">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default AddFirm;
