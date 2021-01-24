const Blog = require('../models/Blog');
const User = require('../models/User');

const create = (blog) => Blog.create(blog);

const getAll = (query) => Blog.find(query).exec();

const deleteOne = (id) => Blog.remove({ _id: id });

const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();

const getBlogByTag = ({ tags }) => Blog.find({ tags }).exec();

const getBlogByTitle = ({ title }) => Blog.find({ title }).exec();


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
    deleteOne,
    editOne,
    getBlogByTag,
    getBlogByTitle,
    getBlogByAuthor,
    getFollowings,
}
