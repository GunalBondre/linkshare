import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
const app = express();
app.use(cors());
app.use(helmet());
const port = 4000;
app.listen(port, () => {
    console.log('app running on port', port);
});
//# sourceMappingURL=index.js.map