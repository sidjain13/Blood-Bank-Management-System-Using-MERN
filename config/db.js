const mongoose=require('mongoose')
const colors=require('colors')

const connectDB=async()=>{
    try{
        // process.env.MONGO_URL coming from .env file 
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongodb database ${mongoose.connection.host}`.bgMagenta.white)

        // bgMagenta colors module se aaya hai aur ye console pe color badal dega line ka 
    }
    catch(error){
        console.log(`mongodb database error ${error}`.bgRed.white)
    }
}

module.exports=connectDB;