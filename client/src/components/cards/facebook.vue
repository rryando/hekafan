<template lang="pug">
  row(type='flex', justify='center')
    Col(span="12")
      //- | {{encoded}}
      card
        div(slot='title')
          row
            Col(span=2)
              a(:href="url" target="_blank")
                Icon(type="logo-facebook" size="22")
            Col(span=2)
              tag(:color='tagType.color')
                | {{tagType.text}}
            Col(span=18 offset=1)
              Steps(:current='progress' size="small")
                Step(title='confirmed' icon='ios-clipboard' content="source of the problem is confirmed" @mouseover.native="triggerPoptip($refs.popConfirm, true)" @mouseleave.native="triggerPoptip($refs.popConfirm, false)")
                  poptip(title="confirmed status" content='Source of the problem is identified and confirmed' placement="bottom-end" ref="popConfirm")
                Step(title='in progress' icon='ios-chatboxes' content="Team is handling the problem" @mouseover.native="triggerPoptip($refs.popProgress, true)" @mouseleave.native="triggerPoptip($refs.popProgress, false)")
                  poptip(title="in progress status" content='Related team is handling the case' placement="bottom-end" ref="popProgress")
                Step(title='resolved' icon='ios-checkmark-circle' content="problem solved" @mouseover.native="triggerPoptip($refs.popResolved, true)" @mouseleave.native="triggerPoptip($refs.popResolved, false)")
                  poptip(title="resolved status" content='Problem solved, our customer is happy' placement="bottom-end" ref="popResolved")
            Col(span=1)
              Poptip(placement="bottom")
                a(href="#")
                  Icon(type="ios-apps" size="22")
                .api(slot='content')
                  Menu
                    MenuItem(name='2-1') 
                      a(:href="url" target="_blank") Go to Post Link
                    MenuItem(name='2-2' @click.native="setProgress(-1)") resetProgress
                    MenuItem(name='2-2' @click.native="setProgress(0)") Set as confirmed
                    MenuItem(name='2-3' @click.native="setProgress(1)") Set as in Progress
                    MenuItem(name='2-4' @click.native="setProgress(2)") Set as resolved

        row
          template(v-if="post_type === 'post'")
            iframe(:src='encoded', width='500', height='581', style='border:none;overflow:hidden', scrolling='no', frameborder='0', allowtransparency='true', allow='encrypted-media')
          template(v-if="post_type === 'comment'")
            Col(span=3)
              Avatar(shape="square" icon="ios-person" size="large" :src="'http://avatars.io/facebook/'+username")
            Col(span=18 align="left")
              row
                a(style="font-weight: 800;font-size: 18px;" :href="'https://facebook.com/'+username" target="_blank")
                | {{username}}
                h5(style="font-weight:400") {{created_at}}

        row
          div(style="padding: 10px; text-align:left" v-if="post_type === 'comment'" v-html="parseTweet(text)")
        


</template>
<script>
import axios from 'axios';

export default {
  name: 'postCard',
  props: {
    index: {type: Number, default: 0},
    username: {type:String, default: '#'},
    text: {type:String, default: 'description'},
    url: {type: String, default: '#'},
    post_created_at: {type: String, default: "2019-02-13 07:19:43+00"},
    label: {type: String, default: 4},
    post_type: {type: String, default: 'post'},
    processed: {type: String, default: 'f'}
  },
  data() {
    return {
      progress: -1,
    }
  },
  computed: {
    tagType() {
      switch(parseInt(this.label)) {
        case 0:
          return {color: 'error',text: 'complain'}
          break;
        case 1:
        return {color: 'warning',text: 'general asking'}
          break;
        case 2:
        return {color: 'magenta',text: 'critic'}
          break;
        case 3:
        return {color: 'gold',text: 'praise'}
          break;
        case 4:
        return {color: 'default',text: 'other'}
          break;
      }
    },
    fb() {
      return 'https://twitter.com/'+this.user_screen_name+'/status/'+this.tweet_id
    },
    encoded() {
      // const dummyUrl = 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fandreas.a.andriyanto%2Fposts%2F10216305243777213&width=500&show_text=true&appId=1443685052597199&height=581'
      const encodedURL = encodeURIComponent(this.url)
      return `https://www.facebook.com/plugins/post.php?href=${encodedURL}&width=500&show_text=true&appId=1443685052597199&height=274`
      // return dummyUrl
    }
  },
  methods: {
    triggerPoptip(el, show) {

      el.visible = show;
    },
    parseTweet(text) {
      // parse urls
      text = text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9_-]+\.[A-Za-z0-9_:%&~\?\/.=-]+/g, function(u) {
        // return u.link(url)
        return `<a href="${u}" target="_blank">${u}</a>`
      })
      // parse usernames
      text = text.replace(/[@]+[A-Za-z0-9_-]+/g, function(u) {
        var username = u.replace("@","")
        // return u.link("http://twitter.com/"+username)
        return `<a href="http://facebook.com/${username}" target="_blank">@${username}</a>`
      })
      // parse hashtags
      text = text.replace(/[#]+[A-Za-z0-9_-]+/g, function(t) {
        var tag = t.replace("#","%23")
        return `<a href="http://search.twitter.com/search?q=${tag}" target="_blank">#${tag}</a>`
        // return t.link("http://search.twitter.com/search?q="+tag)
      })
      return text;
    },
    setProgress(v) {
      this.progress = v;
    }
  }
}
</script>
