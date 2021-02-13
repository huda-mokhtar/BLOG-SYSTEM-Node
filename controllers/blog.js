const Blog = require('../models/Blog');
const User = require('../models/User');


const create = (blog) => Blog.create(blog);

const getAll = () => Blog.find().sort({ creartedate: 'desc'}).populate('author').exec();

const deleteBlog = (id,deletedid) => Blog.find( {$and :[{_id:deletedid},{author:id}]} ).remove() ;


const editOne = (id,editid, body) => Blog.updateOne({$and :[{_id:editid},{author:id}]},{$set : body}).exec() ;

const getBlogByTag = ({ tags }) => Blog.find({ tags }).exec();

const getBlogByTitle = ({ title }) => Blog.find({ title }).exec();

const getMyProfile = (query) => Blog.find(query).sort({ creartedate: 'desc'}).exec() ;

const searchTageTitle=({ser})=> Blog.find({ $or: [{ tags: new RegExp(ser, 'i') }, { title: new RegExp(ser, 'i') }] }).populate('author').exec();

const getBlogByAuthor = async (username) => {
    const user= await User.find({ username }).exec();
    return Blog.find({}).sort({ creartedate: 'desc'}).where('author').in(user).populate('author');
};

// const getBlogByAuthor =(author) =>  Blog.find({ author }).populate('author').exec();


const postComment =(blogid, comment) => Blog.findByIdAndUpdate(blogid, { $push: { comments: comment } }, { new: true }).exec();
const getFollowings = (followings) => Blog.find().sort({ creartedate: 'desc'}).where('author').in(followings).populate('author');

module.exports = {
    create,
    getAll,
    deleteBlog,
    editOne,
    getBlogByTag,
    getBlogByTitle,
    getBlogByAuthor,
    getFollowings,
    getMyProfile,
    searchTageTitle,
    postComment
   
}
