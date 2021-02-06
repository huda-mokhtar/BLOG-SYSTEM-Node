const mongoose=require('mongoose');
const{Schema}=mongoose;

const blogSchema=new Schema({
    title:{
        type:String,
        maxlength:256,
        required:true,
    },
    body:{
        type:String,
        maxlength:1024,
    },
    photo:String,
    tags:[String],
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    creartedate:{
        type:Date,
        default:Date.now()
    }
});

const blogModel=mongoose.model('Blog',blogSchema);
module.exports=blogModel; 