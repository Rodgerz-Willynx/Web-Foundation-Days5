
# Library Books REST API Design

## Overview

The Library API manages books in a library system.

**Base URL:** `/api/v1`

**Content-Type:** `application/json`

## 1. List All Books

- **Method:** GET
- **Path:** `/api/v1/books`
- **Description:** Retrieves a list of all books.
- **Success status:** `200 OK`
- **Example request body:** Not required.

## 2. Get a Single Book

- **Method:** GET
- **Path:** `/api/v1/books/{id}`
- **Description:** Retrieves a book using its unique ID.
- **Success status:** `200 OK`
- **Example request body:** Not required.

## 3. Create a Book

- **Method:** POST
- **Path:** `/api/v1/books`
- **Description:** Creates a new book in the library.
- **Success status:** `201 Created`
- **Example request body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "isbn": "9780385474542",
  "publishedYear": 1958
}
```

## 4. Update a Book

- **Method:** PUT
- **Path:** `/api/v1/books/{id}`
- **Description:** Replaces the details of an existing book.
- **Success status:** `200 OK`
- **Example request body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "isbn": "9780385474542",
  "publishedYear": 1958
}
```

## 5. Delete a Book

- **Method:** DELETE
- **Path:** `/api/v1/books/{id}`
- **Description:** Deletes a book using its unique ID.
- **Success status:** `204 No Content`
- **Example request body:** Not required.

## 6. List Books by Author

- **Method:** GET
- **Path:** `/api/v1/books?author=Chinua%20Achebe`
- **Description:** Retrieves books written by the specified author.
- **Success status:** `200 OK`
- **Example request body:** Not required.
- **Query parameter:** `author` specifies the author's name.

## Error Responses

### 400 Bad Request

Returned when the request contains invalid data or malformed input.

**Example:** A client attempts to create a book without a required title or submits an invalid publication year.

Example response:

```json
{
  "error": "Bad Request",
  "message": "The title field is required."
}
```

### 404 Not Found

Returned when the requested book does not exist or the requested resource cannot be found.

**Example:** A client requests `GET /api/v1/books/9999`, but no book with ID `9999` exists.

Example response:

```json
{
  "error": "Not Found",
  "message": "The requested book was not found."
}
```
