const express=require('express');
const multer =require('multer');
const path=require('path');
const router=express.Router();
const auth = require('../middlewares/auth');
var cors=require('cors');
router.use(cors())

const {create,
    getAll,
    editOne,
    deleteBlog,
    getBlogByTag,
    getBlogByTitle,
    getBlogByAuthor,
    getFollowings,
    getMyProfile,
    searchTageTitle,
    postComment,} =require('../controllers/blog');
const blogModel = require('../models/Blog');
const { compareSync } = require('bcryptjs');

  const storage = multer.diskStorage({
    destination: path.join(__dirname,"..","public"),
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });

//create with image
 router.post('/create',auth,upload.single("photo"),async(req,res,next)=>{
   let lastimage;
   if(req.file==undefined){
    lastimage="";
  }
    else{
      lastimage=req.file.filename;
    }
    const { body, user: { id } } = req;
    try{
        const blog=await create({ ...body,photo:lastimage, author: id });
        res.json(blog);
    }catch(e){
        next(e);
    }
});



//getAll blog
router.get('/', async (req, res, next) => {
    try {
      const blogs = await getAll();
      
      console.log(blogModel.find().populate('author'));
      res.json(blogs);
    } catch (e) {
      next(e);
    }
  });
//delete blog
  router.delete('/:deletedid',auth, async (req, res, next) => {
    const {user:{id} , params: { deletedid }} = req;
    try {
      const blog = await deleteBlog(id,deletedid);
      res.json(blog);
    } catch (e) {
      next(e);
    }
  });
  
//edit blog
  router.patch('/:editid',auth,async (req, res, next) => {
    const { user:{id} ,params: { editid }, body } = req;
    try {
      const blog = await editOne(id,editid, body);
      res.json(blog);
    } catch (e) {
      next(e);
    }
  });
//get blog by tag
router.get('/tags/:tags', auth,async (req, res, next) => {
    const { params: {tags} } = req;
    try {
        const blogs = await getBlogByTag({tags});
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//get blog by title
router.get('/title/:title',auth, async (req, res, next) => {
    const { params: { title } } = req;
    try {
        const blogs = await getBlogByTitle({ title });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//get blog by title &&tage
router.get('/search/:ser',auth, async (req, res, next) => {
  const { params: { ser } } = req;
  try {
      const blogs = await searchTageTitle({ ser });
      res.json(blogs);
  } catch (e) {
      next(e);
  }
});
//get blog by author
router.get('/author/:author',auth, async (req, res, next) => {
    const { params: { author } } = req;
    try {
        console.log(author);
        const blogs = await  getBlogByAuthor(author);
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});

//get followings
router.get('/followings',auth, async (req, res, next) => {
    const { user: { followings } } = req;
    try {
        const blogs = await getFollowings(followings );
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//getMyProfile
router.get('/myprofile',auth,async (req, res, next) => {
  const {user: {id}} = req;
  try {
    const blog = await getMyProfile({author : id});
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//comment
router.post('/comments/:blogid',auth, async (req, res, next) => {
  const { user:{id, firstName, lastName} ,params: {blogid}, body } = req;
  try{
    const comment=await postComment(blogid,{ ...body, author: id , authorName: firstName+""+lastName});
    res.json(comment);
    }catch(e){
    next(e);
    }
});




module.exports=router;