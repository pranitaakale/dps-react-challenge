import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import './CustomerList.css';
import useCustomerStore from '../../../../store/customerStore';

const CustomerList = () => {
	const searchQuery = useCustomerStore((state) => state.searchQuery);
	const selectedCity = useCustomerStore((state) => state.selectedCity);
	const highlightOldest = useCustomerStore((state) => state.highlightOldest);

	const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
	const [userDetails, setUserDetails] = useState<any[]>([]);
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	//   const observer = useRef<IntersectionObserver | null>(null);
	const limit = 30;

	const fetchUsers = async () => {
		if (!hasMore) return;

		try {
			const response = await axios.get(
				`https://dummyjson.com/users?limit=${limit}&skip=${skip}`
			);
			const data = response.data;

			if (data.users.length > 0) {
				const usersWithHighlight = data.users.map((user: any) => ({
					...user,
					isHighlighted: false,
				}));
				// console.log(data);

				setUserDetails((prevUsers) => [
					...prevUsers,
					...usersWithHighlight,
				]);
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
				// console.log('stopped');
				applyHighlightLogic();
				setHasMore(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const applyHighlightLogic = () => {
		let updatedUsers = [...userDetails];

		// if (!hasMore) {
		const oldestUsers: { [key: string]: any } = {};

		updatedUsers.forEach((user) => {
			const city = user.address.city;
			if (
				!oldestUsers[city] ||
				new Date(user.birthDate) < new Date(oldestUsers[city].birthDate)
			) {
				oldestUsers[city] = user;
			}
		});

		updatedUsers = updatedUsers.map((user) => ({
			...user,
			isHighlighted: oldestUsers[user.address.city]?.id === user.id,
		}));
		// }
		// else {
		// 	updatedUsers = updatedUsers.map((user) => ({
		// 		...user,
		// 		isHighlighted: false,
		// 	}));
		// }

		// setFilteredUsers(updatedUsers);
		setUserDetails(updatedUsers);
	};

	// const lastUserElementRef = (node: HTMLElement | null) => {
	//   if (observer.current) observer.current.disconnect();

	//   observer.current = new IntersectionObserver(
	//     (entries) => {
	//       if (entries[0].isIntersecting && hasMore) {
	//         fetchUsers();
	//       }
	//     },
	//     { threshold: 1.0 }
	//   );

	//   if (node) observer.current.observe(node);
	// };

	const formatDate = (dateString: string) => {
		if (!dateString) return '';
		const [year, month, day] = dateString.split('-');
		return `${day}-${month}-${year}`;
	};

	useEffect(() => {
		if (!searchQuery && !selectedCity) {
			setFilteredUsers(userDetails);
		} else {
			// console.log(userDetails);

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
	}, [searchQuery, selectedCity, userDetails]);

	useEffect(() => {
		fetchUsers();
	}, [userDetails]);

	// useEffect(() => {
	// 	// console.log(userDetails);

	// 	applyHighlightLogic();
	// }, [hasMore, highlightOldest]);

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
										style={{
											backgroundColor:
												user.isHighlighted &&
												highlightOldest
													? '#b7b7b7'
													: 'transparent',
											color:
												user.isHighlighted &&
												highlightOldest
													? '#797979'
													: '#b7b7b7',
										}}
										// ref={
										//   index === filteredUsers.length - 1
										//     ? lastUserElementRef
										//     : null
										// }
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
