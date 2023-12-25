import axios from 'axios';

const SuccessDisplay = ({ sessionId }: any) => {
	console.log(sessionId, 'sess');
	const handleSubmit = async () => {
		const res = await axios.post(
			'http://localhost:4000/payment/create-portal-session',
			{ sessionId }
		);

		if (res) {
			console.log(res);
		} else {
			console.log('no resp');
		}
	};
	return (
		<section>
			<div className='product Box-root'>
				<div className='description Box-root'>
					<h3>Subscription to starter plan successful!</h3>
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					type='hidden'
					id='session-id'
					name='session_id'
					value={sessionId}
				/>
				<button id='checkout-and-portal-button' type='submit'>
					Manage your billing information
				</button>
			</form>
		</section>
	);
};
export default SuccessDisplay;
