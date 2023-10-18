import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Make sure you import JwtPayload
import User, { IUser } from '../models/user.js';

// Define a custom interface that extends the Request type
interface CustomRequest extends Request {
	user: IUser; // Add the 'user' property to the Request object
}

export const authenticateToken = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.header('Authorization')?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	try {
		const decoded: JwtPayload | string = jwt.verify(token, 'jsonwebtoken'); // Use a strong secret key

		if (typeof decoded === 'string') {
			// Handle the case where decoded is a string, for example, if the token is invalid
			return res.status(401).json({ error: 'Unauthorized' });
		}

		// Now TypeScript recognizes decoded as JwtPayload
		const user = await User.findById(decoded.userId);

		if (!user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		req.user = user; // Attach the user object to the request
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: 'Unauthorized' });
	}
};
