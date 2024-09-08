import mongoose, { Schema } from "mongoose";
import config from "../../config";

const { mongo_uri } = config;

console.log(mongo_uri)

mongoose.connect(mongo_uri!)

// COLOCAR DEPOIS UMA CHAVE ESTRAGEIRA QUE VEM DE REGISTRO
const gastos = new Schema({
    descricao: {type: String, required:true},
    valor: {type: Number, require:true},
    categoria: {type:String, require:true},
    date: {type: Date, require:true},
})

const investimentos = new Schema({
    bolsa: {type: String, require:true},
    valor: {type: Number, require:true},
    date: {type: Date, require:true},
})

export const Gasto = mongoose.model('Gastos', gastos); 
export const Investimentos = mongoose.model('Investimentos', investimentos)