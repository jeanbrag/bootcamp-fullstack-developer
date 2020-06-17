import React, { Component, Fragment } from "react";
import css from "./counter.module.css";

export default class Counter extends Component {
    constructor() {
        super();
        this.currentCounter = 2;
    }

    handleClick = () => {
        this.currentCounter++;
    };

    render() {
        return (
            <div className={css.counterContainer}>
                <button
                    onClick={this.handleClick}
                    className="waves-effectwaves-light btn red darken-4"
                >
                    -
                </button>
                <span className={css.counterContainer}>
                    {this.currentCounter}
                </span>
                <button
                    onClick={this.handleClick}
                    className="waves-effectwaves-light btn green darken-4"
                >
                    +
                </button>
            </div>
        );
    }
}
