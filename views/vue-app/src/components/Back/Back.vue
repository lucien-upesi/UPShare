<template lang="pug">
  div
    v-btn(@click='back', icon, fab)
      v-icon navigate_before
</template>

<script>
export default {
  name: 'Back',
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
