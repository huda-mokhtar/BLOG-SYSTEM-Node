const express = require('express');
const router = express.Router();
const {create, login, getAll, editOne,follow,unfollow,getFollowers,getFollowings} = require('../controllers/user');
const auth = require('../middlewares/auth');
var cors=require('cors');
router.use(cors())


//register
router.post('/', async (req, res, next) => {
    const { body } = req;
    try {
      const user = await create(body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });
  //login
  router.post('/login', async (req, res, next) => {
    const { body } = req;
    try {
      const user = await login(body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });
  //get all user 
  router.get('/', async (req, res, next) => {
    try {
      const users = await getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
  //updata
  router.patch('/:id', auth,async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
      const users = await editOne(id, body);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
//follow
  router.post('/follow/:targetid',auth ,async (req, res, next) => {
    const { params: { targetid },user: { id }  } = req;
    try {
      const user = await follow(id, targetid);  
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  //unfollow
  router.post('/unfollow/:targetid',auth, async (req, res, next) => {
    const { params: { targetid },user: { id }  } = req;
    try {
      const user = await unfollow( id,targetid);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });
  
 //get followers
router.get('/followers/:userid',auth, async (req, res, next) => {
    let { params: { userid } } = req
    try {
      const followers = await getFollowers(userid);
      res.json(followers);
    } catch (e) {
      next(e);
    }
  })
  
  //get followings
  router.get('/followings/:userid',auth, async (req, res, next) => {
    let { params: { userid } } = req
    try {
      const followings = await getFollowings(userid);
      res.json(followings);
    } catch (e) {
      next(e);
    }
  })
  

  module.exports = router;
  