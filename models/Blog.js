const mongoose=require('mongoose');
const{Schema}=mongoose;

const commentSchema = new Schema({
    author: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    authorName: {
         type: String,
          required: true 
    },
    body: {
        type: String,
        maxlength: 1024,
        required: true
    },
    creartedate:{
        type:Date,
        default:Date.now()
    },
});

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
    },
    comments: [commentSchema],

});

const blogModel=mongoose.model('Blog',blogSchema);
module.exports=blogModel; 