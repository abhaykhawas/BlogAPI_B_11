const router = require('express').Router()

const upload = require('../config/multer')

const protect = require('../middleware/authMiddleware')

const {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    publishBlog,
    unpublishBlog,
    myDraft
} = require('../controllers/blogController')

router.get('/', getBlogs)

router.get('/my/drafts', protect, myDraft)

router.get('/:slug', getBlog)

router.post('/', protect, upload.single('featuredImage'), createBlog)

router.patch('/:id', protect, upload.single('featuredImage'), updateBlog)

router.delete('/:id', protect, deleteBlog)

router.patch('/:id/publish', protect, publishBlog)

router.patch('/:id/unpublish', protect, unpublishBlog)

module.exports = router;