function readFile(name) {
    if (name !== "config.json") {
        throw new Error("File type isn't json!");
    } else {
        return "File contents...";
    }
}

try {
    readFile("con.a");
} catch (error) {
    console.log(`Wrong file: ${error.message}`);
} finally {
    console.log("Cleanup: closing file handle");
}
