import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { Plan, Status } from '../models/user.js';

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

export default { signin, register };
