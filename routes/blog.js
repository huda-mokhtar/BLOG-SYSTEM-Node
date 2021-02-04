const express=require('express');
const multer =require('multer');
const path=require('path');
const router=express.Router();
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
    getMyProfile,} =require('../controllers/blog');
const auth = require('../middlewares/auth');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
  
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

//create with image
 router.post('/create',auth,upload.single("photo"),async(req,res,next)=>{
    const lastimage=req.file.filename;
    console.log(lastimage);
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

//get blog by author
router.get('/author/:author',auth, async (req, res, next) => {
    const { params: { author } } = req;
    try {
        const blogs = await getBlogByAuthor(author);
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
router.get('/myprofile',auth,async (req, res, next) => {
  const {user: {id}} = req;
  try {
    const blog = await getMyProfile({author : id});
    res.json(blog);
  } catch (e) {
    next(e);
  }
});





module.exports=router;