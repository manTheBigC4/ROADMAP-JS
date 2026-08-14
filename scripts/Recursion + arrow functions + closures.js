function createTaskTracker() {
    var task = [];
    var id = 0;

    return {
        add: function (name) {
            id++;
            const newTask = { id: id, name: name, done: false };
            task.push(newTask);
            console.log("Task created!");
        },
        complete: function (id) {
            const foundTask = task.find((x) => x.id === id);
            foundTask.done = true;
            console.log(foundTask);
        },
        list: function () {
            let filtered_array = task.filter((x) => x.done === false);
            console.log(filtered_array);
        },
        summary: function () {
            let test = task.reduce((x, y) => x + (!y.done ? 1 : 0), 0);

            console.log(`${test} remaining tasks...`);
        },
        countDown: function (fromId) {
            function countDown_recursive() {
                if (fromId < 1) {
                    return;
                }

                let taskFound = task.find((x) => x.id === fromId);
                if (taskFound) {
                    console.log(`${taskFound.name}`);
                }
                console.log(`count id at: ${fromId}`);
                fromId--;
                return countDown_recursive();
            }
            return countDown_recursive();
        },
    };
}

const tracker = createTaskTracker();
tracker.add("Write report"); // id 1
tracker.add("Review PR"); // id 2
tracker.add("Fix bug"); // id 3
tracker.add("Dumbass");

//console.log(`${tracker.countDown(3)}`);
tracker.countDown(4);
