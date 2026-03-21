# Week 1 Security Assessment Report

**Project:** OWASP Juice Shop Web Application  
**Intern Name:** Muhammad Sufyan  
**Organization:** DevelopersHub Corporation  
**Role:** Cyber Security Intern  
**Submission Date:** 18 February 2026  

---

## 1. Introduction
The OWASP Juice Shop application was downloaded from its official GitHub repository
and installed using `npm install`. The application was started using `npm start` and accessed
at [http://localhost:3000](http://localhost:3000). The signup, login, and profile features
were explored and tested as part of this assessment. The purpose of this assessment
was to identify common web security vulnerabilities in a safe lab environment.

---

## 2. Tools and Environment
- **Application Source:** GitHub - OWASP Juice Shop  
- **Application URL:** http://localhost:3000  
- **Operating System:** Kali Linux  
- **Browser:** Mozilla Firefox  
- **Tools Used:** OWASP ZAP, Browser Developer Tools  

---

## 3. Cross Site Scripting Vulnerability
A Cross Site Scripting vulnerability was tested by entering a script payload in the login
input field. The script executed successfully, which shows that the application does not
properly validate user input. This vulnerability can allow attackers to execute malicious
scripts and steal session information.

**Figure 1:** Cross Site Scripting proof
<img width="1920" height="1080" alt="xss screenshot" src="https://github.com/user-attachments/assets/88bc7d65-6f19-43ed-80ff-65de345fd599" />

---

## 4. SQL Injection Vulnerability
A SQL Injection test was performed using a crafted login payload. The test demonstrated
that authentication controls can be bypassed if input validation is not properly
implemented.

**Figure 2:** SQL Injection proof
<img width="1920" height="1080" alt="sql ijection proof" src="https://github.com/user-attachments/assets/bcd4404d-30e1-4ec8-9388-b16b6828550c" />

---

## 5. Token Exposure Issue
The session token was found stored in browser storage without secure protection flags.
This means an attacker can steal the token using client side attacks and gain
unauthorized access.

**Figure 3:** Token Exposure proof
<img width="1920" height="923" alt="token exposure" src="https://github.com/user-attachments/assets/1b55bfea-ab08-4cfa-9ccf-efcd08c9f108" />


---

## 6. Security Misconfiguration
The application was missing important security headers such as Content Security Policy.
This can increase the risk of attacks such as clickjacking and script injection.

**Figure 4:** Security Misconfiguration proof
<img width="1920" height="923" alt="file misconfiguration" src="https://github.com/user-attachments/assets/85033aa0-8bb3-4296-8570-f4cf02ccae0c" />


---

## 7. OWASP ZAP Scan Results
An automated vulnerability scan was performed using OWASP ZAP. The scan identified
multiple issues including missing headers and injection related risks.

**Figure 5:** OWASP ZAP scan results
<img width="1920" height="923" alt="VirtualBox_kali-linux-2025 3-virtualbox-amd64_18_02_2026_13_21_51" src="https://github.com/user-attachments/assets/4dde3dc6-0202-40ca-8895-7abb0bc6a7c3" />


---

## 8. Recommendations
- Validate and sanitize all user inputs  
- Enable secure cookie flags  
- Implement HTTPS  
- Configure security headers  
- Perform regular security testing  

---

## 9. Conclusion
This security assessment helped identify common web vulnerabilities. Fixing these issues
will improve the overall security of the application.

---

**Note:** Screenshots and evidence files should be uploaded in the same repository
or linked appropriately if needed.  
