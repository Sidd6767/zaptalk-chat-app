const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');


const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "https://zaptalk-chat.netlify.app/", // Vite actual port
    methods: ["GET", "POST"]
  }
});

const router = require('./router');
const { error } = require('console');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    
    const { error } = addUser({ id: socket.id, name, room });
    if (error) return callback({ error });

    socket.emit('message', { user: 'admin', text: `${name}, welcome to the room ${room}.` });
    socket.broadcast.to(room).emit('message', { user: 'admin', text: `${name} has joined!` });

    socket.join(room);

    io.to(room).emit('roomData', { users: getUsersInRoom(room) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: user.name, text: message });
      callback();
    } else {
      callback({ error: 'User not found' });
    }
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});