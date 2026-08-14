const enrollments = ["Alex", "Sam", "Jordan", "Alex", "Casey", "Sam", "Alex"];
const map = new Map();

for (let x of enrollments) {
    if (!map.has(x)) {
        map.set(x, 1);
    } else {
        map.set(x, map.get(x) + 1);
    }
}

for (let [k, v] of map) {
    console.log(`${k} has: ${v}`);
}
