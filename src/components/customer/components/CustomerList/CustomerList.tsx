import axios from 'axios';
import { useEffect, useState } from 'react';

const CustomerList = () => {
	const [userDetails, setUserDetails] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await axios.get('https://dummyjson.com/users');
			console.log(response.data);

			setUserDetails(response.data);
		};

		fetchUsers();
	}, []);
	return (
		<div>
			{userDetails ? (
				<div>Display details</div>
			) : (
				<div>No User Data to display.</div>
			)}
		</div>
	);
};

export default CustomerList;
