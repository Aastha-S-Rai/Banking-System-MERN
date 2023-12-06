import {create, read} from "../models/accounts.js";
import {readUser, updateBalance} from "../models/users.js";
import mongoose from "mongoose";

async function addLog(req, res) {
    const data = req.body;
    console.log("Data==>", data);
    const user_id = new mongoose.Types.ObjectId(data.user_id);
    const Ttype = data.transaction_type;
    const Tamount = data.transaction_amount;
    const user = await readUser({_id: user_id});
    if(Ttype=="withdraw"){
        if(user[0].balance_amount >= Tamount ){
            const deduct = await updateBalance({_id: user_id}, {balance_amount: -Tamount})
            if(deduct == true){
                const result = await create(data);
                if(result){
                    res.status(200);
                    res.json({res: "Withdraw successful", status: 1});
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
            res.status(200);
            res.json({res: "Insufficient Balance"})
        }
    }
    else{    
        const update = await updateBalance({_id: user_id}, {balance_amount: Tamount})
        if(update == true){
            const result = await create(data);
            if(result){
                res.status(200);
                res.json({res: "Deposit successful", status: 1});
            }
            else{
                res.status(500);
                res.json({err: "something went wrong from our side"});
            }
        }
    }
    
    
}

async function getLogs(req, res) {
    const id = req.body.user_id;
    const user_id = new mongoose.Types.ObjectId(id);
    const logs = await read({user_id: user_id});
    if(logs){
        res.status(200);
        res.json({res: logs});
    }
    else {
        res.status(500);
        res.json({err: "something went wrong"});
    }
}

export default { addLog, getLogs };