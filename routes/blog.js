const express=require('express');
const multer =require('multer');
const path=require('path');
const router=express.Router();
var cors=require('cors');
router.use(cors())

const {create,
    getAll,
    editOne,
    deleteOne,
    getBlogByTag,
    getBlogByTitle,
    getBlogByAuthor,
    getFollowings} =require('../controllers/blog');
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


 router.post('/create',auth,upload.single("photo"),async(req,res,next)=>{
    const lastimage=req.file.filename;
    const { body, user: { id } } = req;
    try{
        const blog=await create({ ...body,photo:lastimage, userId: id });
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
  router.delete('/:id',auth ,async (req, res, next) => {
    const { params : { id } } = req; 
    try {
      const blo = await deleteOne(id);
      res.json(blo);
    } catch (e) {
      next(e);
    }
  });
//edit blog
router.patch('/:id',auth,async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
      const blogs = await editOne(id, body);
      res.json(blogs);
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





module.exports=router;