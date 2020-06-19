import React, { Component } from "react";
import InputFullSalary from "./components/InputFullSalary";
import InputReadOnly from "./components/InputReadOnly";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fullSalary: 0,
        };
    }

    componentDidMount() {
        console.log(this.fullSalary);
    }

    handleChangeFilter = (newSalary) => {
        this.setState({
            fullSalary: newSalary,
        });
        console.log(this.fullSalary);
    };

    render() {
        const { fullSalary } = this.state;

        return (
            <div>
                <h1>React Salário</h1>
                <InputFullSalary
                    salary={fullSalary}
                    onChangeFilter={this.handleChangeFilter}
                />
                <InputReadOnly salary={fullSalary} />
            </div>
        );
    }
}
