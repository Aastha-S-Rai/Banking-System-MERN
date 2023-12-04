import {create, read} from "../models/users.js";

async function createUser(req, res) {
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

async function getUsers(req, res) {
    const filter = req.body.filter;
    const users = await read(filter);
    if(users){
        res.status(500);
        res.json({res: users});
    }
    else {
        res.status(200);
        res.json({err: "something went wrong"});
    }
}

export default { createUser, getUsers }