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
import { Cancel } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SuccessDisplay from './components/Success';
import ResetPassword from './pages/register/ResetPassword';
import Setting from './components/setting/Setting';
import Profile from './components/profile/Profile';
import View from './components/view/View';

function App() {
	const authState = useSelector((state: RootState) => state.auth);
	const isAuthenticated = authState?.token;

	const [sessionId, setSessionId] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);

		if (query.get('success')) {
			setSuccess(true);
			setSessionId(query.get('session_id'));
		}
	}, [sessionId]);

	if (success && sessionId !== '') {
		return <SuccessDisplay sessionId={sessionId} />;
	}

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
					{isAuthenticated && (
						<Route
							path='/pricing'
							element={<Pricing setSessionId={setSessionId} />}
						/>
					)}
					{isAuthenticated && (
						<>
							<Route
								path='/success'
								element={<SuccessDisplay sessionId={sessionId} />}
							/>
							<Route path='/cancel' element={<Cancel />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/view' element={<View />} />
						</>
					)}
					<Route path='/setting' element={<Setting />} />
					<Route path='/reset-password' element={<ResetPassword />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
