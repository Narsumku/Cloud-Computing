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

## NARSUMKU REST-API
#### This is Postman Documentation : https://documenter.getpostman.com/view/34625130/2sA3XTffj5 
### Endpoints

1. **REGISTER**

   - **Method**: POST
   - **URL**: `[BASE_URL]/register`
   - **Body**: 
     ```json
     {
       "username": "user",
       "email": "user@com",
       "password": "123"
     }
     ```

2. **LOGIN**

   - **Method**: POST
   - **URL**: `[BASE_URL]/login`
   - **Body**: 
     ```json
     {
       "email": "user1@example.com",
       "password": "password123"
     }
     ```

3. **SUBMIT PREFERENCE**

   - **Method**: POST
   - **URL**: `[BASE_URL]/preference/7`
   - **Headers**:
     - `Authorization: Bearer <token>`
     - `Content-Type: application/json`
   - **Body**: 
     ```json
     {
       "fields": ["Tech", "Healthcare", "Politics", "Academic"]
     }
     ```

4. **GET RECOMMENDATIONS**

   - **Method**: GET
   - **URL**: `[BASE_URL]/users/3`
   - **Headers**:
     - `Authorization: Bearer <token>`

5. **MOST POPULAR**

   - **Method**: GET
   - **URL**: `[BASE_URL]/popular`
   - **Headers**:
     - `Authorization: Bearer <token>`

6. **DETAIL USER BY ID**

   - **Method**: GET
   - **URL**: `[BASE_URL]/users/7`
   - **Headers**:
     - `Authorization: Bearer <token>`

7. **ALL USER**

   - **Method**: GET
   - **URL**: `[BASE_URL]/users`
   - **Headers**:
     - `Authorization: Bearer <token>`

8. **UPDATE USER**

   - **Method**: PATCH
   - **URL**: `[BASE_URL]/users/update/7`
   - **Headers**:
     - `Authorization: Bearer <token>`
   - **Body**: 
     ```json
     {
       "username": "user",
       "email": "user@com",
       "password": "111"
     }
     ```

9. **DELETE USER**

   - **Method**: DELETE
   - **URL**: `[BASE_URL]/users/delete/7`
   - **Headers**:
     - `Authorization: Bearer <token>`
   - **Body**: 
     ```json
     {
       "username": "user",
       "email": "user@com",
       "password": "111"
     }
     ```

10. **DETAIL SPEAKER BY ID**

    - **Method**: GET
    - **URL**: `[BASE_URL]/speaker/speaker_43`

11. **MOST FAVORITE SPEAKER**

    - **Method**: GET
    - **URL**: `[BASE_URL]/popular`

12. **SEARCH SPEAKER BY FIELD**

    - **Method**: GET
    - **URL**: `[BASE_URL]/search?keyword=aca`

13. **ADD FAVORITE SPEAKER**

    - **Method**: POST
    - **URL**: `[BASE_URL]/favorites`
    - **Body**: 
      ```json
      {
        "userId": "2",
        "speakerId": "speaker_3"
      }
      ```

14. **GET FAVORITE SPEAKER**

    - **Method**: GET
    - **URL**: `[BASE_URL]/favorites/2`

15. **DELETE FAVORITE SPEAKER**

    - **Method**: DELETE
    - **URL**: `[BASE_URL]/favorites`
    - **Body**: 
      ```json
      {
        "userId": "2",
        "speakerId": "speaker_3"
      }
      ```

16. **RECOMMENDATIONS BY PREFERENCE**

    - **Method**: GET
    - **URL**: `[BASE_URL]/recommendations/2`

17. **SUBMIT PREFERENCE TO GET RECOMMENDATIONS**

    - **Method**: POST
    - **URL**: `[BASE_URL]/preference/6`
    - **Body**: 
      ```json
      {
        "fields": ["Tech", "Sport", "academic", "Politics"]
      }
      ```

#### Note

Replace `<token>` with the actual JWT token obtained from the authentication process.

This collection covers various endpoints for user management, preferences, recommendations, and speaker operations within the NARSUMKU-REST API.
---
## License

This project is licensed under the MIT License.

<p align="left">
  <img src="https://nodejs.org/static/logos/nodejsDark.svg" alt="Node.js" width="200"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/79/Docker_%28container_engine%29_logo.png" alt="DockerContainer" width="200"/>
   <br>
  <img src="https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg" alt="GoogleCloud" width="300"/>
</p>
