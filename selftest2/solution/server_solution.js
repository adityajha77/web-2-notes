const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const products = [
    { name: "Golden Watch", price: 5000 },
    { name: "Silver Ring", price: 200 },
    { name: "Plastic Toy", price: 5 }
];

// TODO 1: Auth Middleware
const vipCheck = (req, res, next) => {
    // Headers are usually lowercased by Express automatically
    const token = req.headers['x-vip-token'];
    
    if (token === 'super-secret') {
        next();
    } else {
        res.status(403).json({ error: "Access Denied" });
    }
};

// TODO 2: Search Route
app.get('/search', vipCheck, (req, res) => {
    const query = req.query.q || ""; // Default to empty string if missing
    
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
    );
    
    res.json(filtered);
});

app.listen(3000);