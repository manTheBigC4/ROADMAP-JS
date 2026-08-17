/**
 * EXERCISE 1 — Promise Fundamentals
 * ==================================
 * Goal: get comfortable writing raw Promises (new Promise, resolve, reject,
 * .then, .catch, .finally) without async/await yet.
 *
 * Fill in every function marked with TODO. Do not change function
 * signatures (name / parameters) — the tests below depend on them.
 *
 * Run with: node exercise1_promise_fundamentals.js
 */

// ---------------------------------------------------------------------------
// PART A — Wrap a callback-style function in a Promise
// ---------------------------------------------------------------------------

/**
 * `delay(ms, value)` should return a Promise that resolves with `value`
 * after `ms` milliseconds, using setTimeout internally.
 *
 * Example: delay(100, "hi").then(v => console.log(v)) // logs "hi" after 100ms
 */
function delay(ms, value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, ms);
    });
}

/**
 * `delayReject(ms, errorMessage)` should return a Promise that REJECTS
 * after `ms` milliseconds with `new Error(errorMessage)`.
 */
function delayReject(ms, errorMessage) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(errorMessage));
        }, ms);
    });
}

// ---------------------------------------------------------------------------
// PART B — Chaining .then
// ---------------------------------------------------------------------------

/**
 * `doubleThenAddTen(startValue)` should:
 *   1. Wrap startValue in a resolved promise (Promise.resolve)
 *   2. .then() double it
 *   3. .then() add 10
 *   4. return the resulting promise (do NOT await it here, just return the chain)
 */
function doubleThenAddTen(startValue) {
    return Promise.resolve(startValue)
        .then((x) => x * 2)
        .then((x) => x + 10);
}

// ---------------------------------------------------------------------------
// PART C — Catching errors
// ---------------------------------------------------------------------------

/**
 * `safeDivide(a, b)` should return a Promise.
 *   - If b === 0, the promise should reject with new Error("Cannot divide by zero")
 *   - Otherwise resolve with a / b
 */
function safeDivide(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject(new Error("Cannot divide by zero"));
        } else {
            resolve(a / b);
        }
    });
}

/**
 * `safeDivideWithFallback(a, b, fallbackValue)` should call safeDivide(a, b)
 * and use .catch() so that if it rejects, the returned promise resolves
 * with `fallbackValue` instead of throwing.
 */
function safeDivideWithFallback(a, b, fallbackValue) {
    return safeDivide(a, b)
        .then((x) => x)
        .catch(() => fallbackValue);
}

// ---------------------------------------------------------------------------
// PART D — .finally
// ---------------------------------------------------------------------------

/**
 * `timedTask(ms, shouldFail)` should:
 *   - return a promise that resolves with "done" after `ms` ms
 *     (or rejects with new Error("task failed") after `ms` ms if shouldFail is true)
 *   - regardless of success/failure, call `onCleanup()` (passed in) via .finally()
 *
 * Signature: timedTask(ms, shouldFail, onCleanup)
 */
function timedTask(ms, shouldFail, onCleanup) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail === true) {
                reject(new Error("task failed"));
            } else {
                resolve("done");
            }
        }, ms);
    }).finally(() => onCleanup());
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
    const delayed = await delay(30, "hello");
    check("delay resolves with correct value", delayed === "hello");

    let delayRejectCaught = false;
    try {
        await delayReject(30, "boom");
    } catch (err) {
        delayRejectCaught = err instanceof Error && err.message === "boom";
    }
    check("delayReject rejects with correct Error", delayRejectCaught);

    console.log("--- Part B ---");
    const chained = await doubleThenAddTen(5);
    check("doubleThenAddTen(5) === 20", chained === 20);

    console.log("--- Part C ---");
    const divided = await safeDivide(10, 2);
    check("safeDivide(10, 2) === 5", divided === 5);

    let divideByZeroCaught = false;
    try {
        await safeDivide(10, 0);
    } catch (err) {
        divideByZeroCaught = err instanceof Error && /zero/i.test(err.message);
    }
    check("safeDivide(10, 0) rejects", divideByZeroCaught);

    const fallback = await safeDivideWithFallback(10, 0, -1);
    check("safeDivideWithFallback returns fallback on error", fallback === -1);

    const noFallbackNeeded = await safeDivideWithFallback(10, 5, -1);
    check(
        "safeDivideWithFallback returns real value when no error",
        noFallbackNeeded === 2,
    );

    console.log("--- Part D ---");
    let cleanupCalled = false;
    const result = await timedTask(30, false, () => {
        cleanupCalled = true;
    });
    check("timedTask resolves with 'done'", result === "done");
    check("timedTask calls cleanup on success", cleanupCalled === true);

    let cleanupCalled2 = false;
    let taskFailedCaught = false;
    try {
        await timedTask(30, true, () => {
            cleanupCalled2 = true;
        });
    } catch (err) {
        taskFailedCaught = err instanceof Error;
    }
    check("timedTask rejects when shouldFail is true", taskFailedCaught);
    check("timedTask calls cleanup on failure too", cleanupCalled2 === true);

    console.log(`\n${passed} passed, ${failed} failed`);
}

runTests();
