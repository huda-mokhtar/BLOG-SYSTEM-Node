const mongoose=require('mongoose');

const URL='mongodb+srv://huda:01206518419@blog.9ieul.mongodb.net/huda?retryWrites=true&w=majority';
const connectDB =async()=>{
    await mongoose.connect(URL,{ useUnifiedTopology: true }, { useNewUrlParser: true })
    console.log("conectttttttttttttttttted")
}
module.exports=connectDB;