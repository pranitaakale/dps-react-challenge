import { useState } from 'react';
import './CustomerForm.css';
import useCustomerStore from '../../../../store/customerStore';

const CustomerForm = () => {
	const searchQuery = useCustomerStore((state) => state.searchQuery);
	const setSearchQuery = useCustomerStore((state) => state.setSearchQuery);
	const cities = useCustomerStore((state) => state.cities);
	const setSelectedCity = useCustomerStore((state) => state.setSelectedCity);
	const selectedCity = useCustomerStore((state) => state.selectedCity);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCity(e.target.value);
	};

	const [formData, setFormData] = useState({
		name: '',
		city: '',
		highlight: false,
	});

	// const handleChange = (e: any) => {
	// 	const { name, value, type, checked } = e.target;
	// 	setFormData({
	// 		...formData,
	// 		[name]: type === 'checkbox' ? checked : value,
	// 	});
	// };

	// const handleSubmit = (e: any) => {
	// 	e.preventDefault();
	// 	console.log('Form Data Submitted:', formData);
	// };

	return (
		<div className="customerform">
			<form className="customerform_container">
				<div className="customerform_containerField">
					<label>Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={searchQuery}
						onChange={handleSearchChange}
						// value={formData.name}
						// onChange={handleChange}
					/>
				</div>

				<div className="customerform_containerField">
					<label>City</label>
					<select
						id="city"
						name="city"
						value={selectedCity}
						// value={formData.city}
						onChange={handleCityChange}
						// onChange={handleChange}
						className="customerform_containerFieldSelect"
					>
						<option value="">All Cities</option>
						{cities.map((city, index) => (
							<option key={index} value={city}>
								{city}
							</option>
						))}
					</select>
				</div>

				<div className="customerform_containerField">
					<label className="customerform_containerFieldCheckbox">
						<p>Highlight oldest per city</p>
						<input
							type="checkbox"
							name="highlight"
							checked={formData.highlight}
							// onChange={handleChange}
						/>
					</label>
				</div>
			</form>
		</div>
	);
};

export default CustomerForm;
