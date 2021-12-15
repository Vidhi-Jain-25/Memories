const User = require('../../models/User')
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const FilterCommentData = require('../../utils/FilterCommentData')
const sendDataToFriends = require('../../utils/socket/SendDataToFriend')
const CreateNotification = require("../../utils/CreateNotification")



exports.createComment = async (req, res) => {

  // const { text, image } = req.body
  // if (!text || (text.trim().length === 0 && !image))

  const { text } = req.body
  if (!text || (text.trim().length === 0)) {
    return res.status(422).json({ error: 'Comment something!' })
  }
  try {
    const post = await Post.findById(req.params.postId)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    let body = {}
    // if (image) {
    //   body.image = image
    // }
    if (text) {
      body.text = text
    }

    const createComment = new Comment({
      user: req.userId,
      post: req.params.postId,
      body,
    })

    const saveComment = await createComment.save()
    const comment = await Comment.findById(saveComment.id).populate(
      'user',
      '_id name profile_pic',
    )

    const filterComment = FilterCommentData(comment)
    res.status(201).json({
      message: 'Commented on post successfully',
      comment: filterComment,
    })

    const user = await User.findById(post.user);

    await sendDataToFriends({ req, key: 'post-comment', data: filterComment, notif_body: `${comment.user.name} has commented on ${user.name + "'s"} post.` })

    if (user.socketId && comment.user.id !== user.id) {
      req.io.to(user.socketId).emit('post-comment', { filterComment })
      let notification = await CreateNotification({ user: user._id, body: `${comment.user.name} has commented on one of your's post.` })
      req.io.to(user.socketId).emit("Notification", { data: notification })
    }
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Something went wrong" })
  }
}



exports.fetchComments = async (req, res) => {
  let page = parseInt(req.query.page || 0)
  let limit = 3

  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(page * limit)
      .populate('user', '_id name profile_pic')

    const filterComments = comments.map((comment) => FilterCommentData(comment))
    const totalCount = await Comment.countDocuments({ post: req.params.postId })

    const paginationData = {
      currentPage: page,
      totalPage: Math.ceil(totalCount / limit),
      totalComments: totalCount,
    }
    res
      .status(200)
      .json({ comments: filterComments, pagination: paginationData })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Something went wrong" })
  }
}



exports.likeDislikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate( 'user')

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' })
    }

    let commentData

    const index = comment.likes.indexOf(req.userId)
    // Index==-1 when userid not found ie when user likes comment, else returns index of userid

    if (index !== -1) {
      comment.likes.splice(index, 1)
      await comment.save()

      commentData = FilterCommentData(comment)

      res.status(200).json({ message: 'Removed like', comment: commentData })

      await sendDataToFriends({
        req,
        key: 'comment-like-change',
        data: commentData,
      }) 
      return
    }

    comment.likes.push(req.userId)
    await comment.save()

    commentData = FilterCommentData(comment)
    res.status(200).json({ message: 'Comment liked', comment: commentData })
    await sendDataToFriends({
      req,
      key: 'comment-like-change',
      data: commentData,
    })
  } 
  catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Something went wrong" })
  }
}