import connector from "./dbConnection.js";
import mongoose from "mongoose";
// import {v4 as uuidv4} from 'uuid';

const accountSchema = mongoose.Schema({
    user_id: {type: connector.Schema.Types.ObjectId, ref:"users", required:true},
    transaction_amount: {type: Number, required: true},
    transaction_type: {type: String, enum: ["deposit", "withdraw"] ,required:true},
    transaction_date: {type: Date}
});

const Account = connector.model("accounts", accountSchema);

export async function create(logData) {
    const newLog = new Account(logData);
    const account = await newLog.save();
    return account;
}

export async function read(filter) {
    const logs = Account.find(filter);
    return logs;
}
