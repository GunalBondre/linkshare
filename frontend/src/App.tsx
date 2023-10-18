import './App.css';
import Header from './components/navigation/Header';
import Home from './pages/home/Home';
import Login from './pages/register/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
