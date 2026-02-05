const db = require("./db");

const products = [
    {
        name: "Alumni Tee",
        price: 2500,
        image: "tee.jpg",
        category: "tshirts",
        sizes: "S,M,L,XL"
    },
    {
        name: "Varsity Hoodie",
        price: 4500,
        image: "hoodie.jpg",
        category: "hoodies",
        sizes: "M,L,XL"
    },
    {
        name: "Campus Cap",
        price: 1500,
        image: "cap.jpg",
        category: "caps",
        sizes: "One Size"
    }
];

db.serialize(() => {
    const stmt = db.prepare(`
    INSERT INTO products (name, price, image, category, sizes)
    VALUES (?, ?, ?, ?, ?)
  `);

    products.forEach(p => {
        stmt.run(p.name, p.price, p.image, p.category, p.sizes);
    });

    stmt.finalize();
    console.log("Products inserted successfully");
});
