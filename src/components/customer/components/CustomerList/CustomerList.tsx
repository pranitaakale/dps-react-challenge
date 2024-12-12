import axios from 'axios';
import { useEffect, useState } from 'react';
import './CustomerList.css';

const CustomerList = () => {
	const [userDetails, setUserDetails] = useState([]);

	const fetchUsers = async () => {
		const response = await axios.get('https://dummyjson.com/users');
		console.log(response.data.users);

		setUserDetails(response.data.users);
	};

	const formatDate = (dateString: any) => {
		if (!dateString) return '';
		const [year, month, day] = dateString.split('-');
		return `${day}-${month}-${year}`;
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<div className="customerList">
			<div className="customerList_container">
				{userDetails && userDetails.length > 0 ? (
					<div className="customerList_containerDisplay">
						<table className="customerList_containerDisplayTable">
							<thead>
								<tr>
									<th>Name</th>
									<th>City</th>
									<th>Birth Date</th>
								</tr>
							</thead>
							<tbody>
								{userDetails.map((user: any, index: number) => (
									<tr key={index}>
										<td>
											{[
												user.firstName,
												user.lastName,
											].join(' ')}
										</td>
										<td>{user.address.city}</td>
										<td>{formatDate(user.birthDate)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div>No User Data to display.</div>
				)}
			</div>
		</div>
	);
};

export default CustomerList;
