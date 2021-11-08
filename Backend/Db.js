const mongoose= require('mongoose')
const uri="mongodb://localhost:27017/Notebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const connectMongo=()=>{
    mongoose.connect(uri,()=>{
        console.log("Connected to mongo successfully")
    })
}
module.exports=connectMongo