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

	const closeDropdownOnBlur = (event: FocusEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.relatedTarget as Node)
		) {
			setIsOpen(false);
		}
	};
	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/login');
		setIsOpen(false);
	};

	const goToLogin = () => {
		setIsOpen(false);
		navigate('/login');
	};

	const goToSetting = () => {
		setIsOpen(false);
		navigate('/setting');
	};
	const goToProfile = () => {
		setIsOpen(false);
		navigate('/profile');
	};

	const goToView = () => {
		setIsOpen(false);
		navigate('/view');
	};
	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('focusin', closeDropdownOnBlur);
		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('focusin', closeDropdownOnBlur);
		};
	}, [isOpen]);
	return (
		<div className='profile-dropdown' ref={dropdownRef}>
			<>
				<div className='profile' onClick={toggleDropdown}>
					<div className='icon'>
						<AccountCircleIcon />
					</div>
					<span className='username'>{authState?.user?.username}</span>
				</div>

				{isOpen && (
					<div className='dropdown-content'>
						<ul>
							<li onClick={goToProfile}>Profile</li>
							<li onClick={goToView}>View Demo</li>
							<li onClick={goToSetting}>Setting</li>

							{authState?.token === null ? (
								<li onClick={goToLogin}>Login</li>
							) : (
								<li onClick={handleLogout}>Logout</li>
							)}
						</ul>
					</div>
				)}
			</>
		</div>
	);
};

const MemoizedProfileDropdown = React.memo(ProfileDropdown);

export default MemoizedProfileDropdown;
