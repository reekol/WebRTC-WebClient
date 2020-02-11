<template>
    <div style="padding-top:50px">
        <card-offer 
          linkhead="/cam/security/streamer"
          image="video"
          title="Security camera"
          subhead="Free for non commersial use."
          content1="One way audio"
          content2="One way video"
          content3="..."
          link1="/cam/security/streamer"
          link2="/cam/security/client"
          btn1="Streamer"
          btn2="client"
        />

        <card-offer 
          linkhead="/cam/babyphone/streamer"
          image="baby"
          title="Baby monitor"
          subhead="Free for non commersial use."
          content1="One way audio"
          content2="One way video"
          content3="..."
          link1="/cam/babyphone/streamer"
          link2="/cam/babyphone/client"
          btn1="Streamer"
          btn2="client"
        />
        
        <card-offer 
          linkhead="/cam/phone/call"
          image="phone"
          title="Free audio call"
          subhead="Free for non commersial use."
          content1="Two way audio"
          content2="..."
          content3="..."
          link1="/cam/phone/call"
          btn1="Phone call"
        />
        
        <card-offer 
          linkhead="/cam/video/call"
          image="film"
          title="Free video call"
          subhead="Free for non commersial use."
          content1="Two way audio"
          content2="Two way video"
          content3="..."
          link1="/cam/video/call"
          btn1="Video call"
        />
        
        <card-offer 
          linkhead="/cam/data/call"
          image="comments"
          title="Chat messanger."
          subhead="Free for non commersial use."
          content1="Two way data."
          content2="..."
          content3="..."
          link1="/cam/data/call"
          btn1="Chat"
        />
        
        <card-offer 
          linkhead="/cam/stack/all"
          image="star"
          title="All in one."
          subhead="Free for non commersial use."
          content1="Two way audio."
          content2="Two way video."
          content3="Two way data"
          link1="/stack/all" 
          btn1="Go go!"
        />
<!--
        <card-offer 
          linkhead="/cam/data/call"
          image="map-marker-alt"
          title="Track device."
          subhead="Free for non commersial use."
          content1="One way data."
          content2="..."
          content3="..."
          link1="/cam/data/streamer"
          link2="/cam/data/client"
          btn1="Track"
          btn2="Follow"
        />
        
        <card-offer 
          linkhead="/cam/file/call"
          image="file-upload"
          title="File sharing."
          subhead="Free for non commersial use."
          content1="Two way data."
          content2="..."
          content3="..."
          link1="/cam/file/streamer"
          link2="/cam/file/client" 
          btn1="Share"
          btn2="Download"
        />
        <card-offer 
          linkhead="/register"
          image="user-circle"
          title="Registration."
          subhead="Free for non commersial use."
          content1="Permanent ID."
          content2="..."
          content3="..."
          link1="/register" 
          btn1="Register"
        />
-->
    </div>
</template>

<script>
import CardOffer from '../components/CardOffer.vue'
export default {
    components:{ CardOffer },
    mounted:()=>{ window.init = null }
}
</script>
