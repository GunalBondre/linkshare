// interface Props = {};
import './header.scss';
import ProfileDropdown from '../dropdown/ProfileDropdown';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav className='nav'>
			<div className='nav__left'>
				<span>
					<Link to={'/'}>LinkShare</Link>{' '}
				</span>
			</div>
			<div className='nav__right'>
				<Link to={'/pricing'} className='button'>
					Pricing
				</Link>
				<ProfileDropdown />
			</div>
		</nav>
	);
};

export default Header;
