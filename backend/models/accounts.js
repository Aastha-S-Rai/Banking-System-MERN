import connector from "./dbConnection.js";
import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    sender_id: {type: connector.Schema.Types.ObjectId, ref:"users", required:true},
    recipient_id: {type: connector.Schema.Types.ObjectId, ref:"users", required:true},
    transaction_amount: {type: Number, required: true},
    transaction_date: {type: Date, required: true}
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
