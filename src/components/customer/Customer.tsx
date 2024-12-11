import CustomerForm from './components/CustomerForm/CustomerForm';
import CustomerList from './components/CustomerList/CustomerList';
import './Customer.css';

const Customer = () => {
	return (
		<div className="customer">
			<div className="customer_container">
				<CustomerForm />
				<CustomerList />
			</div>
		</div>
	);
};

export default Customer;
