import express from "express";
import { promises, read } from "fs";
const { readFile, writeFile } = promises;

const router = express.router();

router.get("/times/campeao", async (req, res) => {
  res.send(await returnChampion());
});

async function returnChampion() {
  const resp = await readFile("./times.json");
  const times = JSON.parse(resp);
  return times[0];
}

export default router;
