//const fs = require("fs");
import { promises } from "fs";
import express from "express";
import timesRouter from "./routes/times.js";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("api started");
});

app.get("/times", timesRouter);

const { readFile, writeFile } = promises;
//const writeFile = promises.writeFile;
const times = [];

init();

async function init() {
  try {
    const resp = await readFile("./2003.json");
    const data = JSON.parse(resp);
    //montando array de times
    data[0].partidas.forEach((partida) => {
      times.push({ time: partida.mandante, pontuacao: 0 });
      times.push({ time: partida.visitante, pontuacao: 0 });
    });

    //montando pontuacao dos times no array criado
    data.forEach((rodada) => {
      rodada.partidas.forEach((partida) => {
        if (partida.placar_visitante > partida.placar_mandante) {
          const index = times.findIndex(
            (item) => item.time === partida.visitante
          );
          let time = times[index];
          time.pontuacao += 3;
          times[index] = time;
        } else if (partida.placar_visitante < partida.placar_mandante) {
          const index = times.findIndex(
            (item) => item.time === partida.mandante
          );
          let time = times[index];
          time.pontuacao += 3;
          times[index] = time;
        } else {
          const indexMan = times.findIndex(
            (item) => item.time === partida.mandante
          );
          let timeMan = times[indexMan];
          timeMan.pontuacao += 1;
          times[indexMan] = timeMan;

          const index = times.findIndex(
            (item) => item.time === partida.visitante
          );
          let time = times[index];
          time.pontuacao += 1;
          times[index] = time;
        }
      });
    });
    //ordenar times pela pontuacao
    times.sort((a, b) => {
      return b.pontuacao - a.pontuacao;
    });
    //console.log(times);

    //salvando array de times ordenado
    await writeFile("times.json", JSON.stringify(times));
  } catch (err) {
    console.log(err);
  }
}
