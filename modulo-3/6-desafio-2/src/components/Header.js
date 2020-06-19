import React, { Component } from "react";
import { formatNumber } from "./Helpers/formatHelpers";
import css from "./header.module.css";

export default class Header extends Component {
    handleInputChange = (event) => {
        this.props.onChangeFilter(event.target.value);
    };
    render() {
        const { filter, countryCount, populacao } = this.props;
        return (
            <div className={css.flexRow}>
                <input
                    placeholder="Filtro"
                    type="text"
                    value={filter}
                    onChange={this.handleInputChange}
                />
                <span>
                    Países: <strong>{countryCount}</strong>{" "}
                </span>
                <span>
                    População: <strong>{formatNumber(populacao)}</strong>{" "}
                </span>
            </div>
        );
    }
}
