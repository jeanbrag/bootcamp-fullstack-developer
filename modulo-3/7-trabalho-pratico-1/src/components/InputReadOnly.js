import React, { Component } from "react";
import css from "./inputreadonly.module.css";
import { calculateSalaryFrom } from "../Helpers/salary";
import { percent } from "../Helpers/percent";
import { formatNumber } from "../Helpers/formatHelpers";
import Bar from "./Bar";

export default class InputReadOnly extends Component {
    render() {
        const { salary } = this.props;
        const values = calculateSalaryFrom(salary);
        return (
            <div>
                <div className={css.flexRow}>
                    <ul>
                        <span>Base INSS: </span>
                        <input
                            className={css.values}
                            readOnly
                            value={`R$ ${formatNumber(values.baseINSS)}`}
                        />
                    </ul>
                    <ul>
                        <span>Desconto INSS: </span>
                        <input
                            className={css.values}
                            readOnly
                            value={`R$ ${formatNumber(
                                values.discountINSS
                            )} (${percent(
                                values.discountINSS,
                                values.baseINSS
                            )}%)`}
                        />
                    </ul>
                    <ul>
                        <span>Base IRPF: </span>
                        <input
                            className={css.values}
                            readOnly
                            value={`R$ ${formatNumber(values.baseIRPF)}`}
                        />
                    </ul>
                    <ul>
                        <span>Desconto IRPF: </span>
                        <strong>
                            <input
                                className={css.values}
                                readOnly
                                value={`R$ ${formatNumber(
                                    values.discountIRPF
                                )} (${percent(
                                    values.discountIRPF,
                                    values.baseINSS
                                )}%)`}
                            />
                        </strong>
                    </ul>
                    <ul>
                        <span>Salário Líquido: </span>
                        <input
                            className={css.values}
                            readOnly
                            value={`R$ ${formatNumber(
                                values.netSalary
                            )} (${percent(
                                values.netSalary,
                                values.baseINSS
                            )}%)`}
                        />
                    </ul>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Bar value={values.discountINSS} color="#e67e22" />
                    <Bar value={values.discountIRPF} color="#c0392b" />
                    <Bar value={values.netSalary} color="#16a085" />
                </div>
            </div>
        );
    }
}
