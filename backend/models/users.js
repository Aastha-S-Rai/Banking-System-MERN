import connector from "./dbConnection.js";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fname: { type: String, required:true },
    lname: { type:String, required:true },
    mname: { type:String, required:true },
    email: { type:String, required:true },
    password: { type: String, required:true },
    country: {type: String, required:true },
    state: {type: String, required:true },
    city: {type: String, required:true },
    district: {type: String, required:true },
    street: {type: String, required:true },
    landmark: {type: String, required:true },
    building: {type: String, required:true },
    pincode: {type:String, required:true},
    flatno: {type: String, required:true },
    balance_amount: {type: Number},
    user_type: {type: String, enum: ['Banker', 'Customer'] ,required:true}
});
userSchema.virtual('name').
  get(function() { return `${this.fName} ${this.mname} ${this.lName}`; });

userSchema.virtual('address').
  get(function() { return `${flatno} ${building}, ${street}, ${landmark}, ${district}, ${city} ${state} ${country}, ${pincode}`; });

const User = connector.model('users', userSchema);

export async function setUser(userData) {
    const newUser = new User(userData);
    const user = await newUser.save();
    return user;
}

export async function readUser(filter) {
    const user = User.find(filter);
    return user
}

export async function updateBalance(filter, update) {
  console.log(update);
  const user = await User.findOneAndUpdate(filter, {$inc: update}, {
    new: true
  });
  console.log(user.balance_amount)
  return true;
}