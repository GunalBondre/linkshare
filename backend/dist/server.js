import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './models/db.js';
import authRoutes from './routes/authRoute.js';
import linkRoutes from './routes/linkRoute.js';
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
const port = 4000;
app.use('/auth', authRoutes);
app.use('/link', linkRoutes);
app.listen(port, () => {
    console.log('app running on port', port);
});
//# sourceMappingURL=server.js.map