import express from 'express';
import cors from 'cors'

import indexRouter from './server/routes/index.js'
import authRouter from './server/routes/authRoute.js'
import chatRoomRouter from './server/routes/chatRoom.js';

import "./server/config/mongo.js"

const app = express();
const corsOptions = {
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: '*',
    // other options
  };
app.use(cors(corsOptions))


// app.set('port','3000')

app.use(express.json());

app.use("/", indexRouter)
app.use("/auth", authRouter)
app.use("/rooms", chatRoomRouter)

export default app;