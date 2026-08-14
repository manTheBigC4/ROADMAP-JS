function createScheduler() {
    let task = [];

    return {
        addTask: function (name, dependencies) {
            let newTask = { name: name, dependencies: dependencies };
            task.push(newTask);
            console.log(`${name} has been registered!`);
        },
        run: function (name) {
            let findTask = task.find((x) => x.name === name);
            console.log(findTask);
            if (findTask.dependencies.length === 0) {
                return;
            } else if (findTask.dependencies.length >= 2) {
                for (const dependency of findTask.dependencies) {
                    this.run(dependency);
                }
            }

            this.run();
        },
    };
}

const scheduler = createScheduler();

scheduler.addTask("wake_up", []);
scheduler.addTask("shower", ["wake_up"]);
scheduler.addTask("brush_teeth", ["wake_up"]);
scheduler.addTask("get_dressed", ["shower"]);
scheduler.addTask("leave_house", ["get_dressed", "brush_teeth"]);

scheduler.run("leave_house");
