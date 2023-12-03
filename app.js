const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a new sqlite database in memory
const db = new sqlite3.Database(':memory:');
db.serialize(function () {
    db.run("CREATE TABLE user (username TEXT, password TEXT, title TEXT)");
    db.run("INSERT INTO user VALUES ('privilegedUser', 'privilegedUser1', 'Administrator')");
    db.run("INSERT INTO user VALUES ('login', 'password', 'User')");
});

// GET method route to '/' to send the HTML file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// POST route to '/login' to handle form submission
app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // SQL query - written poorly for demonstration
    const query = "SELECT title FROM user WHERE username = '" + username + "' AND password = '" + password + "'";

    // Console log for demonstration
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('SQL Query:', query);

    // SQLite method to verify login
    db.get(query, function (err, row) {
        if (err) {
            console.log('Login Error:', err);
            console.log(`Unsuccessful login attempt with username: ${username}`);
            res.redirect("/index.html#error");
        } else if (!row) {
            console.log(`Unsuccessful login attempt with username: ${username}`);
            res.redirect("/index.html#unauthorized");
        } else {
            console.log(`Successful login for username: ${username}`);
            res.send('Hello <b>' + row.title + '!</b><br /> This file contains all your secret data: <br /><br /> SECRETS <br /><br /> MORE SECRETS <br /><br /> <a href="/index.html">Go back to login</a>');
        }
    });
});

// POST route to '/search' to handle user search
app.post('/search', function (req, res) {
    const searchQuery = req.body.search;

    const query = "SELECT * FROM user WHERE username LIKE '%" + searchQuery + "%'";

    console.log('Search SQL Query:', query);

    db.all(query, function (err, rows) {
        if (err) {
            console.log('Search Error:', err);
            res.send("An error occurred during the search.");
        } else {
            // For simplicity, just sending the raw data back. 
            // In a real app, you'd format this nicely.
            res.send(rows);
        }
    });
});

// Start the server
const port = 3000; // You can choose any port
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
