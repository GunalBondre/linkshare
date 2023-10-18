import Form, { FieldConfig } from '../../components/form/Form';
import './register.scss';
import { useDispatch, useSelector } from 'react-redux';
import MailLockIcon from '@mui/icons-material/MailLock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { registerUser } from '../../redux/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const dispatch = useDispatch<AppDispatch>();
	const authState = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();

	const handleSubmit = async (formData: { [key: string]: string }) => {
		// Handle form submission specific to Component1
		const { email, username, password } = formData;
		dispatch(registerUser({ email, username, password }));
		if (authState.user !== null) {
			navigate('/login');
		}
	};
	const fields: FieldConfig[] = [
		{
			name: 'username',
			label: 'Enter Username',
			type: 'text',
			placeholder: 'Enter Username',
			icon: <PersonIcon className='icon' />, // Use the IconEmail component for Field 2
		},
		{
			name: 'email',
			label: 'Enter Email',
			type: 'email',
			placeholder: 'abc@gmail.com',
			icon: <MailLockIcon className='icon' />, // Use the IconUser component for Field 1
		},
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
							<h2>Create Account</h2>
							<p>Lets get you started sharing your links</p>
						</div>
						<Form fields={fields} onSubmit={handleSubmit} formType='register' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
