const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/products", (req, res) => {
    console.log("GET /api/products hit");

    const sql = "SELECT * FROM products";

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
            return;
        }

        res.json(rows);
    });
});

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;

    const sql = "SELECT * FROM products WHERE id = ?";

    db.get(sql, [productId], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
            return;
        }

        if (!row) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        res.json(row);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
