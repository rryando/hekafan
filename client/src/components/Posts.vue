<template lang="pug">
  div
    h1 Posts
    |     This file will list all the posts.
    div(v-for='(post, index) in data' :key='post.id')
      postCard(v-bind="post" style="padding: 20px")
    Page(total=20)
</template>

<script>
import PostsService from '@/services/PostsService'
import postCard from './postCard'
import tweetData from './../data/tweet2'

export default {
  name: 'posts',
  components: {
    postCard
  },
  data() {
    return {
      data: [],
      page: {
        current: 1,
        limit: 10,
        offset: 0
      }
    }
  },
  mounted() {
    console.log('mounted hook')
    // this.getPosts()
    this.getTweet()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      console.log(response)
      this.data = response.data.posts
    },
    async getTweet () {
      await PostsService.getTweet(this.page).then((res) => {
        console.log(res)
        this.data = res.data
      })
      
    }
    
  }
}
</script>