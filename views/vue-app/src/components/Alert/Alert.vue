<template lang="pug">
  div
    transition(v-on:after-enter="afterEnter" :duration='durationTime')
      v-alert(:type='alertType' :outline='outlineMode' :icon='iconType' :value="visibility" :mode="modeTransition")
        slot
</template>

<script>
export default {
  name: 'Alert',
  props: ['alertType', 'outlineMode', 'visibility', 'transitionName', 'durationTime', 'modeTransition', 'iconType'],
  methods: {

    afterEnter: function () {
      console.log('before timeout')
      setTimeout(function () {
        console.log('before emit')
        this.$emit('done')
      }, this.durationTime)
    }
  }
}
</script>

<style scoped>
</style>
