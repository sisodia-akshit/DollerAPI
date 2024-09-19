import http from 'http';
import dotenv from 'dotenv'
// import { Server } from 'socket.io';
// import WebSockets from './server/utils/WebSocket.js';

import app from './app.js'


dotenv.config({path:'./config.env'})
// console.log(process.env)

const server = http.createServer(app);

// const socketio = new Server(server);
// global.io = socketio ;
// global.io.on('connection', WebSockets.connection)

const port =process.env.PORT || 3000;

server.listen(port);

server.on('listening',()=>console.log("Listening on port:: http://localhost:3000/"))