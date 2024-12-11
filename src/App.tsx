// import dpsLogo from './assets/DPS.svg';
import './App.css';
import Customer from './components/customer/Customer';

function App() {
	return (
		<>
			{/* <div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div> */}
			<div className="home-card">
				<Customer />
				{/* <p>Your solution goes here 😊</p> */}
			</div>
		</>
	);
}

export default App;
