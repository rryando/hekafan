import Api from './api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },
  getTweet(req) {
    return Api().get('tweet', req)
  }
}