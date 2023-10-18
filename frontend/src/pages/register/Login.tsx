import Form, { FieldConfig } from '../../components/form/Form';
import './register.scss';

import MailLockIcon from '@mui/icons-material/MailLock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { signInUser } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router';

const Login = () => {
	const dispatch = useDispatch<AppDispatch>();
	const authState = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();
	console.log(authState);

	const handleSubmit = (formData: { [key: string]: string }) => {
		// Handle form submission specific to Component1
		const { email, password } = formData;
		dispatch(signInUser({ email, password }));
		navigate('/', { replace: true });
	};
	const fields: FieldConfig[] = [
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

		// Add more fields with their respective icons
	];

	return (
		<div className='wrapper flex-center'>
			<div className='form flex-center'>
				<div className='form__leftSection'></div>
				<div className='form__rightSection flex-center'>
					<div className='form__form-wrapper'>
						<div className='form__heading'>
							<h2>Login </h2>
							<p>Lets get you started sharing your links</p>
						</div>
						<Form fields={fields} onSubmit={handleSubmit} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
