import { Request, Response } from 'express';
import Link from '../models/link.js';
import axios from 'axios';

function isValidURL(url: string) {
	// Use a regular expression to validate URLs
	const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
	return urlPattern.test(url);
}

const addLink = async (req: Request, res: Response) => {
	const { title, link, id } = req.body;
	console.log(id, 'id');

	try {
		if (!title || !link) {
			return res.status(400).send('please enter required fields');
		}
		if (!isValidURL(link)) {
			return res.status(400).send('wrong url format');
		}
		const newLink = await new Link({
			title,
			link,
			createdBy: id,
		});

		await newLink.save();
		return res.status(200).send(newLink);
	} catch (error) {
		return res.status(400).send('link save failed');
	}
};

const getAllLinks = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		const links = await Link.find({ createdBy: userId }).select('title link');

		if (links) {
			return res.status(200).json(links);
		} else {
			return res.status(404).json({ error: 'No links found for the user' });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const deleteLink = async (req: Request, res: Response) => {
	try {
		await Link.findByIdAndDelete(req.params.id);
		return res.status(200).send('delete success');
	} catch (error) {
		throw error;
	}
};

export default { addLink, getAllLinks, deleteLink };
