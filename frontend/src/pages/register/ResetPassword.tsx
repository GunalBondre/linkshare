import Form, { FieldConfig } from '../../components/form/Form';
import './register.scss';

import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { resetPassword, signInUser } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useLocation, useNavigate } from 'react-router';

const ResetPassword = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = (formData: { [key: string]: string }) => {
		// Handle form submission specific to Component1
		const token = new URLSearchParams(location.search).get('token');
		const { password } = formData;
		if (token) {
			dispatch(resetPassword({ password, token }));
		}
		navigate('/login', { replace: true });
	};

	const fields: FieldConfig[] = [
		{
			name: 'password',
			label: 'Enter Passeword',
			type: 'password',
			placeholder: 'At least 8 characters',
			icon: <EnhancedEncryptionIcon className='icon' />, // Use the IconEmail component for Field 2
		},
		{
			name: 'cpassword',
			label: 'Confirm Passeword',
			type: 'password',
			placeholder: 'At least 8 characters',
			icon: <EnhancedEncryptionIcon className='icon' />, // Use the IconEmail component for Field 2
		},
		// Add more fields with their respective icons
	];

	return (
		<div className='wrapper flex-center'>
			<div className='form flex-center'>
				<div className='form__leftSection'></div>
				<div className='form__rightSection flex-center'>
					<div className='form__form-wrapper'>
						<div className='form__heading'>
							<h2>ResetPassword </h2>
						</div>
						<Form
							fields={fields}
							onSubmit={handleSubmit}
							formType='resetpass'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
