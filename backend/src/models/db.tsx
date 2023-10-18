import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1/linkshare').then((res) => {
	if (res) {
		console.log('connection successful');
	} else {
		console.log('connection failed');
	}
});
