# Ajinkya Bhondave - Full-Stack Portfolio

A portfolio website built with a **React.js** frontend and a **Spring Boot (Java)** backend.

## Technologies

| Layer | Technologies |
|---|---|
| Frontend | React.js 18, JSX, hooks (useState, useEffect), custom hook, Vite, HTML5, CSS3 (grid, flexbox, custom properties, animations), JavaScript (ES6+), Fetch API |
| Backend | Java 8, Spring Boot 2.7, Spring Web (REST API), Spring Data JPA / Hibernate, Bean Validation, JavaMailSender |
| Database | H2 (default, zero setup) or PostgreSQL (profile `postgres`) |
| Tools | Maven, npm, Git, GitHub, Eclipse / VS Code |

## What it does
- React site with Home, Services, Resume (tabs), Work and Contact pages
- `GET /api/profile` returns all portfolio content (from `portfolio.json`), so you update your details in one file
- `POST /api/contact` validates and saves contact-form messages (JPA + database) and can email them to you
- `GET /api/admin/messages` (header `X-Admin-Token`) lists saved messages
- If the backend is offline, the site still works from bundled data, and the contact form falls back to Gmail / mail app / copy message

## Project structure
```
backend/                        Spring Boot app
  pom.xml
  src/main/java/com/ajinkya/portfolio/
    PortfolioApplication.java
    controller/PortfolioController.java   REST endpoints
    service/ContactService.java           save message + optional email
    repository/ContactMessageRepository.java
    model/ContactMessage.java             JPA entity
    dto/ContactRequest.java               validated request body
    config/WebConfig.java                 CORS
    exception/GlobalExceptionHandler.java validation errors -> JSON
  src/main/resources/
    portfolio.json                        YOUR CONTENT (edit this)
    application.properties
    application-postgres.properties
frontend/                       React app (Vite)
  src/App.jsx, components/*, hooks/usePortfolio.js, api.js
  src/data/portfolio.json                 same content (offline fallback)
  src/styles.css
```

## Run it locally
You need JDK 8+ , Maven and Node.js 18+.

**1. Backend** (port 8080)
```
cd backend
mvn spring-boot:run
```
In Eclipse: File > Import > Existing Maven Project, then run `PortfolioApplication`.

PostgreSQL instead of H2: create a database named `portfolio_db`, then
```
set DB_PASSWORD=your_password            (Windows)   |   export DB_PASSWORD=your_password   (Linux/Mac)
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

**2. Frontend** (port 5173)
```
cd frontend
npm install
npm run dev
```


## Get messages by email (optional)
Set these environment variables before starting the backend (Gmail needs an App Password):
```
MAIL_ENABLED=true  MAIL_USERNAME=you@gmail.com  MAIL_PASSWORD=your-app-password  MAIL_TO=you@gmail.com
```

