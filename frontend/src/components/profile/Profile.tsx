import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Profile = () => {
	const authData = useSelector((state: RootState) => state?.auth);
	return (
		<div className='profile'>
			<div className='profile-wrapper'>
				<h3>Your Details</h3>
				<ul className='details'>
					<li className='username'>
						<span>Username - </span>
						<span> {authData?.user?.username}</span>
					</li>
					<li className='email'>
						<span>Email - </span>
						<span>{authData?.user?.email}</span>
					</li>
					<li className='subscription-plan'>
						<span>Plan - </span>
						<span>{authData?.user?.subscription?.plan}</span>
					</li>
					<li className='subscription-expiry'>
						<span>Status - </span>
						<span>{authData?.user?.subscription?.status}</span>
					</li>
					<li className='subscription-expiry'>
						<span>Expires At - </span>
						<span>{authData?.user?.subscription?.expiresAt}</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Profile;
