import { Request, Response } from 'express';
import Stripe from 'stripe';
import User, { Status } from '../models/user.js';

const stripeSecretKey =
	'sk_test_51OQ0tiIE2Xq7Mx2Q3Be6DrKCaWkoG1zdxgqAF0PanFTguHhNsFmGt3MHDWF99QJeTuKtdV5ZNVMA9LB7vj366C7c00Cs0wWIH9';
export const stripeInstance = new Stripe(stripeSecretKey ?? '');

const YOUR_DOMAIN = 'http://localhost:5173';

const makePayment = async (req: Request, res: Response) => {
	const { email } = req.body;
	const prices = await stripeInstance.prices.list({
		lookup_keys: [req.body.lookup_key],
		expand: ['data.product'],
	});
	const session = await stripeInstance.checkout.sessions.create({
		billing_address_collection: 'auto',
		customer_email: email,
		line_items: [
			{
				price: prices.data[0].id,
				// For metered billing, do not pass quantity
				quantity: 1,
			},
		],
		mode: 'subscription',
		success_url: `${YOUR_DOMAIN}/success`,
		cancel_url: `${YOUR_DOMAIN}?canceled=true`,
	});

	if (session.url) {
		res.json({ url: session.url, id: session.id });
	} else {
		// Handle the case where session.url is null
		res.status(500).send('Session URL is null');
	}
};

const manageWebhook = async (req: Request, res: Response) => {
	const event = req.body;

	try {
		switch (event.type) {
			case 'invoice.payment_succeeded':
				const paymentIntentSucceeded = event.data.object;
				const user = await User.findOne({
					email: paymentIntentSucceeded['customer_email'],
				});

				if (user) {
					user.subscription.status = Status.Active;
					await user.save();
				}

				console.log('payment succeeded', paymentIntentSucceeded);
				break;
			case 'invoice.finalized':
				console.log('invoice finalized');

			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
		}
	} catch (error) {
		console.error('Error processing webhook event:', error);
		res.status(500).send('Internal Server Error');
	}
};

export default { makePayment, manageWebhook };
