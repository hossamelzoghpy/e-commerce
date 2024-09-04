import mongoose from "mongoose"

const dbConnection=()=>{
    mongoose.connect(process.env.DB!).then(()=>{
  console.log(`MongoDB connected success on ${process.env.DB!}`)
})
} 
export default dbConnection