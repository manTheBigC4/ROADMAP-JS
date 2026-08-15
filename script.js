function fakeApiCall(shouldSucceed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve("Success: data arrived");
            } else {
                reject(new Error("Error: something broke"));
            }
        }, 1000);
    });
}

// Call 1: success case
fakeApiCall(true)
    .then((data) => console.log(data)) // logs "Success: data arrived" after 1s
    .catch((err) => console.error(err));

// Call 2: failure case
fakeApiCall(false)
    .then((data) => console.log(data))
    .catch((err) => console.error(err)); // logs the Error after 1s
