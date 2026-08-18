function createUser(username, age) {
    console.log(typeof username);
    if (username === undefined) {
        throw new Error("Username is undefined!");
    } else if (typeof age !== "number") {
        throw new Error("Age must be a number!");
    } else if (age < 13) {
        throw new Error("Age must be greater than 13");
    } else {
        return [username, age];
    }
}

let user, age;

try {
    [user, age] = createUser("Alex", 18);
} catch (error) {
    console.log(`${error.message}`);
} finally {
    console.log(`${user} : ${age}`);
}
