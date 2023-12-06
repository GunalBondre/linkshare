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

function App() {
	const authState = useSelector((state: RootState) => state.auth);
	const isAuthenticated = authState?.token;

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
				</Routes>
			</Router>
		</div>
	);
}

export default App;
