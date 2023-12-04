import connector from "./dbConnection";

const accountSchema = {
    sender_id: {type: connector.Schema.Types.ObjectId, ref:"users", required:true},
    recipient_id: {type: connector.Schema.Types.ObjectId, ref:"users", required:true},
    transaction_amount: {type: Number, required: true},
    transaction_date: {type: Date, required: true}
}

const Account = connector.model("accounts", accountSchema);

async function create(logData) {
    const newLog = new Account(logData);
    const account = await newLog.save();
    return account;
}

async function read(filter) {
    const logs = Account.find(filter);
    return logs;
}

export default{ create, read };