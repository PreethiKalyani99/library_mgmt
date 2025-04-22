# TypeScript Express Book API

A RESTful API built with TypeScript, Express, and TypeORM following the Controller-Service-Repository pattern.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a PostgreSQL database
4. Copy `.env.example` to `.env` and update the environment variables:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=book_starter
   NODE_ENV=development
   ```

## Running the Application

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on http://localhost:3000

## API Endpoints

- GET `/api/books` - Get all books
- GET `/api/books/:id` - Get a specific book
- POST `/api/books` - Create a new book
- PUT `/api/books/:id` - Update a book
- DELETE `/api/books/:id` - Delete a book

## Example Request Body (POST/PUT)

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A story of decadence and excess.",
  "publicationYear": 1925,
  "price": 9.99
}
```

## Project Structure

```
src/
├── config/
│   └── database.ts
├── controllers/
│   └── BookController.ts
├── entities/
│   └── Book.ts
├── repositories/
│   └── BookRepository.ts
├── services/
│   └── BookService.ts
├── routes/
│   └── bookRoutes.ts
└── index.ts
```

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the TypeScript code
- `npm start` - Start the production server
- `npm run migration:generate` - Generate TypeORM migrations
- `npm run migration:run` - Run TypeORM migrations 