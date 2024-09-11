import express, { Application } from "express";
import dotenv from 'dotenv';
import config from "../config";
import gastosRouter from "./routes/POST/gastos";
import investimentoRouter from "./routes/POST/investimentos";
import carteirasRouter from "./routes/POST/carteiras";
import { metasRouter } from "./routes/POST/metas";
import gastosRouterDelete from "./routes/DELETE/gastosDelete";
import investimentosRouterDelete from "./routes/DELETE/investimentosDelete";
import carteirasRouterDelete from "./routes/DELETE/carteiraDelete";
import metasRouterDelete from "./routes/DELETE/metasDelete";
import { carteirasRoutPath } from "./routes/PATH/carteiras";
import { gastoRouterPath } from "./routes/PATH/gastos";
import { investimentoRouterPath } from "./routes/PATH/investimentos";
import { metasRouterPath } from "./routes/PATH/metas";
import carteirasRouterGet from "./routes/GET/carteiras";
import gastosRouterGet from "./routes/GET/gastos";
import investimentosRouterGet from "./routes/GET/investmentos";
import metasRouterGet from "./routes/GET/metas";

const {porta} = config;

dotenv.config()

const app: Application = express()

app.use(express.json())

app.use('/api', gastosRouter, investimentoRouter, carteirasRouter, metasRouter,
     gastosRouterDelete, investimentosRouterDelete, carteirasRouterDelete,
     metasRouterDelete, carteirasRoutPath, gastoRouterPath, investimentoRouterPath, metasRouterPath,
    carteirasRouterGet, gastosRouterGet, investimentosRouterGet, metasRouterGet);

app.listen(porta, () => {
    console.log(`SERVIDOR RODANDO NA PORTA ${porta}`)
})