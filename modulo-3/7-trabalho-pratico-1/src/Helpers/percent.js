function percent(value, totalValue) {
    const valor = (value / totalValue) * 100;
    const arredondado = parseFloat(valor.toFixed(2));
    return arredondado;
}

export { percent };
