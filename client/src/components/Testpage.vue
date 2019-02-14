<template lang="pug">
  div
    h2 this is the test page
    div(v-for="(post, index) in data" :key="index")
      span {{post.title}}
      span {{post.description}}
</template>

<script>
import PostsService from './../services/PostsService'

export default {
  name: 'Testpage',
  data() {
    return {
      data: []
    }
  },
  mounted() {
    console.log('mounted hook')
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      console.log(response)
      this.data = response.data.posts
    }
  }
}
</script>