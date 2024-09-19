import chatRoom from "../models/chatRoom.js";
import makeValidation from '@withvoid/make-validation'
import chatMessage from '../models/chatMessage.js'


export default {
    getAllRooms: async (req, res) => {
        try {
            const user = req.user;
            const rooms = await chatRoom.getAllRooms();
            return res.status(200).json({
                status: "success",
                receiver:{_id:user._id,userName:user.userName},
                rooms
            })
        } catch (e) {
            return res.status(400).json({ status: 'failed', message: e })
        }
    },
    createRoom: async (req, res) => {
        try {
            const { name } = req.body;

            if (!name) return res.status(400).json({ status: 'failed', message: "Provide a name for the room" })

            const chatInitiator = req.user;

            const chatRoomCreated = await chatRoom.createRoom(name, chatInitiator)
            return res.status(201).json({
                status: 'success',
                message: 'Room created successfully',
            })
        } catch (e) {
            return res.status(400).json({ status: 'failed', message: e })
        }
    },
    enterRoom: async (req, res, next) => {
        try {
            const { roomId } = req.params;
            const user = req.user;

            const room = await chatRoom.findOne({ _id: roomId })
            if (!room) return res.status(400).json({ status: 'failed', message: "This room does not Exist" })

            const oldUser = await room.users.find(curr => curr._id === user._id);
            // if (oldUser) return res.status(400).json({ status: 'failed', message: "this user is already in a room." });

            const userEntered = await chatRoom.enterRoom(room, user)
            if (!userEntered) return res.status(400).json({ status: 'failed', message: "Something went wrong.Please try again later..." })

            next()

        }
        catch (e) {
            return res.status(400).json({ status: 'failed', message: e })
        }
    },
    postMessage: async (req, res) => {
        try {
            const { roomId } = req.params;
            const room = await chatRoom.findOne({ _id: roomId })
            if (!room) return res.status(400).json({ status: 'failed', message: "This room does not Exist" })

            const user = req.user;

            const validation = makeValidation(types => ({
                payload: req.body,
                checks: {
                    messageText: { type: types.string },
                }
            }));
            if (!validation.success) return res.status(400).json({ ...validation });
            const messagePayload = {
                user: {
                    _id: user._id,
                    userName: user.userName
                },
                messageText: req.body.messageText,
            };
            //   console.log(messagePayload)
            const message = await chatRoom.postMessage(room, messagePayload);
            if (!message) return res.status(400).json({ status: 'failed', message: "something went wrong.please try again later..." })
                // console.log(message)
            // global.io.sockets.in(roomId).emit('new message', { message });

            return res.status(200).json({ status: 'success', message })

        } catch (e) {
            return res.status(500).json({ status: 'failed', message: e })
        }

    },
    getMessage:async(req,res)=>{
        try{
            const { roomId } = req.params;
            const room = await chatRoom.findOne({ _id: roomId })
            if (!room) return res.status(400).json({ status: 'failed', message: "This room does not Exist" });

            const user = req.user;

            const updatedRoom = await chatRoom.getMessage(room, user)

            return res.status(200).json({ status: 'success', message:updatedRoom.message })

        }catch(e){
            return res.status(500).json({ status: 'failed', message: e })
        }
    }


}