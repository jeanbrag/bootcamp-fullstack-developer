import React, { Component } from "react";
import css from "./counter.module.css";
import DecrementButton from "./DecrementButton";
import IncrementButton from "./IncrementButton";
import Value from "./Value.js";
import Steps from "./Steps.js";

export default class Counter2 extends Component {
    handleButtonClick = (clickType) => {
        this.props.onCount(clickType);
    };

    render() {
        const { countValue, currentSteps } = this.props;
        return (
            <div className={css.counterContainer}>
                <DecrementButton onDecrement={this.handleButtonClick} />
                <Value value={countValue} />
                <IncrementButton onIncrement={this.handleButtonClick} />
                <Steps value={currentSteps} />
            </div>
        );
    }
}
