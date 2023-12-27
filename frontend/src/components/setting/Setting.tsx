import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

const Setting = () => {
	const [email, setEmail] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const res = await axios.post('http://localhost:4000/auth/sendEmail', {
			email,
		});
		if (res?.data) {
			toast.success(res?.data?.msg);
		} else {
			toast.error(res?.data?.msg);
		}
	};
	return (
		<div
			className='setting'
			style={{ justifyContent: 'center', width: '100%' }}
		>
			<form action='' onSubmit={handleSubmit}>
				<label htmlFor=''>Enter Email</label>
				<input type='email' name='email' id='' onChange={handleChange} />
				<button>Submit</button>
			</form>
		</div>
	);
};

export default Setting;
