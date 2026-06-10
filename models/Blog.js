const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    excerpt: String,
    content: {
        type: String,
        required: true
    },
    featuredImage: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: String,
    tags: [String],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    publishedAt: Date
}, {
    timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)