const db = require("./db");

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      image TEXT,
      category TEXT,
      sizes TEXT
    )
  `, (err) => {
        if (err) {
            console.error("Error creating table:", err);
        } else {
            console.log("Products table ready");
        }
    });
});
