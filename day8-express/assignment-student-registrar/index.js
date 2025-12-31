const express = require('express');
const fs = require('fs');
const app = express();
const DB = 'students.json';

// 1. GET /students - See all students
app.get('/students', (req, res) => {
    // TODO: Standard read file
});

// 2. POST /students - Enroll a student
app.post('/students', (req, res) => {
    let body = "";
    // TODO: Capture chunks
    req.on('end', () => {
       // TODO: Standard parse -> read file -> push -> write file
    });
});

// 3. PUT /students/:id - Update student grade
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let body = "";
    // TODO: Capture chunks
    req.on('end', () => {
        // TODO: Find student loop. Update their grade. Save file.
    });
});

// 4. DELETE /students/:id - Expel a student
app.delete('/students/:id', (req, res) => {
    // TODO: Read file -> Filter array -> Write file
});

app.listen(3000, () => console.log('School System running on 3000'));