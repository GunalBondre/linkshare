import { Request, Response } from 'express';
import Link from '../models/link.js';

function isValidURL(url: string) {
	// Use a regular expression to validate URLs
	const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
	return urlPattern.test(url);
}

const addLink = async (req: Request, res: Response) => {
	const { title, url, id } = req.body;
	try {
		if (!title || !url) {
			return res.status(400).send('please enter required fields');
		}
		if (!isValidURL(url)) {
			return res.status(400).send('wrong url format');
		}
		const newLink = await new Link({
			title,
			url,
			createdBy: id,
		});

		await newLink.save();

		return res.status(200).send(newLink);
	} catch (error) {
		return res.status(400).send('link save failed');
	}
};

export default { addLink };
