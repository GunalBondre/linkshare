import './App.css';
import Header from './components/navigation/Header';
import Home from './pages/home/Home';
import Login from './pages/register/Login';
import Register from './pages/register/Register';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Pricing from './pages/pricing/Pricing';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './pages/pricing/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import Success from './components/Success';
import { Cancel } from '@mui/icons-material';

function App() {
	const authState = useSelector((state: RootState) => state.auth);
	const isAuthenticated = authState?.token;
	const stripePromise = loadStripe(
		'pk_test_51OKeOlSJHRwPbqT2PnAnZ3j7LO0N06tjCd0lIQVV1hma0CW0xypdo19EFMYgpsJiVoKeFlziX07ABoYUpzzwuwA600V97jKf4P'
	);
	return (
		<div>
			<Router>
				<Header />
				<ToastContainer />
				<Routes>
					{!isAuthenticated ? (
						<Route path='*' element={<Navigate to='/login' />} />
					) : (
						<Route path='/' element={<Home />} />
					)}
					{isAuthenticated ? (
						<Route path='/login' element={<Navigate to='/' />} />
					) : (
						<Route path='/login' element={<Login />} />
					)}
					{isAuthenticated ? (
						<Route path='/register' element={<Navigate to='/' />} />
					) : (
						<Route path='/register' element={<Register />} />
					)}
					{isAuthenticated && <Route path='/pricing' element={<Pricing />} />}
					{isAuthenticated && (
						<>
							<Route path='/success' element={<Success />} />
							<Route path='/cancel' element={<Cancel />} />
						</>
					)}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
