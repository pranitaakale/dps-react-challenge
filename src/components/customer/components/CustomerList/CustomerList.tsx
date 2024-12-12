import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import './CustomerList.css';
import useCustomerStore from '../../../../store/customerStore';

const CustomerList = () => {
	const searchQuery = useCustomerStore((state) => state.searchQuery);
	const selectedCity = useCustomerStore((state) => state.selectedCity);
	const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
	const [userDetails, setUserDetails] = useState<any[]>([]);
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

				const cities = data.users
					.map((user: any) => user.address.city)
					.filter(
						(city: string, index: number, self: string[]) =>
							self.indexOf(city) === index
					);

				useCustomerStore.getState().setCities(cities);
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
		if (!searchQuery && !selectedCity) {
			setFilteredUsers(userDetails);
		} else {
			const filtered = userDetails.filter((user) => {
				const fullName =
					`${user.firstName} ${user.lastName}`.toLowerCase();
				const matchesSearch =
					user.firstName
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					user.lastName
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					fullName.includes(searchQuery.toLowerCase());

				const matchesCity = selectedCity
					? user.address.city === selectedCity
					: true;

				return matchesSearch && matchesCity;
			});
			setFilteredUsers(filtered);
		}
	}, [searchQuery, selectedCity, userDetails, setFilteredUsers]);

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="customerList">
			<div className="customerList_container">
				{filteredUsers && filteredUsers.length > 0 ? (
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
								{filteredUsers.map((user, index) => (
									<tr
										key={index}
										ref={
											index === filteredUsers.length - 1
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
