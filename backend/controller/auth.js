import { readUser } from "../models/users.js";
import bcrypt from "bcrypt";
import { createSecretToken } from "../middleware/secretToken.js"

export default async function loginUser(req, res){
    const {email, password} = req.body;
    const user = await readUser({email: email});
    const id = user[0]._id;
    if(!user){
        res.status(200);
        res.body({res: "Email not found"});
    }
    else{
        bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) {
              res.status(200);
              res.body({res: "password mismatched"})
            }
            if (result) {
                const token = createSecretToken(id);
                // res.cookie("token", token, {
                //   withCredentials: true,
                //   httpOnly: false,
                // });
                res.status(200)
                res.json({ res: "User signed in successfully", success: true, user: user[0], token: token });
            }
            else{
                res.status(200);
                res.json({err: "Login Failed"});
            }
        });
          
    }
}

// Hash the password
