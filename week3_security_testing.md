# Week 3 – Advanced Security Testing, Logging & Final Security Checklist

This phase focuses on authentication testing, basic penetration testing, logging implementation, and preparing a final security checklist for the Node.js application.

---

## 1. Authentication Testing using CURL

Authentication endpoints were tested using CURL commands to confirm that JWT authentication is functioning correctly.

### Login Request

```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com"}'
```
This request generates a JWT token which can be used to access protected endpoints.

## Access Protected Route
```bash
curl http://localhost:3000/profile \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```
If the token is valid, the protected endpoint returns user profile information.

## 2. Basic Penetration Testing using Nmap

Nmap scanning was performed on the local machine to verify that the Node.js server is active and reachable.

Run the following command:
```bash
nmap localhost
```
Expected Result:

1.Port 3000 should appear open

2.Confirms that the Node.js application is running

## 3. Logging Implementation using Winston

Winston logging library was implemented to track application events and security activities.

Install Winston:
```bash
npm install winston
```
Create logging file:
```bash
touch logger.js
```
Add the following code:
```javascript
const winston = require('winston');

const logger = winston.createLogger({
level: 'info',
format: winston.format.json(),
transports: [
new winston.transports.Console(),
new winston.transports.File({ filename: 'security.log' })
]
});

module.exports = logger;
```
Example usage inside the application:
```javascript
const logger = require('./logger');

logger.info("Application started successfully");
logger.warn("Security warning detected");
logger.error("Authentication error occurred");
```
Logs will be stored in the following file:
```bash
security.log
```
This helps with security monitoring and auditing.
## 4. Final Security Checklist

The following security practices were verified and implemented:

Input validation and sanitization

Password hashing using bcrypt

JWT authentication for protected routes

Secure API design

Logging and monitoring

Basic penetration testing

Regular vulnerability assessments

HTTPS recommended for production

## 5. Project Security Outcome

The final phase of the project confirms that the Node.js web application now follows several essential security best practices.

Compared to the initial vulnerability assessment, the system now includes secure authentication, improved input handling, and logging mechanisms that support monitoring and incident response.
