const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (req, res) =>
  res.json(await Blog.find({}).populate('user', { username: 1, name: 1 })),
)

router.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes === undefined ? 0 : req.body.likes,
    user: user._id,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result)
  await user.save()

  res.status(201).json(result)
})

router.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(204).end()
  if (blog.user.toString() !== decodedToken.id)
    return res.status(403).json({ error: 'Unauthorized' })
  await blog.remove()
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const result = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  if (!result) return res.status(404).end()
  res.json(result)
})

module.exports = router
