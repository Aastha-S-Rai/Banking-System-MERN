import connector from "./dbConnection.js";
import mongoose from "mongoose";
// import {v4 as uuidv4} from 'uuid';

const chatSchema = mongoose.Schema({
    sender_id: {type: connector.Schema.Types.ObjectId, ref:"users", required:true},
    receiver_id: {type: connector.Schema.Types.ObjectId, ref:"users", required:true},
    message: {type: String, required: true},
    timestamp: {type: Date, default: Date.now}
});

const Chat = connector.model("chats", chatSchema);

export async function create(logData) {
    const newLog = new Chat(logData);
    const chat = await newLog.save();
    return chat;
}

export async function read(filter) {
    const logs = Account.find(filter);
    return logs;
}
