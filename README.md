# Educational App: SQL Injection Demonstration

## Overview
This educational app is designed to demonstrate SQL injection vulnerabilities in web applications. It's a simple Express.js server with a mock SQLite database to handle user logins and search functionalities.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/djmotor90/sql-injection-activity
cd sql-injection-activity
npm install
```
Make sure you have Node.js and npm installed on your system.

Running the Server
Run the server using the following command:

```bash
node app.js
```
The server will start on localhost:3000

## App Structure
* app.js: The main server file with Express.js setup.
* index.html: The frontend HTML file with login and search forms.
* style.css: The stylesheet for the frontend.

## Database Setup
The SQLite database is created in memory with a user table. It's populated with sample user data for login testing.

## Features

## Login
<a href="https://ibb.co/BPpGCYQ"><img src="https://i.ibb.co/mBj0cP2/Screenshot-2023-12-03-at-11-26-29-AM.png" alt="Screenshot-2023-12-03-at-11-26-29-AM" border="0"></a>  
Users can log in using their username and password.
The login feature is intentionally vulnerable to SQL injection.

## User Search
<a href="https://imgbb.com/"><img src="https://i.ibb.co/fSH6KMS/Screenshot-2023-12-03-at-11-26-45-AM.png" alt="Screenshot-2023-12-03-at-11-26-45-AM" border="0"></a>  
A simple search feature to search users by username.
This feature is also vulnerable to SQL injection.

## Testing Vulnerabilities
## SQL Injection in Login
* Normal Login: Use a known username and password to log in.
* Injection Attack: Use a username and the following string as the password: unknown' OR '1'='1.

## SQL Injection in User Search
* Normal Search: Search for a username using a part or full name.
* Injection Attack: Use the following string in the search: %' OR '1'='1.

## Security Note
This application is for educational purposes only and demonstrates how SQL injection can be exploited. In real-world applications, always use parameterized queries or prepared statements to prevent SQL injection.
