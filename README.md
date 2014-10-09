#chat-mongo

A simple chat demo for socket.io

## How to use
before you use it, please make sure you've already install nodejs, express , socket.io and mongodb on your server.
```
$ cd chat-mongo
$ node app.js
```

point your browser to `http://localhost:3000`. 

## Features

- Multiple users can join a chat room by a username.
- Users can type chat messages to the chat room.
- A notification is sent to all users when a user joins or leaves.
- The massage you sent will be listed on the right side and the background is light green.
- Every message will be saved in mongoDB and the new user can see at most ten messages when he/she enter.
