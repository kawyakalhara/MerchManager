const db = require("./db");

const products = [
    //tshirts
{
    name: "UOR Official T-shirt",
    price: 2500,
    image: "maroon tee.png",
    category: "tshirts",
    sizes: "S,M,L,XL"
},
{
    name: "UOR Official T-shirt(Yellow)",
    price: 2500,
    image: "yellow tee.png",
    category: "tshirts",
    sizes: "S,M,L,XL"
},
{
    name: "UOR Official T-shirt(Navy Blue)",
    price: 2500,
    image: "blue tee.png",
    category: "tshirts",
    sizes: "S,M,L,XL"
},
{
    name: "CSSC Official T-shirt",
    price: 2800,
    image: "cssc official tee.png",
    category: "tshirts",
    sizes: "S,M,L,XL"
},
{
    name: "Artwork T-shirt",
    price: 2700,
    image: "artwork tee.png",
    category: "tshirts",
    sizes: "S,M,L,XL"
},

//hoodies
{
    name: "UOR Official hoodie (Yellow)",
    price: 4500,
    image: "hoodie yellow.png",
    category: "hoodies",
    sizes: "M,L,XL"
},
{
    name: "UOR Official hoodie (Nvy Blue)",
    price: 4500,
    image: "hoodie blue.png",
    category: "hoodies",
    sizes: "M,L,XL"
},
{
    name: "UOR Official hoodie (Maroon)",
    price: 4500,
    image: "hoodie maroon.png",
    category: "hoodies",
    sizes: "M,L,XL"
},

//caps
{
    name: "University Hat",
    price: 1500,
    image: "hat.png",
    category: "caps",
    sizes: "Free"
},
{
    name: "University Cap",
    price: 1500,
    image: "cap.png",
    category: "caps",
    sizes: "Free"
},
{
    name: "Netball Cap",
    price: 1600,
    image: "netball cap.png",
    category: "caps",
    sizes: "Free"
},

//wristbands
{
    name: "Maroon Wristband",
    price: 600,
    image: "maroon wristband.png",
    category: "wristbands",
    sizes: "Free"
},
{
    name: "Black Wristband",
    price: 600,
    image: "black wrist band.png",
    category: "wristbands",
    sizes: "Free"
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
