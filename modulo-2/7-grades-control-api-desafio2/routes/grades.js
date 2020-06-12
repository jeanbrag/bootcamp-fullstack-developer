import express from "express";
import { promises } from "fs";

const { writeFile, readFile } = promises;

const router = express.Router();

//post grade
router.post("/", async (req, res) => {
    console.log("post grade");
    try {
        let grade = req.body;
        let data = await readFile(global.fileName, "utf8");
        let json = JSON.parse(data);
        console.log(json);
        grade = { id: json.nextId, ...grade, timestamp: `${new Date()}` };
        json.grades.push(grade);
        json.nextId++;

        await writeFile(global.fileName, JSON.stringify(json));
        res.send(grade);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

//put grade
router.put("/:id", async function (req, res) {
    try {
        let grade = req.body;
        let id = req.params.id;
        let data = await readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);

        let dataIndex = dataParsed.grades.findIndex(
            (grd) => grd.id === parseInt(id, 10)
        );

        if (dataIndex === -1) throw new Error("ID não existente");
        dataParsed.grades[dataIndex].student = grade.student;
        dataParsed.grades[dataIndex].subject = grade.subject;
        dataParsed.grades[dataIndex].type = grade.type;
        dataParsed.grades[dataIndex].value = grade.value;

        await writeFile(global.fileName, JSON.stringify(dataParsed));
        res.send(grade);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

//delete grade
router.delete("/:id", async (req, res) => {
    try {
        let data = await readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);
        let grades = dataParsed.grades.filter(
            (grade) => grade.id !== parseInt(req.params.id, 10)
        );
        dataParsed.grades = grades;

        await writeFile(global.fileName, JSON.stringify(dataParsed));
        res.send("grade deleted");
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

//get grade by id

router.get("/:id", async function (req, res) {
    try {
        let data = await readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);
        let dataId = dataParsed.grades.find(
            (grade) => grade.id === parseInt(req.params.id, 10)
        );
        res.send(dataId);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

//get sum of total grades by id and subject
router.get("/nota/:student/:subject", async function (req, res) {
    try {
        let data = await readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);
        let nota = dataParsed.grades.reduce((sum, current) => {
            if (
                current.student === req.params.student &&
                current.subject === req.params.subject
            ) {
                return sum + current.value;
            }
            return sum;
        }, 0);
        console.log(nota);
        res.send(`${nota}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

//get average by subject and type
router.get("/media/:subject/:type", async function (req, res) {
    try {
        let data = await readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);
        let totalReg = 0;
        let nota = dataParsed.grades.reduce((sum, current) => {
            if (
                current.subject === req.params.subject &&
                current.type === req.params.type
            ) {
                totalReg++;
                return sum + current.value;
            }
            return sum;
        }, 0);
        nota = nota / totalReg;
        console.log(nota);
        res.send(`${nota}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

//get top3
router.get("/top/:subject/:type", async function (req, res) {
    try {
        let data = await readFile(global.fileName, "utf8");
        let dataParsed = JSON.parse(data);
        let grades = dataParsed.grades.filter(
            (grade) =>
                grade.subject === req.params.subject &&
                grade.type === req.params.type
        );

        grades.sort((a, b) => {
            return b.value - a.value;
        });
        console.log(grades);

        let top3 = [];

        for (let i = 0; i < 3; i++) {
            top3.push(grades[i]);
        }

        res.send(top3);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;
