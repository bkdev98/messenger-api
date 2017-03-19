# Messenger API
RestfulAPI for Messenger app using NodeJS and MongoDB.

### Installation
  ```
  //  Required: Having a mongo daemon process running
  git clone https://github.com/bkdev98/messenger-api
  cd messenger-api
  Create config.json file in server/config/ with content like this:
  {
      "test": {
          "PORT": 3000,
          "MONGODB_URI": "mongodb://localhost:27017/MessengerAppTest",
          "JWT_SECRET": "somerandomstring"
      },
      "development": {
          "PORT": 3000,
          "MONGODB_URI": "mongodb://localhost:27017/MessengerApp",
          "JWT_SECRET": "somerandomstring"
      }
  }
  npm install
  npm start
  ```
### Endpoints
  ```
  GET           https://cryptic-chamber-25560.herokuapp.com/api/
  GET, POST     https://cryptic-chamber-25560.herokuapp.com/api/messenger/:id
  GET, POST     https://cryptic-chamber-25560.herokuapp.com/api/auth/login
  GET, POST     https://cryptic-chamber-25560.herokuapp.com/api/auth/register
  DELETE        https://cryptic-chamber-25560.herokuapp.com/api/auth/logout
  ```
  **Example ajax POST login request to API**
  ![Image](https://github.com/bkdev98/messenger-web-client/blob/master/Screen%20Shot%202017-03-19%20at%2022.51.38.png)
### Web Client Example
  [http://messenger.bkdev.me/](http://messenger.bkdev.me/)

  ![Image](https://github.com/bkdev98/messenger-web-client/blob/master/Screen%20Shot%202017-03-19%20at%2018.16.55.png)
### Todo
  ##### Complete missing PUT and DELETE routes
  ##### Generate API Key
### Contact
  Quoc Khanh:
  [Facebook](https://fb.com/bkdev98), 
  [Twitter](https://twitter.com/bkdev98)
