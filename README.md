# Go Todo REST API Example
A RESTful API example for simple todo application with NodeJS

It is a just simple tutorial or example for making simple RESTful API with NodeJS using **express-js** (A nice npm library), **mongo-db** (An amazing NoSQL database) and **mongoose** (An ODT for mongo-db in NodeJS)


## Structure
```
├── db                    // database files
│   └── mongoose.js
|
├── models                // Our API core models
│   ├── task.js
│   └── user.js
|
├── routers              // API routes for respective models
│   ├── task.js
│   └── user.js
|
├── middleware           // API middleware for authentication
│   └── auth.js
|
└── index.js            // start
```

## API

#### /users
* `POST` : Create a new user

#### /users/login
* `POST` : login user

#### /users/logout
* `POST` : logout user from current device (authentication required)

#### /users/logoutall
* `POST` : login a user from all devices (authentication required) 

#### /users/me
* `GET` : get user profile (authentication required)
* `PATCH` : update user profile  (authentication required)
* `DELETE` : delete user profile (authentication required)

#### /users/me/avatar
* `POST` : upload/update user profile image (authentication required)
* `DELETE` : delete user profile image (authentication required)

#### /users/:id/avatar
* `GET` : get any user profile image but require user id


#### /tasks
* `GET` : get all tasks of user (authentication required)
* `POST` : Create a new task (authentication required)

#### /tasks/:id
* `GET` : get a task of user (authentication required and task id)
* `PATCH` : update a task (authentication required and task id)
* `DELETE` : delete a task (authentication required and task id)

## Todo

- [x] Support basic REST APIs.
- [x] Support Authentication with user for securing the APIs.
- [ ] Make convenient wrappers for creating API handlers.
- [ ] Write the tests for all APIs.
- [x] Organize the code with packages
- [ ] Make docs with GoDoc
- [ ] Building a deployment process 
