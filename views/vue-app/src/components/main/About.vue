<template lang="pug">
  v-container.mt-0
    v-layout
      v-flex.text-xs-center(xs12)
        img(src="@/assets/upshare.png")
        p.mt-4 Per hoc minui studium suum existimans Paulus, ut erat in conplicandis negotiis artifex dirus, unde ei Catenae inditum est cognomentum, vicarium ipsum eos quibus praeerat adhuc defensantem ad sortem periculorum communium traxit. et instabat ut eum quoque cum tribunis et aliis pluribus ad comitatum imperatoris vinctum perduceret: quo percitus ille exitio urgente abrupto ferro eundem adoritur Paulum. et quia languente dextera, letaliter ferire non potuit, iam districtum mucronem in proprium latus inpegit. hocque deformi genere mortis excessit e vita iustissimus rector ausus miserabiles casus levare multorum.
    v-layout.mt-4(row)
      v-flex
        div.layout.justify-center
          v-avatar(size='200')
            img(src="@/assets/upshare.png")
        v-flex.text-xs-center
          h3 Vuetify
      v-spacer
      v-flex
        div.layout.justify-center
          v-avatar(size='200')
            img(src="@/assets/upshare.png")
        v-flex.text-xs-center
          h3 Vue.js
      v-spacer
      v-flex
        div.layout.justify-center
          v-avatar(size='200')
            img(src="@/assets/upshare.png")
        v-flex.text-xs-center
          h3 JavaScripts
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>

</style>
