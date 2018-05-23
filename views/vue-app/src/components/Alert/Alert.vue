<template lang="pug">
  div
    transition(v-on:after-enter="afterEnter" :name="transitionName" :duration='durationTime')
      v-alert(v-if="visibility" :type='alertType' :outline='outlineMode' :icon='iconType' :value="visibility")
        slot
</template>

<script>
export default {
  name: 'Alert',
  props: ['alertType', 'outlineMode', 'visibility', 'transitionName', 'durationTime', 'iconType'],
  methods: {

    afterEnter () {
      setTimeout(() => {
        this.$emit('done')
      }, Number(this.durationTime))
    }
  }
}
</script>

<style scoped>
</style>
