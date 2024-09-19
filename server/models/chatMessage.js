import mongoose from "mongoose";
import { v4 } from "uuid";

const MESSAGE_TYPES = {
    TYPE_TEXT: "text",
};

const chatMessageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => v4().replace(/\-/g, ""),
        },
        chatRoomId: String,
        message: mongoose.Schema.Types.Mixed,
        type: {
            type: String,
            default: () => MESSAGE_TYPES.TYPE_TEXT,
        },
        postedByUser: String,
    },
    {
        timestamps: true,
        collection: "chatmessages",
    }
);

export default  mongoose.model("ChatMessage", chatMessageSchema);
