<template>
  <div>
  <center>
    <div id="pageAbout" class="md-layout-item md-xlarge-size-30 md-large-size-50 md-medium-size-60 md-small-size-90 md-xsmall-size-90">
      <p>
        This web page is an Web interface to  <a href="https://github.com/reekol/WebRTC">Reekol's WebRTC</a> Git project.<br />
        Feel free to use it without any warranty for non commersial use.<br />
        commersial use of any product from this web page (seqr.link)<br /> IS PROHIBITED.<br />
        For any custom implementations please contant the author at<br />
        email: <a href="mailto:cupuyc+WebRTC@gmail.com" >cupuyc+WebRTC@gmail.com</a><br />
        <br />
      </p>
      <div>
        Credits goes to:<br />
        Vue - javascript framewrk for building web apps.<br />
        Nodejs - for the ssl socket server.<br />
        Stund - Linux stun server.<br />
        iconfinder.com - For licence free icons used.<br />
        ReeKol (Me)  - for coding and combining the above into this project.
        <br /><br />
        Todo:<br />
        Free Audio (Only) calls!<br />
        Video chat (Two way audio and video)<br />
        Door bell (Ringing Signal)<br />
        Data channel on security camera (to send current streemer coordinates)<br />
        Map (For security camera coordinates)
      </div>
    </div>
    </center>
  </div>
</template>

<script>

  export default {
    components: {
    }
  }
</script>
<style lang="scss" scoped>
  #pageAbout{
    margin-top:50px;
    text-align:left;
    color:white;
    border-right:1px dotted white
  }
</style>
