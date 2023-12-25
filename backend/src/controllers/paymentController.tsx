import { Request, Response } from 'express';
import Stripe from 'stripe';
import User, { Status } from '../models/user.js';

import dotenv from 'dotenv';
dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
console.log(stripeSecretKey);
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
		success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${YOUR_DOMAIN}/?canceled=true`,
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

const createPortal = async (req: Request, res: Response) => {
	// For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
	// Typically, this is stored alongside the authenticated user in your database.
	const { session_id } = req.body;
	console.log(req.body, 'rer');
	const checkoutSession = await stripeInstance.checkout.sessions.retrieve(
		session_id
	);

	// Ensure that checkoutSession.customer is not null before using it
	if (checkoutSession.customer) {
		// This is the URL to which the customer will be redirected when they are done
		// managing their billing with the portal.
		// const returnUrl = 'http://localhost:5173/';

		console.log(checkoutSession.customer, 'fd');

		const portalSession = await stripeInstance.billingPortal.sessions.create({
			customer: checkoutSession.customer as string, // Assert that it's a string
			// return_url: returnUrl,
		});

		console.log(portalSession);

		res.redirect(303, portalSession.url);
	} else {
		// Handle the case where checkoutSession.customer is null
		res.status(400).send('Invalid customer ID');
	}
};

export default { makePayment, manageWebhook, createPortal };
