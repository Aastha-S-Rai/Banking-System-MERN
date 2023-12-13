// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();
// mongoose.set("strictQuery", false);
// mongoose.connect(`${process.env.DB_URL}`);
// const connector = mongoose;
// export default connector;

import mysql from "mysql2";

const connector = mysql.createConnection({
    host: 'localhost',
    user: 'your-mysql-username',
    password: 'your-mysql-password',
    database: 'your-database'
});
connector.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return err;
    }
    console.log('Connected to the database');
});
  
  
export default connector;