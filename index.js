const express = require("express");

const app=express();
const http=require('http');
const {Server}=require('socket.io');
const cors=require('cors');
const server=http.createServer(app);
const bodyParser=require('body-parser');
const contractRoute=require('./routes/contractRoute');

app.use(bodyParser.json());
app.use(cors());
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
});
app.use('/api/contract',contractRoute);

io.on('connection',(socket)=>{
    console.log(`User connected ${socket.id}`);
    socket.on('message',(message)=>{
        console.log(`Message received : ${message}`);
        // socket.emit('receive_message',message);
        socket.broadcast.emit('receive_message',message);
    });
});
const PORT=process.env.PORT || 5000;
server.listen(PORT,()=>
    console.log(`Server started on port ${PORT}`)
);
