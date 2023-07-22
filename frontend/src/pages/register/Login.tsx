import { FC } from 'react';
import './register.scss';
import MailLockIcon from '@mui/icons-material/MailLock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

const Login: FC = () => {
	return (
		<div className='wrapper flex-center'>
			<div className='form flex-center'>
				<div className='form__leftSection'></div>
				<div className='form__rightSection flex-center'>
					<form action='' className='form__form-wrapper'>
						<div className='form__heading'>
							<h2>Login to your Account</h2>
							<p>Lets get you started sharing your links</p>
						</div>
						<div className='form__fields'>
							<div className='form__group flex-column'>
								<label>Email Address</label>
								<div className='iconwrapper'>
									<MailLockIcon className='icon' />
									<input
										type='email'
										name='email'
										placeholder='e.g alex@gmail.com'
									/>
								</div>
							</div>
							<div className='form__group flex-column'>
								<label>Password</label>
								<div className='iconwrapper'>
									<EnhancedEncryptionIcon className='icon' />
									<input
										type='password'
										name='password'
										placeholder='At least 8 character'
									/>
								</div>
							</div>
							<div className='form__group flex-column'>
								<button type='submit' className='button'>
									Login to Account
								</button>
							</div>
							<p>
								Dont have an account? <a href=''>Register</a>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
