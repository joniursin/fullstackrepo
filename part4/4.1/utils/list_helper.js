var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((total, current) => total.likes > current.likes ? total : current, 0)
}

const mostBlogs = (blogs) => {
    if (!blogs.length) { return 0 }
    const author = _.maxBy(Object.entries(_.countBy(blogs, 'author')), (max) => max)
    return { author: author[0], blogs: author[1]}
}
const mostLikes = (blogs) => {
  return _.maxBy(_.map(_.groupBy(blogs, 'author'), (likes, author) => ({ author, likes: _.sumBy(likes, 'likes') })), 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}