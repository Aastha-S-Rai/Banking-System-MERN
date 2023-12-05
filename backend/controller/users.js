import {setUser, readUser} from "../models/users.js";
import bcrypt from "bcrypt";

async function createUser(req, res) {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    data.password = hashedPassword;
    const result = await setUser(data);
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
    const users = await readUser(filter);
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