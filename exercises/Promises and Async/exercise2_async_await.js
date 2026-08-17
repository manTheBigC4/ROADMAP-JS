/**
 * EXERCISE 2 — async / await
 * ===========================
 * Goal: practice async/await syntax, try/catch error handling, and the
 * difference between running things SEQUENTIALLY (one after another with
 * separate awaits) vs PARALLEL (starting all promises first, then awaiting).
 *
 * A tiny fake "API" is provided below — treat it like a black box, like
 * you would treat fetch() or a database call.
 *
 * Run with: node exercise2_async_await.js
 */

// ---------------------------------------------------------------------------
// Fake API (do not edit) — simulates network calls with random-ish latency
// ---------------------------------------------------------------------------

const fakeDatabase = {
    1: { id: 1, name: "Widget" },
    2: { id: 2, name: "Gadget" },
    3: { id: 3, name: "Gizmo" },
};

function fetchUserById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fakeDatabase[id]) {
                resolve(fakeDatabase[id]);
            } else {
                reject(new Error(`No record found for id ${id}`));
            }
        }, 50);
    });
}

// ---------------------------------------------------------------------------
// PART A — Basic async/await
// ---------------------------------------------------------------------------

/**
 * `getRecordName(id)` should be an async function that:
 *   - awaits fetchUserById(id)
 *   - returns just the `.name` field
 * Rewrite the fetchUserById call using await, NOT .then()
 */
async function getRecordName(id) {
    const user = await fetchUserById(id);
    return user.name;
}

// ---------------------------------------------------------------------------
// PART B — try/catch error handling
// ---------------------------------------------------------------------------

/**
 * `getRecordNameSafe(id)` should:
 *   - try to await fetchUserById(id) and return its `.name`
 *   - if it throws, catch the error and return the string "unknown"
 *     (do NOT let the error propagate out of this function)
 */
async function getRecordNameSafe(id) {
    try {
        const user = await fetchUserById(id);
        return user.name;
    } catch (error) {
        return "unknown";
    }
}

// ---------------------------------------------------------------------------
// PART C — Sequential awaiting
// ---------------------------------------------------------------------------

/**
 * `getNamesSequential(ids)` takes an array of ids like [1, 2, 3] and should:
 *   - await fetchUserById for EACH id one at a time, in a loop
 *     (i.e. do NOT start the next fetch until the previous one finishes)
 *   - collect the `.name` of each into an array
 *   - return the array of names, in the same order as `ids`
 *
 * Hint: use a for...of loop with await inside it.
 */
async function getNamesSequential(ids) {
    let name_array = [];

    for (let v of ids) {
        const user = await fetchUserById(v);
        name_array.push(user.name);
    }

    return name_array;
}

// ---------------------------------------------------------------------------
// PART D — Parallel awaiting
// ---------------------------------------------------------------------------

/**
 * `getNamesParallel(ids)` should do the same thing as getNamesSequential,
 * but START all the fetches at the same time (don't await inside the loop),
 * then await all of them together. This should be noticeably faster when
 * ids.length > 1.
 *
 * Hint: build an array of PROMISES first (not yet awaited), then use
 * Promise.all (you may use Promise.all here even though it's covered
 * properly in exercise 3).
 */
async function getNamesParallel(ids) {
    const promiseArray = [];
    let nameArray = [];
    for (let v of ids) {
        promiseArray.push(fetchUserById(v));
    }

    const users = await Promise.all(promiseArray);

    for (let user in users) {
        nameArray.push(users[user].name);
    }

    return nameArray;
}

// ---------------------------------------------------------------------------
// PART E — Sequential dependent calls
// ---------------------------------------------------------------------------

/**
 * `getNameChain(id)` should:
 *   1. await fetchUserById(id)
 *   2. using the result's `.id + 1` as a NEW id, await fetchUserById again
 *   3. return a string: `"${firstRecord.name} -> ${secondRecord.name}"`
 *
 * This demonstrates a case where sequential awaiting is REQUIRED (the second
 * call depends on the result of the first), unlike Part D.
 */
async function getNameChain(id) {
    const firstRecord = await fetchUserById(id);
    id++;
    const secondRecord = await fetchUserById(id);
    id++;
    const thirdRecord = await fetchUserById(id);

    return `${firstRecord.name} -> ${secondRecord.name}`;
}

// ---------------------------------------------------------------------------
// TEST RUNNER — do not edit below this line
// ---------------------------------------------------------------------------

let passed = 0;
let failed = 0;

function check(label, condition) {
    if (condition) {
        console.log(`✅ ${label}`);
        passed++;
    } else {
        console.log(`❌ ${label}`);
        failed++;
    }
}

async function runTests() {
    console.log("--- Part A ---");
    const name1 = await getRecordName(1);
    check("getRecordName(1) === 'Widget'", name1 === "Widget");

    console.log("--- Part B ---");
    const safeName = await getRecordNameSafe(999);
    check("getRecordNameSafe(999) === 'unknown'", safeName === "unknown");
    const safeName2 = await getRecordNameSafe(2);
    check("getRecordNameSafe(2) === 'Gadget'", safeName2 === "Gadget");

    console.log("--- Part C ---");
    const seqStart = Date.now();
    const seqNames = await getNamesSequential([1, 2, 3]);
    const seqDuration = Date.now() - seqStart;
    check(
        "getNamesSequential returns names in order",
        JSON.stringify(seqNames) ===
            JSON.stringify(["Widget", "Gadget", "Gizmo"]),
    );
    check(
        "getNamesSequential took roughly 3x single-call time (ran one-by-one)",
        seqDuration >= 120,
    );

    console.log("--- Part D ---");
    const parStart = Date.now();
    const parNames = await getNamesParallel([1, 2, 3]);
    const parDuration = Date.now() - parStart;
    check(
        "getNamesParallel returns names in order",
        JSON.stringify(parNames) ===
            JSON.stringify(["Widget", "Gadget", "Gizmo"]),
    );
    check(
        "getNamesParallel is meaningfully faster than sequential",
        parDuration < seqDuration,
    );

    console.log("--- Part E ---");
    const chainResult = await getNameChain(1);
    check(
        "getNameChain(1) === 'Widget -> Gadget'",
        chainResult === "Widget -> Gadget",
    );

    console.log(`\n${passed} passed, ${failed} failed`);
}

runTests();
