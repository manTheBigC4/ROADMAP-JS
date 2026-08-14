function processInput(input) {
    let x = JSON.parse(input);
    return x.user.name;
}

try {
    processInput("test");
} catch (error) {
    if (error) {
        console.log("Syntax error!");
    } else if (error instanceof TypeError) {
        console.log("Type error!");
    } else if (error instanceof RangeError) {
        console.log("Range error");
    } else {
        console.log(`${error.message}`);
    }
}
