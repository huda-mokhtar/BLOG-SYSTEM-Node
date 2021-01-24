const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const User = require('../models/User');

const create = (user) => User.create(user);

const login = async ({ username, password }) => {

    const user = await User.findOne({ username }).exec();
    if (!user) {
        throw Error('UN_AUTHENTICATED');
    }
    const isVaildPass = user.validatePassword(password);
    if (!isVaildPass) {
        throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
        username: user.username,
        id: user.id,
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
    return { ...user.toJSON(), token };

};

const getAll = () => User.find({}).exec();

const editOne = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();

// const follow = async (id, targetid) =>  {
//     await User.updateOne({id:targetid}, { $push: { followers: id } }, { new: true }).exec();
//     //update followings for loggedin user
//      await User.updateOne({id}, { $push: { followings: targetid } }, { new: true }).exec();
//     return ('done');
// }
const follow = (id, targetid) =>  {
    User.update({"_id":targetid} , { $push: { followers: id } });
    User.update({"_id":id} , { $push: { followings: targetid} });
}
    // console.log('before '+id+" "+ targetid)
    //update followers for the followed
  
//    console.log('user updated'+user)
//     //update followings for loggedin user
//     User.update({"_id":id}, { $push: { followings: targetid } });
// }



const unfollow = (id, targetid) => {
    //update followers for the followed
    User.findByIdAndUpdate(targetid, { $pull: { followers: id } }).exec();
    //update followings for loggedin user
    User.findByIdAndUpdate(id, { $pull: { followings: targetid } }).exec();
    return ('done');
}

const getFollowings = async (userid) => {
    const { followings } = await User.findById(userid).exec()
    return User.find().where('_id').in(followings).exec()
}
const getFollowers = async (userid) => {
    const { followers } = await User.findById(userid).exec()
    return User.find().where('_id').in(followers).exec()
}
module.exports = {
    create,
    login,
    getAll,
    editOne,
    follow,
    unfollow,
    getFollowers,
    getFollowings
};
