
import express from 'express';
import {Router} from 'express'
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json' with { type: "json" };

const app = express()
const router = Router()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
    origin: '*',
    credentials: true,
}))
app.use(express.json())
app.use("/",router)


app.get('/', (req, res) => {
  res.send('Hello, World!');
} )

app.listen(3000, () => {
  console.log('Server is running on port 3000');

} )