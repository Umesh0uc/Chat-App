const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const publicDir = path.join(__dirname,'../public/');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(publicDir));

io.on('connection',(socket)=>{
    let username = '';
    console.log('New connection :' + socket.id);
    socket.on('newclient',(user)=>{
        username = user;
        socket.broadcast.emit('newuser',user);
    })
    socket.on('newmessage',(user,msg)=>{
        console.log('Message from '+user+':'+msg)
        socket.broadcast.emit('message',user,msg);
    });
    socket.on('disconnect',()=>{
        io.emit('left',username)
    });
})

server.listen(8000,()=>{console.log('Server Running... http://localhost:8000')});
