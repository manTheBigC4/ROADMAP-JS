function test() {
    return new Promise((resolve, reject) => {
        resolve("test");
    });
}

function test2(v) {
    return new Promise((resolve, reject) => {
        reject(new Error(v));
    });
}

function test3(v) {
    return new Promise((resolve, reject) => {
        reject(new Error(v));
    });
}

test()
    .then((msg) => {
        console.log("First promise consumed");
        return test2("error");
    })
    .then((msg) => {
        console.log("Second promise consumed");
        return test3("test 3 error");
    })
    .then((msg) => {
        console.log("Second promise consumed");
    })
    .catch((msg) => {
        console.log(msg.message);
    });
