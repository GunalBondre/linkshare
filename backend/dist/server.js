import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import './models/db.js';
import authRoutes from './routes/authRoute.js';
import linkRoutes from './routes/linkRoute.js';
import paymentRoutes from './routes/paymentRoute.js';
import User, { Plan, Status } from './models/user.js';
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
const port = 4000;
app.use('/auth', authRoutes);
app.use('/link', linkRoutes);
app.use('/payment', paymentRoutes);
app.post('/webhook', express.json({ type: 'application/json' }), async (request, response) => {
    const event = request.body;
    switch (event?.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log('payment attached', paymentMethod);
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        // ... handle other event types
        case 'invoice.payment_succeeded':
            const paymentMethod2 = event.data.object;
            const user = await User.findOne({
                email: paymentMethod2['customer_email'],
            });
            if (user) {
                user.subscription.status = Status.Active;
                user.subscription.plan = Plan.Paid;
                user.subscription.expiresAt = new Date(paymentMethod2.lines.data[0].period.end * 1000);
                await user.save();
            }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
});
app.listen(port, () => {
    console.log('app running on port', port);
});
//# sourceMappingURL=server.js.map