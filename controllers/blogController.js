const Blog = require('../models/Blog')
const slugify = require('slugify')


const createBlog = async (req, res) => {
    const slug = slugify(
        req.body.title,
        {
            lower: true,
            strict: true
        }
    )

    const blog = await Blog.create({
        ...req.body,
        slug,
        featuredImage: req.file?.path,
        author: req.user._id,
        publishedAt: req.body.status === 'published' ? new Date(): null        
    })

    res.status(201).json(blog)
}

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({
        status: 'published'
    }).populate(
        'author',
        'name email'
    )
    res.json(blogs)
}

const getBlog = async (req, res) => {
    const blog = await Blog.findOne({slug: req.params.slug}).populate('author')

    if(!blog){
        return res.status(404).json({
            message: 'Blog not found'
        })
    }

    blog.views += 1

    await blog.save()

    res.json(blog)
}

const updateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if(!blog) {
        return res.status(404).json({
            message: 'Blog not found'
        })
    }

    Object.assign(
        blog,
        req.body
    )

    if(req.file){
        blog.featuredImage = req.file.path
    }

    await blog.save()

    res.json(blog)

}


const deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)

    res.json({
        message: 'Deleted'
    })
}


const publishBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    blog.status = 'published'

    blog.publishedAt = new Date()

    await blog.save()

    res.json(blog)
}

const unpublishBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    blog.status = 'draft'

    await blog.save()

    res.json(blog)
}

const myDraft = async (req, res) => {
    console.log(req.user._id)
    const drafts = await Blog.find({
        author: req.user._id,
        status: 'draft'
    })

    res.json(drafts)
} 


module.exports = { createBlog, getBlogs, getBlog, updateBlog, deleteBlog, publishBlog, unpublishBlog, myDraft }