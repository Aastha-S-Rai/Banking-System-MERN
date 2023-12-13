import connector from "./dbConnection.js";
import { v4 as uuidv4 } from 'uuid';

// const userSchema = mongoose.Schema({
//     fname: { type: String, required:true },
//     lname: { type:String, required:true },
//     email: { type:String, required:true },
//     password: { type: String, required:true },
//     country: {type: String, default:"India"},
//     balance_amount: {type: Number, required:true},
//     user_type: {type: String, enum: ['Banker', 'Customer'] ,required:true}
// });

export const setUser = async (fname, lname, mname, email, password, country, balance_amount, user_type) => {
  const _id = uuidv4();
  const insertQuery = `INSERT INTO users (_id, fname, lname, mname, email, password, country, balance_amount, user_type) VALUES (${_id}, ${fname}, ${lname}, ${mname}, ${email}, ${password}, "India", ${balance_amount}, ${user_type})`;

  connector.query(insertQuery, (err, results) => {
    if (err) {
      console.error('Error creating record:', err);
      return err;
    }
    console.log('Record created:', results);
    return results;
  });
};

export const readRecords = async () => {
  const selectQuery = 'SELECT * FROM users';

  connector.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error reading records:', err);
      return err;
    }
    console.log('Records:', results);
    return results
  });
};

export const updateBalance = (_id, balance_amount) => {
  const updateQuery = `UPDATE users SET balance_amount = balance_amount + ${balance_amount} ? WHERE _id=${_id} ?`;

  connector.query(updateQuery, (err, results) => {
    if (err) {
      console.error('Error updating record:', err);
      return err;
    }
    console.log('Record updated:', results);
    return results;
  });
};