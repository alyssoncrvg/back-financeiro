import mongoose, { Schema } from "mongoose";
import config from "../../config";

const { mongo_uri } = config;

mongoose.connect(mongo_uri!)

// COLOCAR DEPOIS UMA CHAVE ESTRAGEIRA QUE VEM DE REGISTRO
const gastos = new Schema({
    descricao: {type: String, required:true, unique:true},
    valor: {type: Number, required:true},
    categoria: {type:String, required:true},
    date: {type: Date, required:true},
})

const investimentos = new Schema({
    bolsa: {type: String, required:true, unique:true},
    valor: {type: Number, required:true},
    date: {type: Date, required:true},
})

const carteiras = new Schema({
    banco: {type: String, required: true, unique: true},
    saldo: {type: Number, required:true},
})

const metas = new Schema({
    categoria: {type:String, required:true},
    titulo: {type:String, require:true},
    meta: {type: Number, required:true},
    previsao: {type:Date, require:true},
    valorGuardado: {type: Number, require:true},
})

export const Gasto = mongoose.model('Gastos', gastos); 
export const Investimentos = mongoose.model('Investimentos', investimentos);
export const Carteiras = mongoose.model('Carteiras', carteiras);
export const Metas = mongoose.model('Metas', metas);