function formatName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

function getGreeting(timeOfDay) {
    const time = timeOfDay % 24;
    console.log(time);
    if (time >= 0 && time <= 11) {
        return "Good morning";
    } else if (time >= 12 && time <= 17) {
        return "Good afternoon";
    } else if (time >= 18 && time <= 23) {
        return "Good evening";
    }
}

function createGreeting(firstName, lastName, timeOfDay) {
    return `${getGreeting(timeOfDay)}, ${firstName} ${lastName}`;
}

console.log(createGreeting("Ava", "Stone", 35));
