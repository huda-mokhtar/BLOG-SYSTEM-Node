const Blog = require('../models/Blog');
const User = require('../models/User');

const create = (blog) => Blog.create(blog);

const getAll = (query) => Blog.find(query).exec();

const deleteBlog = (id,deletedid) => Blog.find( {$and :[{_id:deletedid},{author:id}]} ).remove() ;


const editOne = (id,editid, body) => Blog.updateOne({$and :[{_id:editid},{author:id}]},{$set : body}).exec() ;

const getBlogByTag = ({ tags }) => Blog.find({ tags }).exec();

const getBlogByTitle = ({ title }) => Blog.find({ title }).exec();
const getMyProfile = (query) => Blog.find(query).exec() ;

const getBlogByAuthor = async (author) => {
    const users = await User.find({ author }).exec();
    const usersIds = [];
    users.forEach(u => {
        usersIds.push(u.id)
    })
    return Blog.find({}).where('author').in(usersIds).exec()
};
const getFollowings = (followings) => Blog.find().where('author').in(followings);
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
   
}
