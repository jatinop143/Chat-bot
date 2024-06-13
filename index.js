const io = require('socket.io')(8000, {
  cors: {
    origin: "*",
  }
});

const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', messageData => {
    socket.broadcast.emit('receive', { name: users[socket.id], message: messageData.message });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});
