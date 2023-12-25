// src/components/PricingTable.js
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import './pricing.scss';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/authSlice';

interface PricingProps {
	setSessionId: React.Dispatch<React.SetStateAction<string>>;
}

const Pricing: React.FC<PricingProps> = ({ setSessionId }) => {
	const dispatch = useDispatch<AppDispatch>();
	const authData = useSelector((state: RootState) => state?.auth);

	const stripePromise = loadStripe(
		'pk_test_51OQ0tiIE2Xq7Mx2QPZMR351WSQthKdYBYKx8sGcH7hDl2AQwPv2fuwpkPAV1H1UoQcDTIQfmfPjKXpqBC90hCAwf00hOgH6kjA'
	);
	const authState = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		dispatch(getUser(authData?.user?.email || ''));
	}, [authData?.user?.email, dispatch]);

	const handleClick = async (e: React.FormEvent) => {
		e.preventDefault();

		const data = {
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer sk_test_51OQ0tiIE2Xq7Mx2Q3Be6DrKCaWkoG1zdxgqAF0PanFTguHhNsFmGt3MHDWF99QJeTuKtdV5ZNVMA9LB7vj366C7c00Cs0wWIH9',
			},
			email: authState?.user?.email,
		};
		try {
			const response = await axios.post(
				'http://localhost:4000/payment/create-checkout-session',
				data
			);

			const session = response.data;
			const stripe = await stripePromise;
			if (session.id) {
				await setSessionId(session.id);
			}
			const result = await (stripe as any)?.redirectToCheckout({
				sessionId: session.id,
			});

			if (result?.error) {
				console.error(result.error.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='pricing-table'>
			<div className='plan'>
				<div className='plan-header'>
					<div className='plan-name'>Basic Plan</div>
				</div>
				<div className='plan-price'> Free</div>
				<ul className='plan-features'>
					<li className='plan-feature'>1 website</li>
					<li className='plan-feature'>Max 3 links</li>
					<li className='plan-feature'>Feature 3</li>
				</ul>
			</div>

			<div className='plan popular'>
				<div className='plan-header'>
					<div className='plan-name'>Premium Plan</div>
				</div>
				<div className='plan-price'>$20/month</div>
				<ul className='plan-features'>
					<li className='plan-feature'>unlimite website</li>
					<li className='plan-feature'>unlimited links</li>
					<li className='plan-feature'>Feature 3</li>
				</ul>

				{authState?.user?.subscription?.plan === 'free' ? (
					<span className='plan-label'>Active Plan</span>
				) : (
					<form onSubmit={handleClick}>
						<input type='hidden' name='lookup_key' value='subscription' />
						<button
							id='checkout-and-portal-button'
							className='btn'
							type='submit'
						>
							Checkout
						</button>
					</form>
				)}

				{/* <input type='hidden' name='lookup_key' value='testy' />
				<button className='btn' onClick={handleClick}>
					Choose Plan
				</button> */}
			</div>
		</div>
	);
};

export default Pricing;
