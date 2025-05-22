const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((total, current) => total.likes > current.likes ? total : current, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}