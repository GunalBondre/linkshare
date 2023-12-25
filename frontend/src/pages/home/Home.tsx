import LinkForm from '../../components/linkform/LinkForm';
import Mockups from '../../components/mobileMockup/Mockup';
import './home.scss';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useEffect } from 'react';
import {
	getUser,
	logoutUser,
	setUserInLocalStorage,
} from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteLink } from '../../redux/linkSlice';

const Home = () => {
	const dispatch = useDispatch<AppDispatch>();
	const linkData = useSelector((state: RootState) => state.links);
	const authData = useSelector((state: RootState) => state?.auth);
	const { collection } = linkData;
	useEffect(() => {
		const checkTokenValidity = async () => {
			const token = localStorage.getItem('token');

			if (token) {
				const decoded_token = jwtDecode<JwtPayload>(token || '') || null;
				const currentTime = Date.now() / 1000;
				if (decoded_token.exp && currentTime > decoded_token.exp) {
					try {
						await dispatch(logoutUser()); // Await the logoutUser async thunk
						setUserInLocalStorage(null); // Save user data in local storage
					} catch (error) {
						console.error('Logout error:', error);
					}
				}
			}
		};

		checkTokenValidity();
	}, [dispatch]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				await dispatch(getUser(authData?.user?.email || ''));
			} catch (error) {
				console.log('Error fetching user:', error);
				dispatch(logoutUser());
			}
		};

		if (authData?.user?.email) {
			fetchUser();
		} else {
			dispatch(logoutUser());
		}
	}, [authData?.user?.email, dispatch]);

	const handleDeleteClick = (linkid: string) => {
		console.log(linkid, 'linkid');

		dispatch(deleteLink(linkid));
	};
	return (
		<div>
			<div className='home'>
				<div className='home__wrapper'>
					<div className='home__left'>
						<Mockups />
					</div>
					<div className='home__right'>
						<>
							<LinkForm />
							<div className='home__links'>
								<div className='title'>My Links</div>
								{/* <DraggableCard data={collection} /> */}
								<div className='link-container'>
									{collection.map((items) => (
										<>
											<div className='card'>
												<div className='info'>
													<h3>{items?.title}</h3>
													<p>{items.link}</p>
												</div>

												<div className='action'>
													<button
														className='link-button'
														onClick={() => handleDeleteClick(items?._id)}
													>
														delete
													</button>
												</div>
											</div>
										</>
									))}
								</div>
							</div>
						</>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
