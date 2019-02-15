<template>
  <div id="app">
    <templateLayout>
      <!-- <router-view/> -->
    </templateLayout>
  </div>
</template>

<script>
import templateLayout from './components/templateLayout'

export default {
  name: 'App',
  components: {
    templateLayout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
