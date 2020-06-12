import express from "express";
import { promises } from "fs";
import gradesRouter from "./routes/grades.js";

const { writeFile, readFile } = promises;

global.fileName = "grades.json";

const app = express();
app.use(express.json());

app.use("/grades", gradesRouter);

app.listen(3000, async () => {
    try {
        const initialJson = {
            nextId: 1,
            grades: [],
        };
        await writeFile(global.fileName, JSON.stringify(initialJson), {
            flag: "wx",
        });
    } catch (err) {}
    console.log("API Started");
});
