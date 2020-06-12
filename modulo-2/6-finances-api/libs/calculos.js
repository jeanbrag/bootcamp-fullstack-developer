function media(array) {
    const sum = somatorio(array);
    const media = sum / array.length;
    return media;
}

function somatorio(array) {
    const sum = array.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
    return sum;
}

function teste(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x);
        }, Math.random() * 1000);
    });
}

export {media, somatorio, teste};