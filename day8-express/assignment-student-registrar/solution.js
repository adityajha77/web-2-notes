const express = require('express');
const fs = require('fs');
const app = express();
const DB = 'students.json';

app.get('/students', (req, res) => {
    fs.readFile(DB, 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Database error");
        res.send(data);
    });
});

app.post('/students', (req, res) => {
    let body = "";
    req.on('data', chunk => body += chunk.toString());
    
    req.on('end', () => {
        const newStudent = JSON.parse(body);
        newStudent.id = Math.floor(Math.random() * 1000);
        newStudent.status = "Active"; // Default value

        fs.readFile(DB, 'utf-8', (err, data) => {
            if (err) return res.status(500).send("Read error");
            
            // Handle case where file might be empty string
            const students = data ? JSON.parse(data) : [];
            students.push(newStudent);

            fs.writeFile(DB, JSON.stringify(students), (err) => {
                if (err) return res.status(500).send("Write error");
                res.status(201).send("Student Enrolled");
            });
        });
    });
});

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let body = "";
    req.on('data', chunk => body += chunk.toString());

    req.on('end', () => {
        const updateData = JSON.parse(body);
        
        fs.readFile(DB, 'utf-8', (err, data) => {
            if (err) return res.status(500).send("Read error");
            
            let students = JSON.parse(data);
            let found = false;

            for(let i = 0; i < students.length; i++) {
                if(students[i].id === id) {
                    students[i].grade = updateData.grade; // Update grade
                    students[i].status = updateData.status; // Update status
                    found = true;
                    break;
                }
            }

            if(!found) return res.status(404).send("Student not found");

            fs.writeFile(DB, JSON.stringify(students), (err) => {
                if (err) return res.status(500).send("Write error");
                res.send("Student Record Updated");
            });
        });
    });
});

app.delete('/students/:id', (req, res) => {
    fs.readFile(DB, 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Read error");
        
        const students = JSON.parse(data);
        const id = parseInt(req.params.id);
        const remainingStudents = students.filter(s => s.id !== id);

        if(remainingStudents.length === students.length) {
            return res.status(404).send("Student not found");
        }

        fs.writeFile(DB, JSON.stringify(remainingStudents), (err) => {
            if (err) return res.status(500).send("Write error");
            res.send("Student Expelled");
        });
    });
});

app.listen(3000, () => console.log('School System running on 3000'));