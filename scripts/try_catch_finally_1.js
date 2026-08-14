function safeDivide(a, b) {
    if (b == 0) {
        throw new Error("The denominator cannot be 0!");
    }
}

let x = 10;
let y = 0;

try {
    safeDivide(x, y);
} catch (error) {
    console.log("Transaction failed:", error.message);
} finally {
    console.log("Continue...");
}
