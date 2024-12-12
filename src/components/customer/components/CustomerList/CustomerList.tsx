import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import './CustomerList.css';

const CustomerList = () => {
	const [userDetails, setUserDetails] = useState<any[]>([]); // TypeScript array type
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const observer = useRef<IntersectionObserver | null>(null);
	const limit = 30;

	const fetchUsers = async () => {
		if (!hasMore) return;

		try {
			const response = await axios.get(
				`https://dummyjson.com/users?limit=${limit}&skip=${skip}`
			);
			const data = response.data;

			if (data.users.length > 0) {
				setUserDetails((prevUsers) => [...prevUsers, ...data.users]);
				setSkip((prevSkip) => prevSkip + limit);
			}

			if (skip + limit >= data.total) {
				setHasMore(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const lastUserElementRef = (node: HTMLElement | null) => {
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore) {
					fetchUsers();
				}
			},
			{ threshold: 1.0 }
		);

		if (node) observer.current.observe(node);
	};

	const formatDate = (dateString: string) => {
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
								{userDetails.map((user, index) => (
									<tr
										key={index}
										ref={
											index === userDetails.length - 1
												? lastUserElementRef
												: null
										}
									>
										<td>
											{[
												user.firstName,
												user.lastName,
											].join(' ')}
										</td>
										<td>{user.address?.city || 'N/A'}</td>
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
