import express from "express";
import { promises } from "fs";
import moment from "moment";
const { writeFile, readFile } = promises;

import {inserirLancamento} from "../controllers/lancamentosControllers.js";
import {media, somatorio, teste} from "../libs/calculos.js";

const router = express.Router();

router.get("/totalMes/:mes", async (req, res) => {
    let numeros = [1, 2, 3, 4, 5, 6, 7];
    /*numeros.forEach(async x => {
        let result = await teste(x);
        console.log(result);
    });*/
    /*for (let x of numeros) {
        let result = await teste(x);
        console.log(result);        
    }*/
    for (let i = 0; i < numeros.length; i++) {
        let result = await teste(numeros[i]);
        console.log(result);
    }


    let json = JSON.parse(await readFile(global.fileName));
    let lancamentos = json.lancamentos.filter(lancamento => {
        const mes = moment(lancamento.data, "DD/MM/YYYY").month() + 1;
        return mes === parseInt(req.params.mes);        
    });
    lancamentos = lancamentos.map(lancamento => {
        return lancamento.valor;
    });
    res.send({valor: somatorio(lancamentos)});
});

router.post("/receita", async (req, res) => {
    try {
        let lancamento = req.body;        
        res.send(await inserirLancamento(lancamento));
    } catch (err) {
        res.status(400).send({error: err.message});
    }    
});

router.post("/despesa", async (req, res) => {
    try {
        let lancamento = req.body;
        res.send(await inserirLancamento(lancamento, "D"));
    } catch (err) {
        res.status(400).send({error: err.message});
    }    
});

export default router;