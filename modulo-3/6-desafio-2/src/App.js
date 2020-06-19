import React, { Component } from "react";
import Countries from "./components/Countries";
import Header from "./components/Header";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            allCountries: [],
            filteredCountries: [],
            filteredPopulation: 0,
            filter: "",
        };
    }

    calculatePopulationFrom = (countries) => {
        const filteredPopulation = countries.reduce((acc, curr) => {
            return acc + curr.population;
        }, 0);

        return filteredPopulation;
    };
    async componentDidMount() {
        console.log(this.filteredPopulation);
        const res = await fetch("https://restcountries.eu/rest/v2/all");
        const json = await res.json();

        const allCountries = json.map(
            ({ name, numericCode, flag, population }) => {
                return {
                    id: numericCode,
                    name,
                    filterName: name.toLowerCase(),
                    flag,
                    population,
                };
            }
        );

        this.setState({
            allCountries,
            filteredCountries: Object.assign([], allCountries),
            filteredPopulation: this.calculatePopulationFrom(allCountries),
        });
    }

    handleChangeFilter = (newFilter) => {
        this.setState({
            filter: newFilter,
        });
        const filteredCountries = this.state.allCountries.filter((country) => {
            return country.filterName.includes(newFilter.toLowerCase());
        });

        this.setState({
            filteredCountries,
            filteredPopulation: this.calculatePopulationFrom(filteredCountries),
        });
    };

    render() {
        const { filteredCountries, filter, filteredPopulation } = this.state;

        return (
            <div className="container">
                <h1>React Countries</h1>
                <Header
                    filter={filter}
                    countryCount={filteredCountries.length}
                    populacao={filteredPopulation}
                    onChangeFilter={this.handleChangeFilter}
                />
                <Countries countries={filteredCountries} />
            </div>
        );
    }
}
