import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import User, { Plan, Status } from '../models/user.js';
import nodemailer from 'nodemailer';

const isStrongPassword = (password: string) => {
	const hasLowercase = /[a-z]/.test(password);
	const hasUppercase = /[A-Z]/.test(password);
	const hasDigit = /\d/.test(password);
	const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password); // You can add more special characters

	return (
		hasLowercase &&
		hasUppercase &&
		hasDigit &&
		hasSpecialChar &&
		password.length >= 8
	);
};

const signin = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(400).send('email does not exist please register');
		} else {
			const validPassword = await bcrypt.compare(password, user?.password);
			if (!validPassword) {
				return res.status(400).send('please enter correct password');
			}
			const token = jwt.sign({ userId: user._id }, 'jsonwebtoken', {
				expiresIn: '1h',
			});

			return res.status(200).json({
				id: user._id,
				username: user?.username,
				email: user?.email,
				subscription: user?.subscription,
				token,
			});
		}
	} catch (error) {
		return res.status(400).send('Failed to login');
	}
};

const register = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;
	try {
		if (!username || !email) {
			return res.status(400).send('Enter all fields');
		}

		if (!isStrongPassword(password)) {
			return res.status(400).send('Please enter strong password');
		}

		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.status(400).send('email already exists');
		}
		const user = await new User({
			email,
			username,
			password,
			subscription: {
				plan: Plan.Free,
				status: Status.Inactive,
				expiresAt: new Date(),
			},
		});

		await user.save();

		res.status(200).send(user);
	} catch (error) {
		console.error(error, 'error');
		return res.status(400).json({ msg: 'Error creating user', error: error });
	}
};

const checkUserInDb = async (req: Request, res: Response) => {
	try {
		const userEmail = req.query.email; // Assuming you pass the user's email as a query parameter
		const user = await User.findOne({ email: userEmail });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Include subscription status in the response
		res.json({
			email: user.email,
			subscription: {
				plan: user.subscription.plan,
				status: user.subscription.status,
				expiresAt: user.subscription.expiresAt,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const resetPassword = async (req: Request, res: Response) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}

		const resetToken = uuid();

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
		await user.save();

		sendPasswordResetEmail(user.email, resetToken);
		res.json({ msg: 'Password reset email sent successfully' });
	} catch (error) {
		res.status(500).json({ msg: 'Internal Server Error' });
	}
};

const sendPasswordResetEmail = (email: string, token: string) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USER_NAME,
			pass: process.env.GMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: 'bpndre.gunal@gmail.com',
		to: email,
		subject: 'Password Reset',
		text: `Click the following link to reset your password: http://localhost:4000/auth/reset-password/${token}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};
export default { signin, register, checkUserInDb, resetPassword };
