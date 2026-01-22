const sqlite3 = require("sqlite3").verbose();

// This line CREATES database.db if it does not exist
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("Connected to SQLite database");
    }
});

module.exports = db;
