import { useState } from 'react';
import './CustomerForm.css';
import useCustomerStore from '../../../../store/customerStore';

const CustomerForm = () => {
	const searchQuery = useCustomerStore((state) => state.searchQuery);
	const setSearchQuery = useCustomerStore((state) => state.setSearchQuery);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
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
						value={formData.city}
						// onChange={handleChange}
						className="customerform_containerFieldSelect"
					>
						<option value="" disabled>
							Select city
						</option>
						<option value="1">city1</option>
						<option value="2">city2</option>
						<option value="3">city3</option>
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
