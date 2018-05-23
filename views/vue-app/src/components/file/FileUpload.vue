<template lang="pug">
  v-form
    form(enctype="multipart/form-data")
      label(for='file_input')
        v-icon(large) {{ icon }}
      input(v-if='!hidden', type="file", accept="*", name="file_uploaded", @change="fileChange", ref="file_input", :multiple='multiple')
      small {{ help }}
      slot
      div(v-if='active')
        v-btn(v-on:click='send') OK
        v-btn(v-on:click='reset') Annuler
        v-progress-circular(:value='loaded' v-if='onUpload' color='primary')
      // Alert(:type='alertType' duration='5000', :active='alert', v-on:alertAnimationEnd='alertEnd', transition='slide-y-transition') {{ alertMsg }}
        br
        small(v-if="alertType === 'error'") {{ errorCode }}
</template>

<script>
import axios from 'axios'
import Alert from '../Alert/Alert.vue'
export default {
  name: 'FileUpload',
  components: { Alert },
  props: ['endpoint', 'help', 'icon', 'extras', 'disabled', 'hidden', 'multiple'],
  data () {
    return {
      loaded: 0,
      onUpload: false,
      files: null,
      active: false,
      alertType: 'error',
      alertMsg: '',
      alert: false,
      errorCode: ''
    }
  },
  methods: {
    fileChange (e) {
      this.active = !this.active
      if (e.target.files[0]) {
        this.files = e.target.files
        console.log(this.files)
      }
    },
    reset () {
      this.files = null
      this.active = false
      this.loaded = 0
      this.onUpload = false
      this.$refs.file_input.value = null
    },
    send () {
      const formdata = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        console.log(this.files[i])
        formdata.append('files[]', this.files[i])
      }
      formdata.append('extras', JSON.stringify(this.extras))
      const self = this

      axios.put(this.endpoint, formdata, {
        onUploadProgress (e) {
          self.onUpload = true
          self.loaded = Number(Math.round((100 * e.loaded) / e.total))
        }
      }).then(response => {
        this.reset()
        this.alert = true
        if (!response.data.error) {
          this.alertType = 'success'
          this.alertMsg = 'Fichier envoyé'
        } else {
          this.alertType = 'error'
          this.alertMsg = 'Une erreur est survenue'
          this.errorCode = response.data.error
        }
        this.$emit('response', response.data)
      })
    },
    alertEnd () {
      this.alert = false
    }
  }
}
</script>

<style scoped>

</style>
