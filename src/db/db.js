import mongoose from "mongoose"
const databaseConnect=async()=>{
    try{
        const connection=await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("mongodb connected successfully")

    }catch(error){
        console.log("connection failed",error)
        process.exit(1)
    }
}
export default databaseConnect