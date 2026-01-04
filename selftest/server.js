const express = require('express');
const app = express();
const PORT = 3000;

let messages = [
    { id: 1, text: "Welcome to the board!", user: "Admin" }
];

// --- TODO 1: Middleware Setup ---
// 1. Setup express.json() to parse incoming body data.
// 2. Create a manual Middleware for CORS. 
//    - It must set 'Access-Control-Allow-Origin' to '*'.
//    - It must set 'Access-Control-Allow-Headers' to 'Content-Type'.
//    - Don't forget next()!

// Write middleware here...


// --- TODO 2: GET Route ---
// Create a GET route at '/messages'.
// Simply return the 'messages' array as JSON.

// Write GET route here...


// --- TODO 3: POST Route ---
// Create a POST route at '/messages'.
// 1. Destructure 'text' and 'user' from req.body.
// 2. Create a new object { id: Date.now(), text, user }.
// 3. Push it to the 'messages' array.
// 4. Send back a success message (e.g., { status: "success" }).

// Write POST route here...


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));