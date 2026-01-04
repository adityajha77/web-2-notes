const express = require('express');
const cors = require('cors'); // We can use the 'cors' package here for simplicity
const app = express();
const PORT = 3000;

app.use(cors()); // Allow all origins

const products = [
    { name: "Golden Watch", price: 5000 },
    { name: "Silver Ring", price: 200 },
    { name: "Plastic Toy", price: 5 }
];

// --- TODO 1: Auth Middleware ---
// Create a middleware function 'vipCheck'.
// 1. Look for a header named 'x-vip-token'.
// 2. If it equals 'super-secret', call next().
// 3. If not, return status 403 with error "Access Denied".

const vipCheck = (req, res, next) => {
    // Write code...
};

// --- TODO 2: Search Route with Query ---
// Create a GET route '/search'.
// 1. Add 'vipCheck' as middleware for this route.
// 2. Read the 'q' parameter from req.query (e.g. /search?q=ring).
// 3. Filter the 'products' array to find items that include that string (case-insensitive).
// 4. Return the filtered list.

app.get('/search', vipCheck, (req, res) => {
    // Write code...
});

app.listen(PORT, () => console.log(`VIP Server running on ${PORT}`));