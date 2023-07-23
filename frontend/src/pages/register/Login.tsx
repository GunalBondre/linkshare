import Form, { FieldConfig } from '../../components/form/Form';
import MailLockIcon from '@mui/icons-material/MailLock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { Link } from 'react-router-dom';
import './register.scss';

const Login = () => {
	const handleSubmit = () => {};

	const fields: FieldConfig[] = [
		{
			name: 'email',
			label: 'Enter Email',
			type: 'email',
			placeholder: 'abc@gmail.com',
			icon: <MailLockIcon className='icon' />,
		},
		{
			name: 'passwprd',
			label: 'Enter passwprd',
			type: 'passwprd',
			placeholder: 'At least 8 characters',
			icon: <EnhancedEncryptionIcon className='icon' />,
		},
	];
	return (
		<div>
			<div className='wrapper flex-center'>
				<div className='form'>
					<div className='form__leftSection'></div>
					<div className='form__rightSection flex-column'>
						<div className='form__form-wrapper'>
							<div className='form__heading'>
								<h2>Sign in to your account</h2>
								<p>Lets get you started sharing your links</p>
							</div>
							<Form fields={fields} onSubmit={handleSubmit} />
							<div className='form__group'>
								<button className='button'>Create an account</button>
							</div>

							<p>
								Dont have an account? <Link to='/register'>Register</Link>{' '}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
