import * as express from "express";
import * as cors from 'cors';
import routes from './routes/index';
const PORT = process.env.PORT || 4000;


// create express app
const app = express();

app.use(cors()),
app.use(express.json({ limit: '100mb' }));
app.use('/api/', routes);

// start express server
app.listen(PORT, () => console.log('La magia ocurre en el puerto ' + PORT));