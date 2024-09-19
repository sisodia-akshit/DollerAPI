import mongoose from "mongoose";

import config from './index.js';


const CONNECTION_URL = `mongodb+srv://admin:g6znF5KR3KhOMNmM@cluster0.rsguuxn.mongodb.net/${config.db.name}?retryWrites=true&w=majority&appName=Cluster0${config.db.name}`;
mongoose.connect(CONNECTION_URL, {
});

mongoose.connection.on('connected',()=>{
    console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected',()=>{
    console.log('Mongo has reconnected')
})
mongoose.connection.on('error',(error)=>{
    console.log('Mongo connection has an error',error);
    mongoose.disconnect()
})
mongoose.connection.on('disconnected',()=>{
    console.log('Mongoose connection disconnected')
})