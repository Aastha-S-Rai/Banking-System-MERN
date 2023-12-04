import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://aastharai2003:EaAhr6qJdkYCyto9@cluster0.oulp2f9.mongodb.net/?retryWrites=true&w=majority"
);
const connector = mongoose;
export default connector;