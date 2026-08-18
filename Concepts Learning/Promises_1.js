function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Resolved after ${ms}`);
        }, ms);
    });
}

const test = delay(2000);

test.then((msg) => {
    console.log(msg);
    delay(4000).then((x) => console.log(msg));
})
    .then((time) => delay(time))
    .then((msg) => {
        console.log(msg);

        return 6000;
    })
    .then((time) => delay(time))
    .then((msg) => console.log(msg));
