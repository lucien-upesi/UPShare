<template lang="pug">
    v-btn(@click='back', icon, color="accent")
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
