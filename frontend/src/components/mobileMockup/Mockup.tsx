// iPhone13Mockup.js
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import './mockup.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllLinks } from '../../redux/linkSlice';

const Mockups = () => {
	const linkData = useSelector((state: RootState) => state.links);
	const userData = useSelector((state: RootState) => state?.auth);
	const { collection } = linkData;
	const dispatch = useDispatch();

	useEffect(() => {
		const userId = userData?.user?.id?.toString();
		if (userId) {
			dispatch(getAllLinks(userId));
		}
	}, [dispatch, userData?.user?.id]);

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	return (
		<div className='iphone-13-mockup'>
			<div className='screen-content'>
				{/* Add your screen content here */}
				<h1>Welcome to Linkshare</h1>
				<p>Some awesome content goes here!</p>
				{collection?.map((link) => (
					<div className='links' style={{ backgroundColor: getRandomColor() }}>
						<a href={`${link?.link}`} target='_blank' rel='noopener noreferrer'>
							{link?.title}
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default Mockups;
