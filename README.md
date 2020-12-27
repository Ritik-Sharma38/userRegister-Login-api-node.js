## node.js Api's for user registration and login

## Prerequisite
[Node.js](https://nodejs.org/en/) latest version.

### Setup and Installation 
To get the project up running

```
$ git clone https://github.com/Ritik-Sharma38/userRegister-Login-api-node.js.git
$ git cd userRegister-Login-api-node.js
```

- if you use npm
```
$ npm install
$ npm moonLoveSun
```

- if you use yarn
```
$ yarn install
$ yarn moonLoveSun
```

### Postman
you can use [Postman](https://www.postman.com/downloads/) to provide the api request.

### Api's
Register api for user registrations
```
uri: http://localhost:9000/api/user/register
method: POST
headers: {
  'Content-Type': 'application/json'
}
body: JSON.stringify(data) // where data = { "name": "ritik Sharma", "email": "test.app@xyz.com", "password": "testrma" }
response : { user: registeredUser._id } (json object)
```

Login api for user login
```
uri: http://localhost:9000/api/user/login
method: POST
headers: {
  'Content-Type': 'application/json'
}
body: JSON.stringify(data) // where data = { "email": "test.app@xyz.com", "password": "testrma" }
response : { token: jwt_token } (json object)
```
jwt_token is used to access further database and make api request on successful login.

example Posts api for user fetching post data
```
uri: http://localhost:9000/api/posts/
method: GET
headers: {
  'Content-Type': 'application/json'
  'auth-token': jwt_token // this token is used to make further api request after you login
}
response : { posts: data } (json object) //where data = { title: 'My first post', description: 'random data' }
```
