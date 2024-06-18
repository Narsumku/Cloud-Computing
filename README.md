### Backend API Documentation

This document provides an overview of the backend API endpoints and functionality for managing users and speaker data.

### Table of Contents
1. [User Management API](#user-management-api)
   - [Endpoints](#endpoints)
     - `/register`
     - `/login`
     - `/users`
     - `/users/:id`
     - `/users/update/:id`
     - `/users/delete/:id`
     - `/preferences`
2. [Speaker Data API](#speaker-data-api)
   - [Endpoints](#endpoints-1)
     - `/populer`
     - `/speaker/:id`
     - `/search`
     - `/favorites`
     - `/favorites/:userId`
     - `/recommendations`

---

## User Management API

### Endpoints

#### `/register`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:** 
  ```json
  {
    "username": "example",
    "email": "example@example.com",
    "password": "password"
  }
  ```
- **Response:** 
  - `200 OK` on success
  - `400 Bad Request` if username or email already exists

#### `/login`
- **Method:** POST
- **Description:** Authenticate user credentials and generate JWT token.
- **Request Body:** 
  ```json
  {
    "email": "example@example.com",
    "password": "password"
  }
  ```
- **Response:** 
  - `200 OK` with JWT token on successful login
  - `401 Unauthorized` if credentials are invalid

#### `/users`
- **Method:** GET
- **Description:** Get a list of all users.
- **Authentication:** JWT token required
- **Response:** 
  - `200 OK` with list of users

#### `/users/:id`
- **Method:** GET
- **Description:** Get user details by ID.
- **Authentication:** JWT token required
- **Response:** 
  - `200 OK` with user details
  - `404 Not Found` if user ID does not exist

#### `/users/update/:id`
- **Method:** PATCH
- **Description:** Update user details by ID.
- **Authentication:** JWT token required
- **Request Body:** 
  ```json
  {
    "username": "new_username",
    "email": "new_email@example.com",
    "password": "new_password"
  }
  ```
- **Response:** 
  - `200 OK` on success
  - `404 Not Found` if user ID does not exist

#### `/users/delete/:id`
- **Method:** DELETE
- **Description:** Delete user by ID.
- **Authentication:** JWT token required
- **Response:** 
  - `200 OK` on success
  - `404 Not Found` if user ID does not exist

#### `/preferences`
- **Method:** POST
- **Description:** Save or update user preferences.
- **Authentication:** JWT token required
- **Request Body:** 
  ```json
  {
    "userId": "user_id",
    "preferences": [1, 0, 1, 1, 0, 0, 1, 0]
  }
  ```
- **Response:** 
  - `200 OK` on success
  - `400 Bad Request` if preferences format is invalid

---

## Speaker Data API

### Endpoints

#### `/populer`
- **Method:** GET
- **Description:** Get the most favorited speakers.
- **Response:** 
  - `200 OK` with list of speakers

#### `/speaker/:id`
- **Method:** GET
- **Description:** Get speaker details by ID.
- **Response:** 
  - `200 OK` with speaker details
  - `404 Not Found` if speaker ID does not exist

#### `/search`
- **Method:** GET
- **Description:** Search speakers by keyword.
- **Query Parameters:** `keyword`
- **Response:** 
  - `200 OK` with list of matching speakers

#### `/favorites`
- **Method:** POST
- **Description:** Add a speaker to user favorites.
- **Authentication:** JWT token required
- **Request Body:** 
  ```json
  {
    "userId": "user_id",
    "speakerId": "speaker_id"
  }
  ```
- **Response:** 
  - `200 OK` on success
  - `400 Bad Request` if speaker is already a favorite

#### `/favorites/:userId`
- **Method:** GET
- **Description:** Get user's favorite speakers.
- **Authentication:** JWT token required
- **Response:** 
  - `200 OK` with list of favorite speakers

#### `/recommendations`
- **Method:** GET
- **Description:** Get random recommended speakers.
- **Response:** 
  - `200 OK` with list of recommended speakers

---
