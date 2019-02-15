<template lang="pug">

  div
    h1 {{active}}
    //- |     This file will list all the posts.
    hr(style="margin:4px")
    template(v-if="active === 'Twitter'")
      div(v-for='(post, index) in twitter' :key='post.id')
        twitter(v-bind="post" style="padding: 20px")
    template(v-if="active === 'Facebook'")
      div(v-for='(post, index) in facebook' :key='post.id')
        facebook(v-bind="post" style="padding: 20px")
    template(v-if="active === 'Instagram'")
      div(v-for='(post, index) in instagram' :key='post.id')
        instagram(v-bind="post" style="padding: 20px")
    //- div(v-for='(post, index) in facebook' :key='post.id')
    //-   facebook(v-bind="post" style="padding: 20px")
    //- div(v-for='(post, index) in data' :key='post.id')
    //-   postCard(v-bind="post" style="padding: 20px")
    Page(total="1000" :current="page.current" ref="paginate" v-on:on-change="nextPage($event)")
</template>

<script>
import PostsService from '@/services/PostsService'
import postCard from './postCard'
import facebook from './cards/facebook'
import instagram from './cards/instagram'
import twitter from './cards/twitter'
import tweetData from './../data/tweet2'
import fbData from './../data/fb'

export default {
  name: 'posts',
  components: {
    postCard,
    facebook,
    instagram,
    twitter
  },
  props: {
    active: {type: String, default: 'Twitter'}
  },
  data() {
    return {
      data: [],
      page: {
        current: 1,
        limit: 10,
        offset: 100
      },
      // facebook: fbData
      facebook: [],
      twitter: [],
      instagram: []
    }
  },
  watch: {
    active(val) {
      this.page = {
        current: 1,
        limit: 10,
        offset: 100
      };
      if (val === 'Facebook') this.getFb()
      if (val === 'Instagram') this.getIg()
      if (val === 'Twitter') this.getTweet()
    }
  },
  mounted() {
    console.log('mounted hook')
    this.getTweet()
    // this.getIg()
  },
  methods: {
    nextPage(event) {
      if (this.active === 'Facebook') this.getFb(event)
      if (this.active === 'Instagram') this.getIg(event)
      if (this.active === 'Twitter') this.getTweet(event)
    },
    async getPosts (event) {
      this.page.current = event ? event : 1;
      await PostsService.getAll({params: this.page}).then((res) => {
        // res.data.map()
        console.log(res)
        this.page.offset = (this.page.current-1)*this.page.limit
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      
    },
    async getTweet (event) {
      this.page.current = event ? event : 1;
      await PostsService.getTweet({params: this.page}).then((res) => {
        // res.data.map()
        this.twitter = res.data
        this.page.offset = (this.page.current-1)*this.page.limit
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      
    },
    async getFb (event) {
      this.page.current = event ? event : 1;
      await PostsService.getFb({params: this.page}).then((res) => {
        // res.data.map()
        this.facebook = res.data
        this.page.offset = (this.page.current-1)*this.page.limit
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      
    },
    async getIg (event) {
      this.page.current = event ? event : 1;
      await PostsService.getIg({params: this.page}).then((res) => {
        // res.data.map()
        this.instagram = res.data
        this.page.offset = (this.page.current-1)*this.page.limit
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      
    }
    
  }
}
</script>