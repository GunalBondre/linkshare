import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const SubscriptionForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [priceId, setPriceId] = useState('');

	const handleSubscription = async (event: any) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		// Call your backend to create a checkout session
		const response = await fetch(
			'http://localhost:4000/create-checkout-session',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ priceId }),
			}
		);

		const session = await response.json();

		// Redirect to checkout page
		const result = await stripe.redirectToCheckout({
			sessionId: session.sessionId,
		});

		if (result.error) {
			console.error(result.error.message);
		}
	};

	return (
		<form onSubmit={handleSubscription}>
			<label>
				Choose a subscription plan:
				<select onChange={(e) => setPriceId(e.target.value)} value={priceId}>
					<option value=''>Select a plan</option>
					{/* Fetch and display available plans from your backend */}
				</select>
			</label>
			<CardElement />
			<button type='submit' disabled={!stripe}>
				Subscribe
			</button>
		</form>
	);
};

export default SubscriptionForm;
