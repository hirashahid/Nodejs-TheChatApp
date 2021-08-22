// Node server which will handle socket io connection

const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});

const users = {};

const connect = io.on('connection', socket => { //io.on listens to upcoming requests

    socket.on('new-user-joined', name => {     // socket.io handles when req comes
        console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        console.log("left: ", users[socket.id]);
        delete users[socket.id];
    });

    socket.on('send', message => socket.broadcast.emit('receive', { message: message, name: users[socket.id] }));

    socket.on('connect_failed', () => socket.broadcast.emit('Connection-Failed', { message: 'Connection-Failed' }));
});

connect.on('error', () => console.log('Something went wrong'));