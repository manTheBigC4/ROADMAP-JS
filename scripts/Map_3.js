const contacts = new Map();

const addContact = (x, y) => {
    if (typeof x !== "string" || typeof y !== "number") {
        console.log("Name or number must have its appropriate value");
        return;
    }
    if (!contacts.has(x.toLowerCase())) {
        contacts.set(x.toLowerCase(), y);
    } else {
        contacts.set(x.toLowerCase(), y);
    }
};

const removeContact = (x) => {
    if (typeof x !== "string") {
        console.log("Name must be a string!");
        return;
    }
    if (contacts.has(x.toLowerCase())) {
        contacts.delete(x.toLowerCase());
    }
};

const findContact = (x) => {
    if (typeof x !== "string") {
        console.log("Name must be a string!");
        return;
    }
    if (contacts.has(x.toLowerCase())) {
        return contacts.get(x.toLowerCase());
    }
};

const listContacts = () => {
    for (let [k, v] of contacts) {
        console.log(`${k} : ${v}`);
    }
};

const saveToJSON = (n) => {
    const json = JSON.stringify([...n]);
    return json;
};

const loadFromJSON = (n) => {
    const map = new Map(JSON.parse(n));
    return map;
};

addContact("bella", 2320302332);
addContact("niga", 2130132021);

const test = saveToJSON(contacts);

for (let [k, v] of loadFromJSON(test)) {
    console.log(`${k} : ${v}`);
}
