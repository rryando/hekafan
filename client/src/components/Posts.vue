<template>
  <div>
    <h1>Posts</h1>
    This file will list all the posts.



    <div v-for="(post, index) in data" :key="index">
      <p>
        <span><b>{{ post.title }}</b></span><br />
        <span>{{ post.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
// import PostsService from '@/services/PostsService'

export default {
  name: 'posts',
  data() {
    return {
      data: []
    }
  },
  mounted() {
    console.log('mounted')
    this.getPosts()
  },
  methods: {
    async getPosts () {
      console.log('get post')
      const response = await PostsService.fetchPosts()
      console.log(response.data.posts)
      this.data = response.data.posts
    }
  }
}
