function test() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("test");
        }, 2000);
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

async function main() {
    console.log("Macarena Macarena");
    const user = await test();

    console.log(user);
}

main();
