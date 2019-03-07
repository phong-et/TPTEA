<template>
  <div class="et-img-upload" :style="{'height':height,'width':width}">
    <input type="file" @change="readImgData" ref="inputFile" class="hidden">
    <div class="bt-edit" @click="edit">
      <i class="material-icons">edit</i>
    </div>
    <img :src="urlImg" :style="{'height':height,'width':width}">
    <q-inner-loading :visible="getUploadPercentage!=0">
      <q-progress :percentage="getUploadPercentage" stripe animate height="7px" class="progress"/>
    </q-inner-loading>
  </div>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  props: {
    height: {
      type: String,
      default: '200px',
    },
    width: {
      type: String,
      default: '280px',
    },
    url: {
      type: String,
      default: 'statics/upload-image-size.svg',
    },
  },
  data() {
    return {
      urlImg: this.url,
      widgetUpload: null,
    }
  },
  computed: {
    ...mapGetters('util', ['getUploadPercentage']),
  },
  methods: {
    ...mapMutations('util', ['setCurrentUploadImageData']),
    readImgData(event) {
      let reader = new FileReader()
      reader.onload = () => {
        this.urlImg = reader.result
      }
      this.setCurrentUploadImageData(event.target.files[0])
      reader.readAsDataURL(event.target.files[0])
    },
    edit() {
      this.$refs.inputFile.click()
    },
  },
  watch: {
    url: {
      immediate: true,
      handler(url) {
        if (url.indexOf('undefined') > 0) this.urlImg = 'statics/upload-image-size.svg'
        else this.urlImg = url
      },
    },
  },
}
</script>
<style lang="stylus" scoped>
.et-img-upload
  border-radius 10px
  background-color #d9d9d9
  position relative

img
  border-radius 10px

.bt-edit
  background-color #f2f2f2
  display flex
  border-radius 6px
  font-size 18px
  position absolute
  right 10px
  top 10px
  padding 6px
  cursor pointer

.progress
  width 92%
  border-radius 10px
</style>
