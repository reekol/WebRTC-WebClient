<template>
    <div>
        <card-security/>
        <card-baby-phone/>
        <card-phone-call/>
        <card-video-call/>
    </div>
</template>

<script>
import CardSecurity from '../components/CardSecurity.vue'
import CardBabyPhone from '../components/CardBabyPhone.vue'
import CardPhoneCall from '../components/CardPhoneCall.vue'
import CardVideoCall from '../components/CardVideoCall.vue'

export default {
    components:{
        CardSecurity,
        CardBabyPhone,
        CardPhoneCall,
        CardVideoCall
    },
    mounted:()=>{
      window.init = null
    }
  }
</script>

<style >
  .md-card {
    width: 260px;
    margin: 20px;
    margin-top:0;
    display: inline-block;
    vertical-align: top;
  }
  .md-card-content ul{
    list-style-type: none;
    float:left;
    margin: 0;
  }
  .md-card-content li{
    padding:2px;
    color: #333333;
    text-align: left;
    text-decoration: none;
  }
</style>
