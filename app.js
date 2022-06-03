import 'dotenv/config';
import './database/conexion.js'
import express from "express";
import authRouter from './routes/auth.routes.js';
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1', authRouter)


app.listen(port, () => {
    console.log(`Servidor inicializado en http://localhost:${port}`);
})