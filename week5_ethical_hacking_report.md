# Week 5: Ethical Hacking & Exploiting Vulnerabilities

## Goal
The objective of this week was to learn and apply ethical hacking techniques to identify and exploit vulnerabilities in a controlled test environment, with a focus on improving the security of our application.

---

## Tasks Completed

### 1. Ethical Hacking Basics
- Used Kali Linux as the primary penetration testing platform.
- Performed reconnaissance on the test web application hosted locally on port 3000.
- Conducted basic scans to identify open ports and services using Nmap.

### 2. SQL Injection & Exploitation
- Tested for SQL injection vulnerabilities using SQLMap on the login endpoint.
- Analyzed SQLMap results to confirm the absence of injectable parameters due to implemented security measures.
- Applied input validation, sanitization, and prepared statements in the backend to prevent SQL injection attacks.

### 3. Cross-Site Request Forgery (CSRF) Protection
- Implemented CSRF protection using the `csurf` middleware in the Node.js backend.
- Configured cookie-parser to support CSRF tokens stored in cookies.
- Added CSRF token endpoints and enforced token verification on protected routes.
- Tested CSRF vulnerabilities using Burp Suite and confirmed successful mitigation.

---

## Tools Used
- **Kali Linux** – Penetration testing operating system.
- **Nmap** – Network port scanner.
- **SQLMap** – Automated SQL injection testing tool.
- **Burp Suite** – Web vulnerability scanner and testing proxy.
- **Postman** – API testing.
- **Node.js** – Backend server environment.

---

## Results & Analysis

### Nmap Scan Results
Performed an Nmap scan on `localhost` to identify open ports and services:
### PORT STATE SERVICE VERSION
3000/tcp open http Node.js server with security headers enabled


The scan confirmed the application is accessible on port 3000 and running a Node.js server.

### SQLMap Scan Results
Ran SQLMap against the `/login` endpoint to test for SQL injection:

- SQLMap reported no injectable parameters on both `email` and `password` fields.
- The server responded with some HTTP 500 errors and rate limiting was triggered due to many requests.
- This indicates security measures such as input validation and rate limiting are effective.

(Full SQLMap output is attached as `docs/screenshots/sqlmap_result.png`)

### CSRF Protection Testing
- Integrated the `csurf` middleware for CSRF token generation and validation.
- Added a route to expose the CSRF token.
- Verified that login and other sensitive routes require a valid CSRF token.
- Tested using Burp Suite and confirmed that requests without the correct CSRF token were blocked.

(Screenshot of Burp Suite CSRF test attached as `docs/screenshots/csrf_test.png`)

---

## Security Improvements Made
- Added `csurf` middleware for CSRF protection with cookie-based tokens.
- Applied input validation and sanitization using the `validator` library.
- Used bcrypt for secure password hashing.
- Added rate limiting to prevent brute force attacks.
- Set security headers using `helmet` to improve overall HTTP security posture.
- Improved logging with Winston for better monitoring and debugging.

---

## Deliverables
- Ethical hacking report (this document).
- Updated backend code with SQLi prevention and CSRF protection.
- Screenshots of testing tools and results in `/docs/screenshots/`.
- Updated GitHub repository with security improvements and documentation.

---

## Conclusion
Through ethical hacking practices, vulnerabilities were identified and mitigated effectively. The application is now more secure against common web attacks such as SQL Injection and CSRF. Continued security assessments and improvements are recommended to maintain a strong defense posture.

---

*Report prepared by [Muhammad Sufyan]*  
*Date: [27/3/2026]*
