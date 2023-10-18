// interface Props = {};
import './header.scss';
import ProfileDropdown from '../dropdown/ProfileDropdown';

const Header = () => {
	return (
		<nav className='nav'>
			<div className='nav__left'>
				<span>LinkShare</span>
			</div>
			<div className='nav__right'>
				<ProfileDropdown />
			</div>
		</nav>
	);
};

export default Header;
