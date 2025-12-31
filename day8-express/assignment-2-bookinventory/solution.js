const express = require('express');
const fs = require('fs');
const app = express();
const DATA_FILE = 'books.json';

app.get('/books', (req, res) => {
    fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Error reading database");
        res.send(data);
    });
});

app.post('/books', (req, res) => {
    let body = "";
    req.on('data', chunk => body += chunk.toString());
    
    req.on('end', () => {
        const newBook = JSON.parse(body);
        newBook.id = Math.floor(Math.random() * 10000);
        
        fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
            if (err) return res.status(500).send("Error reading file");
            
            const books = JSON.parse(data);
            books.push(newBook);
            
            fs.writeFile(DATA_FILE, JSON.stringify(books), (err) => {
                if (err) return res.status(500).send("Error writing file");
                res.status(201).send("Book added successfully");
            });
        });
    });
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let body = "";
    req.on('data', chunk => body += chunk.toString());

    req.on('end', () => {
        const updates = JSON.parse(body);
        
        fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
            if (err) return res.status(500).send("Error reading file");
            
            let books = JSON.parse(data);
            let book = books.find(b => b.id === id);

            if (!book) return res.status(404).send("Book not found");

            // Update fields
            book.price = updates.price;
            // Optional: update other fields if provided
            if(updates.title) book.title = updates.title;

            fs.writeFile(DATA_FILE, JSON.stringify(books), (err) => {
                if (err) return res.status(500).send("Error writing file");
                res.send("Book updated");
            });
        });
    });
});

app.delete('/books/:id', (req, res) => {
    fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        
        let books = JSON.parse(data);
        const id = parseInt(req.params.id);
        const newBooks = books.filter(b => b.id !== id);
        
        if (books.length === newBooks.length) return res.status(404).send("Book not found");
        
        fs.writeFile(DATA_FILE, JSON.stringify(newBooks), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.send("Book deleted");
        });
    });
});

app.listen(3000, () => console.log('Bookstore API running on 3000'));