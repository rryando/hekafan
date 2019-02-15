import Api from './api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },
  getTweet(req) {
    return Api().get('tweet', req)
  },
  getAll(req) {
    return Api().get('all', req)
  },
  getFb(req) {
    return Api().get('fb', req)
  },
  getIg(req) {
    return Api().get('ig', req)
  },
}