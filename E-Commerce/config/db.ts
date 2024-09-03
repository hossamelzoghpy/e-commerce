import mongoose from "mongoose"

const dbConnection=()=>{
    mongoose.connect(process.env.DB!).then(()=>{
  console.log(`MongoDB connected success on ${process.env.DB!}`)
}).catch((err)=>{
  console.log(err)
})
} 
export default dbConnection