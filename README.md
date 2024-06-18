# Speaker Router

This router handles endpoints related to speakers in the Speaker Recommendation System.

## Endpoints

- **Get Most Favorited Speakers**
  - Endpoint: `GET /api/speakers/populer`
  - Description: Fetches a list of the most favorited speakers.
  - Controller: `getMostFavorited` (in `speak.controller.js`)

- **Get Speaker Details by ID**
  - Endpoint: `GET /api/speakers/speaker/:id`
  - Description: Fetches details of a speaker by their ID.
  - Controller: `getSpeakerDetailsById` (in `speak.controller.js`)

- **Search Speakers by Field**
  - Endpoint: `GET /api/speakers/search`
  - Description: Searches speakers based on a specific field (e.g., Business, Entertainment, etc.).
  - Controller: `searchSpeakersByField` (in `speak.controller.js`)

- **Add Favorite Speaker**
  - Endpoint: `POST /api/speakers/favorites`
  - Description: Adds a speaker to the user's favorites.
  - Controller: `addFavoriteController` (in `speak.controller.js`)

- **Get User's Favorite Speakers**
  - Endpoint: `GET /api/speakers/favorites/:userId`
  - Description: Fetches a list of speakers favorited by a specific user.
  - Controller: `getFavoritesController` (in `speak.controller.js`)

- **Delete Favorite Speaker**
  - Endpoint: `DELETE /api/speakers/favorites`
  - Description: Deletes a speaker from the user's favorites.
  - Controller: `deleteFavoriteController` (in `speak.controller.js`)

- **Get Random Recommended Speakers**
  - Endpoint: `GET /api/speakers/recommendations`
  - Description: Fetches a list of randomly recommended speakers.
  - Controller: `getRandomRecommendedSpeakersController` (in `speak.controller.js`)

# User Router

This router handles endpoints related to users in the Speaker Recommendation System.

## Endpoints

- **Register User**
  - Endpoint: `POST /api/users/register`
  - Description: Registers a new user.
  - Controller: `createUser` (in `user.controller.js`)

- **User Login**
  - Endpoint: `POST /api/users/login`
  - Description: Logs in an existing user.
  - Controller: `login` (in `user.controller.js`)

- **Get All Users**
  - Endpoint: `GET /api/users`
  - Description: Fetches a list of all users.
  - Middleware: `checkToken` (from `auth/validate.js`)
  - Controller: `getUsers` (in `user.controller.js`)

- **Get User by ID**
  - Endpoint: `GET /api/users/:id`
  - Description: Fetches details of a user by their ID.
  - Middleware: `checkToken` (from `auth/validate.js`)
  - Controller: `getUserByID` (in `user.controller.js`)

- **Update User**
  - Endpoint: `PATCH /api/users/update/:id`
  - Description: Updates details of a user by their ID.
  - Middleware: `checkToken` (from `auth/validate.js`)
  - Controller: `updateUser` (in `user.controller.js`)

- **Delete User**
  - Endpoint: `DELETE /api/users/delete/:id`
  - Description: Deletes a user by their ID.
  - Middleware: `checkToken` (from `auth/validate.js`)
  - Controller: `deleteUser` (in `user.controller.js`)

- **Save User Preferences**
  - Endpoint: `POST /api/users/preferences`
  - Description: Saves preferences for a user.
  - Middleware: `checkToken` (from `auth/validate.js`)
  - Controller: `saveUserPreferences` (in `user.controller.js`)
