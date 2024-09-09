import express, { Application } from "express";
import dotenv from 'dotenv';
import config from "../config";
import gastosRouter from "./routes/POST/gastos";
import investimentoRouter from "./routes/POST/investimentos";
import carteirasRouter from "./routes/POST/carteiras";
import { metasRouter } from "./routes/POST/metas";

const {porta} = config;

dotenv.config()

const app: Application = express()

app.use(express.json())

app.use('/api', gastosRouter, investimentoRouter, carteirasRouter, metasRouter);

app.listen(porta, () => {
    console.log(`SERVIDOR RODANDO NA PORTA ${porta}`)
})