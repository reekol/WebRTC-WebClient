<template>
    <div style="padding-top:50px">
        <card-offer 
          linkhead="/cam/securitye/streamer"
          image="/assets/security.png"
          title="Security camera"
          subhead="Free for non commersial use."
          content1="One way audio"
          content2="One way video"
          content3="..."
          linkstreamer="/cam/security/streamer"
          linkclient="/cam/security/client"
        />

        <card-offer 
          linkhead="/cam/babyphone/streamer"
          image="/assets/baby.png"
          title="Baby monitor"
          subhead="Free for non commersial use."
          content1="One way audio"
          content2="One way video"
          content3="..."
          linkstreamer="/cam/babyphone/streamer"
          linkclient="/cam/babyphone/client"
        />
        
        <card-offer 
          linkhead="/cam/phone/call"
          image="/assets/phonecall.png"
          title="Free audio call"
          subhead="Free for non commersial use."
          content1="Two way audio"
          content2="..."
          content3="..."
          linkcall="/cam/phone/call"
        />
        
        <card-offer 
          linkhead="/cam/video/call"
          image="/assets/videocall.png"
          title="Free video call"
          subhead="Free for non commersial use."
          content1="Two way audio"
          content2="Two way video"
          content3="..."
          linkcall="/cam/video/call"
        />

    </div>
</template>

<script>
import CardOffer from '../components/CardOffer.vue'
export default {
    components:{ CardOffer },
    mounted:()=>{ window.init = null }
}
</script>
