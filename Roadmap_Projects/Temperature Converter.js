function celsiusToFarenheit(celsius) {
    return celsius * (9 / 5) + 32;
}

function farenheitToCelsius(farenheit) {
    return (farenheit - 32) / (9 / 5);
}

function formatTemperature(value, unit) {
    if (typeof unit !== "string") {
        return;
    }

    return `${value} ${unit.toUpperCase()}`;
}

console.log(formatTemperature(celsiusToFarenheit(20), "f"));
console.log("hi");
