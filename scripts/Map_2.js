const word = "mississippi";
const map = new Map();

for (let x of word) {
    if (!map.has(x)) {
        map.set(x, 1);
    } else {
        map.set(x, map.get(x) + 1);
    }
}

let max = 0;

for (let [k, v] of map) {
    if (v > max) {
        max = v;
    }
    console.log(`${k} has ${v}`);
}

for (let [k, v] of map) {
    if (map.get(k) == max) {
        console.log(`${k} has the biggest repetition: ${max}`);
    }
}
