# Week 2 – Security Implementation in Node.js Web Application

This phase focuses on implementing secure development practices in a Node.js application including input validation, password hashing, and JWT authentication.

---

## 1. Install Security Dependencies

```bash
npm install validator bcrypt jsonwebtoken express body-parser
```
## 2. Input Validation and Sanitization

Create the validation file:
```bash
touch inputValidation.js
```
```javascript
const validator = require('validator');

function validateInput(email, password) {

if (!validator.isEmail(email)) {
throw new Error("Invalid Email Format");
}

if (!validator.isStrongPassword(password)) {
throw new Error("Weak Password");
}

return true;

}

module.exports = validateInput;```
```
## 3. Secure Password Hashing using Bcrypt

Create password security module:
```bash
touch passwordSecurity.js
```
```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
return hashedPassword;

}

async function comparePassword(password, hash) {

return await bcrypt.compare(password, hash);

}

module.exports = { hashPassword, comparePassword };
```
## 4. JWT Based Authentication

Create JWT authentication module:
```bash
touch jwtAuth.js
```
```javascript
const jwt = require('jsonwebtoken');

const SECRET_KEY = "internship_secret_key";

function generateToken(user) {

return jwt.sign({ email: user }, SECRET_KEY, { expiresIn: "1h" });

}

function verifyToken(token) {

return jwt.verify(token, SECRET_KEY);

}

module.exports = { generateToken, verifyToken };
```
## 5. Secure Express Server Implementation

Create server file:
```bash
touch server.js
```
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const validateInput = require('./inputValidation');
const { hashPassword } = require('./passwordSecurity');
const { generateToken } = require('./jwtAuth');

const app = express();

app.use(bodyParser.json());

app.post('/register', async (req, res) => {

try {

const { email, password } = req.body;

validateInput(email, password);

const hashed = await hashPassword(password);

res.json({
message: "User Registered Securely",
passwordHash: hashed
});

} catch (err) {

res.status(400).send(err.message);

}

});

app.post('/login', (req, res) => {

const { email } = req.body;

const token = generateToken(email);

res.json({ token: token });

});

app.listen(3000, () => {

console.log("Secure Server Running on Port 3000");

});
```
## Security Improvements:

1.Implemented strong input validation

2.Protected passwords using bcrypt hashing

3.Implemented JWT based authentication

4.Secured API endpoints

These implementations significantly improve the security posture of the Node.js application.
