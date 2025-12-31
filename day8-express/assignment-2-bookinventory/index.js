const express = require('express');
const fs = require('fs');
const app = express();
const DATA_FILE = 'books.json';

// 1. GET /books - Read and return all books
app.get('/books', (req, res) => {
    // TODO: Read file, handle error, send data
});

// 2. POST /books - Add a new book
app.post('/books', (req, res) => {
    let body = "";
    // TODO: Listen for 'data' chunks
    
    req.on('end', () => {
        // TODO: Parse body, add random ID, read file, push to array, write file back
    });
});

// 3. PUT /books/:id - Update book price
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let body = "";
    
    // TODO: Listen for chunks, on 'end' update the specific book's price
});

// 4. DELETE /books/:id - Remove a book
app.delete('/books/:id', (req, res) => {
    // TODO: Read file, filter out the book with matching ID, write new array
});

app.listen(3000, () => console.log('Bookstore API running on 3000'));