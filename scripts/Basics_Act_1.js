let max = 100;
let min = 75;

let person = {
    name: "",
    scores: [0, 0, 0],
    isActive: false,
};

const set_scores = (n) => {
    for (let i = 0; i < n.length; i++) {
        n[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

const print_scores = (n) => {
    for (let i = 0; i < n.length; i++) {
        console.log(`The student's scores are: ${n[i]}`);
    }
};

const average_score = (n) => {
    let sum = 0;
    for (let i = 0; i < n.length; i++) {
        sum += n[i];
    }
    return sum / n.length;
};

const get_grade = (n) => {
    if (n >= 95) {
        return "A";
    } else if (n >= 90) {
        return "B";
    } else if (n >= 85) {
        return "C";
    } else if (n >= 80) {
        return "D";
    } else {
        return "F";
    }
};

const get_highest = (n) => {
    let x = 0;
    let y = null;
    for (let [key, value] of Object.entries(n)) {
        if (value > x) {
            x = value;
            y = key;
        }
    }
    return [y, x];
};

let students = [];

let alex = Object.create(person);
alex.name = "Alex";
alex.scores = [0, 0, 0];
set_scores(alex.scores);
alex.isActive = true;
students.push(alex);

let john = Object.create(person);
john.name = "John";
john.scores = [0, 0, 0];
set_scores(john.scores);
john.isActive = true;
students.push(john);

let andrei = Object.create(person);
andrei.name = "Andrei";
andrei.scores = [0, 0, 0];
set_scores(andrei.scores);
andrei.isActive = true;
students.push(andrei);

let ryu = Object.create(person);
ryu.name = "Ryu";
ryu.scores = [0, 0, 0];
set_scores(ryu.scores);
ryu.isActive = true;
students.push(ryu);

let students_list = {};

for (let i = 0; i < students.length; i++) {
    if (
        typeof students[i].name === "string" &&
        Array.isArray(students[i].scores) === true
    ) {
        console.log("Safe!");
    } else {
        console.log("Wrong type!");
    }

    if (students[i].isActive) {
        console.log(
            `${students[i].name}: Average ${average_score(students[i].scores)}`,
        );
        students_list[students[i].name] = average_score(students[i].scores);
    } else {
        console.log(`The student ${students[i].name} is not active!`);
    }
}

const [highestName, highestScore] = get_highest(students_list);
console.log(
    `The student with the highest average is ${highestName} with an average of ${highestScore}`,
);
