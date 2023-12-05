import {create, read} from "../models/accounts.js";
import {readUser, updateBalance} from "../models/users.js";
import mongoose from "mongoose";

async function addLog(req, res) {
    const data = req.body;
    const sender = new mongoose.Types.ObjectId(data.sender_id);
    const recipient = new mongoose.Types.ObjectId(data.recipient_id);
    const Tamount = data.transaction_amount;
    const senderData = await readUser({_id: sender});
    if(senderData[0].balance_amount >= Tamount ){
        const deduct = await updateBalance({_id: sender}, {balance_amount: -Tamount})
        const update = await updateBalance({_id: recipient}, {balance_amount: Tamount})
        if(deduct == update == true){
            const result = await create(data);
            if(result){
                res.status(500);
                res.json({res: "Transaction successful"});
            }
            else{
                res.status(200);
                res.json({err: "something went wrong from our side"});
            }
        }
        else{
            res.status(200);
            res.json({err: "something went wrong"});
        }
    }
    else{
        res.status(500);
        res.json({res: "Insufficient Balance"})
    }
    
}

async function getLogs(req, res) {
    const filter = req.body.filter;
    const logs = await read(filter);
    if(logs){
        res.status(500);
        res.json({res: logs});
    }
    else {
        res.status(200);
        res.json({err: "something went wrong"});
    }
}

export default { addLog, getLogs };