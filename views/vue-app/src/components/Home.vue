<template lang="pug">
  v-layout(align-center, justify-center)
    v-flex(xs12='', sm6='')
      v-card
        img(src="../assets/upshare.png", height="200px")
        v-card-title(primary-title='')
          div
            h3.headline.mb-0 Kangaroo Valley Safari
            div
              | Located two hours south of Sydney in the
              br
              | Southern Highlands of New South Wales, ...
        v-card-actions
          v-btn(to='Login', flat, color='primary') Login
          v-btn(to='Register', flat, color='primary') Register
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
