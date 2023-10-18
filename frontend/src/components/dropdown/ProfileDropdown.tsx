import React, { useRef, useState, RefObject, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './profileDropdown.scss';
import { logoutUser } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router';

const ProfileDropdown: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef: RefObject<HTMLDivElement> = useRef(null);
	const dispatch = useDispatch<AppDispatch>();
	const authState = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();

	console.log(authState);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/login');
		setIsOpen(false);
	};
	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
	return (
		<div className='profile-dropdown' ref={dropdownRef}>
			{authState?.user?.username && (
				<>
					<div className='profile' onClick={toggleDropdown}>
						<div className='icon'>
							<AccountCircleIcon />
						</div>
						<span>{authState?.user?.username}</span>
					</div>

					{isOpen && (
						<div className='dropdown-content'>
							<ul>
								<li>Profile</li>
								<li>Account Settings</li>
								<li onClick={handleLogout}>Logout</li>
							</ul>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ProfileDropdown;
