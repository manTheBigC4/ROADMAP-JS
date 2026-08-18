/**
 * EXERCISE 3 — Promise Combinators
 * ==================================
 * Goal: practice Promise.all, Promise.allSettled, Promise.race, Promise.any
 * — the tools you use when juggling MULTIPLE promises at once.
 *
 * Run with: node exercise3_promise_combinators.js
 */

// ---------------------------------------------------------------------------
// Helpers (do not edit)
// ---------------------------------------------------------------------------

function succeedAfter(ms, value) {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function failAfter(ms, message) {
    return new Promise((_, reject) =>
        setTimeout(() => reject(new Error(message)), ms),
    );
}

// ---------------------------------------------------------------------------
// PART A — Promise.all (fail-fast, all must succeed)
// ---------------------------------------------------------------------------

/**
 * `fetchAllOrNothing(tasks)` takes an array of promise-returning functions
 * (zero-arg functions that each return a promise), e.g. [() => succeedAfter(10, "a"), ...]
 *
 * It should:
 *   - call each function to start all the promises
 *   - use Promise.all to wait for all of them
 *   - return the array of resolved values
 *   - if ANY of them rejects, let that rejection propagate out
 *     (i.e. don't catch it here — Promise.all already does the "fail fast" behavior)
 */
async function fetchAllOrNothing(tasks) {
    let promiseArray = [];
    let resolvedArray = [];
    for (let promise of tasks) {
        promiseArray.push(promise());
    }

    const run = await Promise.all(promiseArray);
    return run;
}

// ---------------------------------------------------------------------------
// PART B — Promise.allSettled (never throws, get status of everything)
// ---------------------------------------------------------------------------

/**
 * `fetchAllResults(tasks)` takes the same kind of array as above, but should:
 *   - use Promise.allSettled so it NEVER throws, even if some tasks fail
 *   - transform the raw allSettled output into a simpler array of objects:
 *       { success: true, value: <value> }   for fulfilled promises
 *       { success: false, error: <message string> }  for rejected promises
 *   - return that simplified array, in the same order as `tasks`
 *
 * Hint: allSettled results look like { status: 'fulfilled', value } or
 * { status: 'rejected', reason }. Use .map() to transform them.
 */
async function fetchAllResults(tasks) {
    let promiseArray = [];
    let simpleArray = [];

    for (let promise of tasks) {
        promiseArray.push(promise());
    }

    const run = await Promise.allSettled(promiseArray);

    for (let results of run) {
        if (results.status === "fulfilled") {
            simpleArray.push({ success: true, value: results.value });
        } else {
            simpleArray.push({
                success: false,
                error: results.reason.message,
            });
        }
    }
    return simpleArray;
}

// ---------------------------------------------------------------------------
// PART C — Promise.race (first to settle wins, success OR failure)
// ---------------------------------------------------------------------------

/**
 * `firstToFinish(tasks)` should use Promise.race to return whichever task
 * settles FIRST — if the fastest one rejects, this function should reject too.
 */
async function firstToFinish(tasks) {
    const run = await Promise.race(tasks.map((x) => x()));
    return run;
}

// ---------------------------------------------------------------------------
// PART D — Promise.any (first SUCCESS wins, ignore failures)
// ---------------------------------------------------------------------------

/**
 * `firstSuccess(tasks)` should use Promise.any to return the value of
 * whichever task succeeds FIRST, ignoring any that fail along the way.
 * It should only reject if ALL tasks fail.
 */
async function firstSuccess(tasks) {
    return await Promise.any(tasks.map((x) => x()));
}

// ---------------------------------------------------------------------------
// PART E — Putting it together: a timeout wrapper
// ---------------------------------------------------------------------------

/**
 * `withTimeout(promise, ms)` should return a new promise that:
 *   - resolves/rejects the same way `promise` does, IF it settles before `ms`
 *   - otherwise rejects with new Error("Timed out") after `ms` milliseconds
 *
 * Hint: this is a great use case for Promise.race between `promise` and a
 * promise that rejects after `ms` via setTimeout.
 */
function withTimeout(promise, ms) {
    const run = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Timed out"));
        }, ms);
    });

    return Promise.race([promise, run]);
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
    const allOk = await fetchAllOrNothing([
        () => succeedAfter(10, "a"),
        () => succeedAfter(20, "b"),
    ]);
    check(
        "fetchAllOrNothing succeeds with all values",
        JSON.stringify(allOk) === JSON.stringify(["a", "b"]),
    );

    let allOrNothingRejected = false;
    try {
        await fetchAllOrNothing([
            () => succeedAfter(10, "a"),
            () => failAfter(15, "bad"),
        ]);
    } catch (e) {
        allOrNothingRejected = e.message === "bad";
    }
    check("fetchAllOrNothing rejects if any task fails", allOrNothingRejected);

    console.log("--- Part B ---");
    const settled = await fetchAllResults([
        () => succeedAfter(10, "ok1"),
        () => failAfter(10, "fail1"),
        () => succeedAfter(10, "ok2"),
    ]);
    check(
        "fetchAllResults never throws and reports each status correctly",
        settled.length === 3 &&
            settled[0].success === true &&
            settled[0].value === "ok1" &&
            settled[1].success === false &&
            settled[1].error === "fail1" &&
            settled[2].success === true &&
            settled[2].value === "ok2",
    );

    console.log("--- Part C ---");
    const raceWinner = await firstToFinish([
        () => succeedAfter(50, "slow"),
        () => succeedAfter(10, "fast"),
    ]);
    check(
        "firstToFinish returns the fastest resolved value",
        raceWinner === "fast",
    );

    let raceRejected = false;
    try {
        await firstToFinish([
            () => failAfter(10, "fast-fail"),
            () => succeedAfter(50, "slow-ok"),
        ]);
    } catch (e) {
        raceRejected = e.message === "fast-fail";
    }
    check(
        "firstToFinish rejects if the fastest settled promise is a rejection",
        raceRejected,
    );

    console.log("--- Part D ---");
    const anySuccess = await firstSuccess([
        () => failAfter(10, "fails-fast"),
        () => succeedAfter(30, "wins-eventually"),
    ]);
    check(
        "firstSuccess ignores early failure and returns the eventual success",
        anySuccess === "wins-eventually",
    );

    console.log("--- Part E ---");
    const fastEnough = await withTimeout(succeedAfter(10, "made it"), 50);
    check(
        "withTimeout resolves normally when promise is fast enough",
        fastEnough === "made it",
    );

    let timedOut = false;
    try {
        await withTimeout(succeedAfter(100, "too slow"), 20);
    } catch (e) {
        timedOut = e.message === "Timed out";
    }
    check(
        "withTimeout rejects with 'Timed out' when promise is too slow",
        timedOut,
    );

    console.log(`\n${passed} passed, ${failed} failed`);
}

runTests();
