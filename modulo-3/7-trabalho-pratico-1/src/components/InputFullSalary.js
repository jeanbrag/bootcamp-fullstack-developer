import React, { Component } from "react";

export default class InputFullSalary extends Component {
    handleInputChange = (event) => {
        console.log(event.target.value);
        this.props.onChangeFilter(event.target.value);
    };

    render() {
        //const { salary } = this.props;
        return (
            <div>
                <span>Salário bruto:</span>
                <input
                    placeholder="Salário"
                    type="number"
                    //value={salary}
                    onChange={this.handleInputChange}
                />
            </div>
        );
    }
}
