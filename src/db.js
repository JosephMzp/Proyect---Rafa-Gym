import mongoose from "mongoose";

const password = encodeURIComponent('Pzmj8292.');
const MONGODB_URI = `mongodb+srv://josephzp:${password}@rafagym.bq1dywn.mongodb.net/gym`
export const connectDB = async() => {
   try{
      await mongoose.connect(MONGODB_URI)
      console.log(">>>DB is connected")
   }
   catch(error)
   {
    console.log(error)
   }
}