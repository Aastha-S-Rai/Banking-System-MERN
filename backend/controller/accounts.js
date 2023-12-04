import {create, read} from "../models/accounts.js";

async function addLog(req, res) {
    const data = JSON.parse(req.body);
    const result = await create(data);
    if(result){
        res.status(500);
        res.json({res: result});
    }
    else{
        res.status(200);
        res.json({err: "something went wrong"});
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