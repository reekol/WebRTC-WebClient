<template>
    <div style="padding-top:50px">
        <card-offer 
          linkhead="/rtc/cam/security/streamer"
          image="bug"
          title="Ooops! 404 NOT FOUND."
          subhead="I wish i could see this when."
          content1="i'am lookin for plastic in the ocean."
          content2="Finding war zones in world map."
          content3="Looking for a speeding ticket."
          link1="/rtc"
          link2="/rtc/register"
          btn1="Home"
          btn2="Registration"
        />
    </div>
</template>
<style lang="scss" scoped>
  .md-card {
    width: 420px;
    margin: 20px;
    margin-top:auto;
    display: inline-block;
    vertical-align: center;
  }
</style>
<script>
import CardOffer from '../components/CardOffer.vue'
export default {
    components:{ CardOffer },
    mounted:()=>{ window.init = null }
}
</script>
