import { promises, read } from "fs";
import express from "express";

const { readFile, writeFile } = promises;

console.log("Started");

const Estados = [];

async function statesJson() {
    try {
        const estados = await readFile("./Estados.json", "utf8");
        const estadosJson = JSON.parse(estados);
        const cidades = await readFile("./Cidades.json", "utf8");
        const cidadesJson = JSON.parse(cidades);

        estadosJson.forEach(async (estado) => {
            let cidadesA = [];
            cidadesJson.forEach((cidade) => {
                if (cidade.Estado === estado.ID) cidadesA.push(cidade);
            });
            await writeFile(`${estado.Sigla}.json`, JSON.stringify(cidadesA));
        });
    } catch (err) {
        console.log(err);
    }
}

async function numberOfCities(state) {
    try {
        const cities = await readFile(`${state}.json`, "utf8");
        const citiesJson = JSON.parse(cities);
        return citiesJson.length;
    } catch (err) {
        console.log(err);
    }
}

async function statesPerNumberOfCities() {
    try {
        const estados = await readFile("./Estados.json", "utf8");
        const estadosJson = JSON.parse(estados);
        let list = [];
        // estadosJson.forEach(async (estado) => {
        //     let stateCities = `${estado.Sigla} - ${await numberOfCities(estado.Sigla)}`;
        //     list.push(stateCities);
        // });

        // await Promise.all(promises);

        for (const { Sigla } of estadosJson) {
            let stateCities = `${Sigla} - ${await numberOfCities(Sigla)}`;
            list.push(stateCities);
        }

        list.sort((a, b) => {
            return (
                parseInt(b.split(/\D+/).join(""), 10) -
                parseInt(a.split(/\D+/).join(""), 10)
            );
        });

        return list;
    } catch (err) {
        console.log(err);
    }
}

async function topFive() {
    const list = await statesPerNumberOfCities();
    let topFive = [];
    for (let i = 0; i < 5; i++) {
        topFive.push(list[i]);
    }
    return topFive;
}

async function underFive() {
    const list = await statesPerNumberOfCities();
    list.sort((a, b) => {
        return (
            parseInt(a.split(/\D+/).join(""), 10) -
            parseInt(b.split(/\D+/).join(""), 10)
        );
    });

    let underFive = [];
    for (let i = 0; i < 5; i++) {
        underFive.push(list[i]);
    }

    underFive.sort((a, b) => {
        return (
            parseInt(b.split(/\D+/).join(""), 10) -
            parseInt(a.split(/\D+/).join(""), 10)
        );
    });
    return underFive;
}

async function cityLength() {
    try {
        const estados = await readFile("./Estados.json", "utf8");
        const estadosJson = JSON.parse(estados);
        let mostCityLength = { cidade: "inicial", sigla: "OO" };
        let minCityLength = { cidade: "inicial", sigla: "OO" };

        for (const { Sigla } of estadosJson) {
            let cities = await readFile(`./${Sigla}.json`, "utf8");
            let citiesJson = JSON.parse(cities);

            let citiesLength = [];
            citiesJson.forEach((city) => {
                citiesLength.push({
                    Cidade: city.Nome,
                    Tamanho: city.Nome.length,
                });
            });
            citiesLength.sort((a, b) => {
                return b.Tamanho - a.Tamanho;
            });
            //console.log("--");
            //prettier-ignore
            if (citiesLength[0].Tamanho > mostCityLength.cidade.length) {
                mostCityLength.cidade = citiesLength[0].Cidade;
                mostCityLength.sigla = Sigla;
            } else if (citiesLength[0].Tamanho == mostCityLength.cidade.length){
                if(citiesLength[0].Cidade.localeCompare(mostCityLength.cidade) == -1){
                    mostCityLength.cidade = citiesLength[0].Cidade;
                    mostCityLength.sigla = Sigla;
                }
            }

            //console.log(`${citiesLength[0].Cidade} - ${Sigla}`);
            let menor = citiesLength.pop();
            console.log(`${menor.Cidade} - ${Sigla}`);

            if (menor.Tamanho < minCityLength.cidade.length) {
                minCityLength.cidade = menor.Cidade;
                minCityLength.sigla = Sigla;
            } else if (menor.Tamanho === minCityLength.cidade.length) {
                if (menor.Cidade.localeCompare(minCityLength.cidade) === -1) {
                    minCityLength.cidade = menor.Cidade;
                    minCityLength.sigla = Sigla;
                }
            }
        }
        console.log("--");
        console.log(
            `CIDADE MAIOR ${mostCityLength.cidade} - ${mostCityLength.sigla}`
        );
        console.log(
            `CIDADE MENOR ${minCityLength.cidade} - ${minCityLength.sigla}`
        );
    } catch (err) {
        console.log(err);
    }
}

async function init() {
    console.log(await topFive());
    console.log(await underFive());
    console.log(await cityLength());
}
init();
