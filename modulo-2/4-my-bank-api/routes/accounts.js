import express from "express";
import { promises } from "fs";
import winston from "winston";

const { readFile, writeFile } = promises;

var router = express.Router();

router.get("/", async function (_, res) {
    try {
        let data = await readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);
        delete dataParsed.nextId;
        res.send(dataParsed);
        logger.info(`GET /account`);
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`GET /account ${err.message}`);
    }
});

router.get("/:id", async function (req, res) {
    try {
        let data = readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);
        let dataId = dataParsed.accounts.find(
            (account) => account.id === parseInt(req.params.id, 10)
        );
        res.send(dataId);
        logger.info(`GET /account - ${JSON.stringify(dataId)}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`GET /account ${err.message}`);
    }
});

router.post("/", async (req, res) => {
    let account = req.body;
    console.log("post account");
    try {
        let data = await readFile(global.fileName, "utf8");
        let json = JSON.parse(data);
        console.log(json);
        account = { id: json.nextId, ...account };
        json.accounts.push(account);
        json.nextId++;

        await writeFile(global.fileName, JSON.stringify(json));
        res.end();

        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`POST /account ${err.message}`);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let data = await readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);
        let accounts = dataParsed.accounts.filter(
            (account) => account.id !== parseInt(req.params.id, 10)
        );
        dataParsed.accounts = accounts;

        await writeFile(global.fileName, JSON.stringify(dataParsed));
        res.end();
        logger.info(`DELETE /account/:id - ${req.params.id}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`DELETE /account ${err.message}`);
    }
});

router.put("/", async function (req, res) {
    let account = req.body;
    try {
        let data = readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);

        let dataIndex = dataParsed.accounts.findIndex(
            (acc) => acc.id === account.id
        );

        dataParsed.accounts[dataIndex].name = account.name;
        dataParsed.accounts[dataIndex].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(dataParsed));
        res.end();
        logger.info(`PUT /account - ${JSON.stringify(account)}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`PUT /account ${err.message}`);
    }
});

router.post("/transaction", async function (req, res) {
    let account = req.body;
    try {
        let data = await readFile(global.fileName, "utf8");

        let dataParsed = JSON.parse(data);

        let dataIndex = dataParsed.accounts.findIndex(
            (acc) => acc.id === account.id
        );

        // prettier-ignore
        if ((dataParsed.accounts[dataIndex].balance + account.balance) < 0 && account.balance < 0){
                throw new Error("Não há saldo");
            }

        dataParsed.accounts[dataIndex].balance += account.balance;

        await writeFile(global.fileName, JSON.stringify(dataParsed));
        res.end();
        logger.info(`POST /account/transaction - ${JSON.stringify(account)}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`POST /account/transaction ${err.message}`);
    }
});

export default router;
