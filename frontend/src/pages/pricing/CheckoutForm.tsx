// client/src/components/CheckoutForm.js
import {
	CardElement,
	useElements,
	useStripe,
	PaymentElement,
} from '@stripe/react-stripe-js';
import './pricing.scss';
const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const cardElement = elements.getElement(CardElement);

		const { token, error } = await stripe.createToken(cardElement);

		if (error) {
			// Handle error
			console.error(error);
		} else {
			// Send token to server for payment processing
			console.log(token);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button type='submit' disabled={!stripe}>
				Pay
			</button>
		</form>
	);
};

export default CheckoutForm;
