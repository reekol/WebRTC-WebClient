<template>
    <div style="padding-top:50px">
        <card-offer 
          linkhead="/rtc/cam/security/streamer"
          image="video"
          title="Security camera"
          subhead="Free for non commersial use."
          content1="One way audio"
          content2="One way video"
          content3="..."
          link1="/rtc/cam/security/streamer"
          link2="/rtc/cam/security/client"
          btn1="Streamer"
          btn2="client"
        />

        <card-offer 
          linkhead="/rtc/cam/babyphone/streamer"
          image="baby"
          title="Baby monitor"
          subhead="Free for non commersial use."
          content1="One way audio"
          content2="One way video"
          content3="..."
          link1="/rtc/cam/babyphone/streamer"
          link2="/rtc/cam/babyphone/client"
          btn1="Streamer"
          btn2="client"
        />
        
        <card-offer 
          linkhead="/rtc/cam/phone/call"
          image="phone"
          title="Free audio call"
          subhead="Free for non commersial use."
          content1="Two way audio"
          content2="..."
          content3="..."
          link1="/rtc/cam/phone/call"
          btn1="Phone call"
        />
        
        <card-offer 
          linkhead="/rtc/cam/video/call"
          image="film"
          title="Free video call"
          subhead="Free for non commersial use."
          content1="Two way audio"
          content2="Two way video"
          content3="..."
          link1="/rtc/cam/video/call"
          btn1="Video call"
        />
        
        <card-offer 
          linkhead="/rtc/cam/data/call"
          image="comments"
          title="Chat messanger."
          subhead="Free for non commersial use."
          content1="Two way data."
          content2="..."
          content3="..."
          link1="/rtc/cam/data/call"
          btn1="Chat"
        />
<!--
        <card-offer 
          linkhead="/rtc/cam/data/call"
          image="map-marker-alt"
          title="Track device."
          subhead="Free for non commersial use."
          content1="One way data."
          content2="..."
          content3="..."
          link1="/rtc/cam/data/streamer"
          link2="/rtc/cam/data/client"
          btn1="Track"
          btn2="Follow"
        />
        
        <card-offer 
          linkhead="/rtc/cam/file/call"
          image="file-upload"
          title="File sharing."
          subhead="Free for non commersial use."
          content1="Two way data."
          content2="..."
          content3="..."
          link1="/rtc/cam/file/streamer"
          link2="/rtc/cam/file/client" 
          btn1="Share"
          btn2="Download"
        />
        <card-offer 
          linkhead="/rtc/register"
          image="user-circle"
          title="Registration."
          subhead="Free for non commersial use."
          content1="Permanent ID."
          content2="..."
          content3="..."
          link1="/rtc/register" 
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
