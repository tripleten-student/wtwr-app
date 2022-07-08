# Tasks

# Frontend

## 1. Use [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) to create the app itself and set up the environment.

## 2. Create components and initial structure

## 3. Create the markup

## 4. Configure the modal windows

## 5. Connect to the weather API

## 6. Render the cards

## 7. Select and filter clothing items

## 8. Implement measure unit switch using Context

## 9. Implement likes and card deleting

## 10. Create routes for authorization

Two routes for unauthorized users in a separate `utils/auth.js` file:

- `/signup`
- `/signin`

## 11. Create React components for authorization

- `ProtectedRoute` — to protect the /profile route so that unauthorized users can’t access it
- The modal window for user login and registration

The header must be different for authorized and unauthorized users.

## 12. Implement local storage for the token

Implement `localStorage` to store and access the token when working with the site. On repeat visits, users shouldn't have to log in.

# Backend

## 1. Create schemas and models

There will be two entities in the project: `user` and `item`

### User schema fields

- email — each user's `email` must be unique and validated against the email schema
- password
- name (optional)
- avatar (optional)

If optional fields are left empty when creating a user, give them default values.

### Clothes item fields

- name
- type
- weather
- owner
- likes
- createdAt

## 2. Create controllers and routes for users

```
GET /users - returns all users
GET /users/:userId - returns a user by _id
POST /users - creates a new user

PATCH /users/me — update profile
PATCH /users/me/avatar — update avatar
```

## 3. Create controllers and routes for clothing items

```
GET /items - returns all items
POST /items - creates a new item
DELETE /items/:itemId - deletes an item by _id

PUT /items/:itemId/likes — like an item
DELETE /items/:itemId/likes — unlike an item
```

Each route will need the `_id` of the user who is performing the action. Get it from `req.user._id`.

## 4. Handle errors

## 5. Create controllers and routes for login and registration

## 6. Make middleware for authorization

## 7. Protect the API with authorization

## 8. Validate requests

## 9. Connect the backend and frontend

## 10. Create a cloud server and deploy the API

## 11. Create the .env file and add the main environment variables

## 12. Issue certificates