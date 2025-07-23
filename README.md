# 📦 Express + Mongoose Product API Boilerplate



## 📚 Index

1. [Introduction](#introduction)
2. [Environment Configuration (`.env_sample`)](#environment-configuration-env_sample)
3. [Application Entry Point (`index.js`)](#application-entry-point-indexjs)
    - [Project Structure](#project-structure)
    - [Environment Loading](#environment-loading)
    - [Express Middleware](#express-middleware)
    - [Routing](#routing)
    - [MongoDB Connection](#mongodb-connection)
    - [Server Startup Flow](#server-startup-flow)
    - [API Documentation](#api-documentation)
    - [System Architecture Overview](#system-architecture-overview)
4. [Summary](#summary)

---

## 📝 Introduction

This project is a basic RESTful API for managing products, built using:

- **Express** for HTTP server and routing
- **Mongoose** for MongoDB ORM
- **dotenv** for environment variable management

It demonstrates standard patterns for environment configuration, modular routing, and database connectivity.

---

## 1. Environment Configuration (`.env_sample`)

The `.env_sample` file provides a template for required environment variables:

```dotenv
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

### 📋 Purpose

- **Security:** Sensitive information (like database credentials and JWT secrets) should never be hardcoded.
- **Portability:** Makes the app easy to deploy across different environments (development, staging, production).
- **Customizability:** Lets each developer or deployment specify their own unique values.

### 🛠️ Variables Explained

| Variable       | Description                                         | Example Value           |
|----------------|-----------------------------------------------------|------------------------|
| `PORT`         | Port number for the API server                      | `3000`                 |
| `DB_HOST`      | Hostname of the MongoDB server                      | `localhost`            |
| `DB_PORT`      | Port number for MongoDB                             | `27017`                |
| `DB_USER`      | MongoDB username                                    | `myuser`               |
| `DB_PASSWORD`  | MongoDB password                                    | `mypassword`           |
| `DB_NAME`      | MongoDB database name                               | `products_db`          |
| `JWT_SECRET`   | Secret for signing JWTs (if authentication needed)  | `supersecret`          |

> ⚠️ **Note:** Values are left blank so each developer can fill in their own.

---

## 2. Application Entry Point (`index.js`)

The `index.js` file is the main entry point for this Express app.

### 🔎 File Overview

### 🏗️ Project Structure

```
project-root/
├── .env_sample
├── index.js
├── routes/
│   └── product.route.js
├── models/
│   └── product.models.js
└── ...
```

---

### 2.1 Environment Loading

- Uses `dotenv` to load environment variables from a `.env` file into `process.env`.
- This enables secure and flexible configuration.

#### Code
```js
import dotenv from "dotenv";
dotenv.config();
```

---

### 2.2 Express Middleware

- **JSON Parsing:** Allows receiving JSON-formatted request bodies.
- **URL-Encoded Parsing:** Allows form submissions and other URL-encoded data.

#### Code
```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

---

### 2.3 Routing

- **Products API:** All `/products` routes are handled by a modular router (`productRoute`).
- **Home Page:** A root (`/`) route sends a simple HTML header.


### 2.4 MongoDB Connection

- **Mongoose** is used for MongoDB ORM/ODM.
- Connection string uses credentials from environment variables.
- If connection fails, the process exits with an error.

#### Code
```js
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.byhiscf.mongodb.net/Prac`;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(uri);
    console.log("connection to the data base established");
  } catch (err) {
    console.log("mongoDB connection", err);
    process.exit(1);
  }
};
```

---

### 2.5 Server Startup Flow

#### Process

1. **Connect to MongoDB** using `mongoose.connect()`
2. **On Success:** Start the Express server on the desired port
3. **On Failure:** Log error and exit

#### Code
```js
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection error", err);
  });
```

---

### 🔌 API Documentation


#### Products Route Mount Point

- All `/products` API requests are delegated to `productRoute` (not shown here).

---

### 🏗️ System Architecture Overview

Here’s a high-level overview of how the main components interact:

```mermaid
flowchart TD
    subgraph App
        A[Express App]
        B[Express Middleware]
        C["/products" Router]
    end
    D[MongoDB Database]
    E[Mongoose]

    A --> B
    B --> C
    C -.-> E
    E --> D
```

- Client requests hit the **Express app**.
- Middleware processes request bodies.
- The `/products` routes are handled by their own router.
- The router interacts with MongoDB through **Mongoose**.

---

## 3. Summary

- `.env_sample` secures and standardizes configuration.
- `index.js` initializes the server, loads configs, sets up routes, and connects to MongoDB.
- Product-related API requests are handled modularly via `/products` routes.
- The application is designed for extensibility, security, and maintainability.

---

## 🚀 Next Steps

- **Implement Product Models and Routes:** Complete product features in `/models/product.models.js` and `/routes/product.route.js`.
- **Add Authentication:** Use `JWT_SECRET` for route protection.
- **Testing & Validation:** Add test scripts and input validation for robustness.
