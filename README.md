# Backend API Documentation

This document provides an overview of the backend API endpoints and functionality for managing users and speaker data.

## Setup and Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Narsumku/Cloud-Computing.git
    ```

2. Navigate to the project directory:
    ```sh
    cd Cloud-Computing
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Start the server:
    ```sh
    npm run start
    ```

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

 #### `/favorites`
- **Method:** DELETE
- **Description:** Deletes a favorite item by ID.
- **Authentication:** JWT token required
- **Request Body:** 
  ```json
  {
    "userId": "user_id",
    "speakerId": "speaker_id"
  }
  ```
- **Response:** 
  - `200 OK` Favorite deleted successfully
  
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
## License

This project is licensed under the MIT License.

<p align="left">
  <img src="https://nodejs.org/static/logos/nodejsDark.svg" alt="Node.js" width="200"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/79/Docker_%28container_engine%29_logo.png" alt="DockerContainer" width="200"/>
   <br>
  <img src="https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg" alt="GoogleCloud" width="300"/>
</p>
