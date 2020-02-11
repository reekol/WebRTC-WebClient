<template>
  <div>
    <br />
    <md-card 
      id="controlls"
      class="center md-elevation-24 md-layout-item md-xlarge-size-30 md-large-size-40 md-big-size-60 md-medium-size-70 md-small-size-90 md-xsmall-size-90" >

      <social-sharing :url="fullPath"
        v-show="showShare"
        title="SeQR streemer share"
        description="Someone wants to talk with you on privete P2P session."
        quote="SeQR RTC is a way for privte P2P comunication"
        hashtags="SeQR"
        inline-template>
        <div class="social">
<!--            <network network="email"   ><font-awesome-icon icon="envelope"  /></network>&nbsp;-->
            <network network="facebook"><font-awesome-icon :icon="['fab', 'facebook-square']"  /></network>&nbsp;
            <network network="telegram"><font-awesome-icon :icon="['fab', 'telegram']"  /></network>&nbsp;
            <network network="skype"   ><font-awesome-icon :icon="['fab', 'skype']"  /></network>&nbsp;
            <network network="whatsapp"><font-awesome-icon :icon="['fab', 'whatsapp-square']"  /></network>&nbsp;
        </div>
       </social-sharing>
       <a       v-show="showShare" class="social" :href="fullPath" target="_new"><font-awesome-icon icon="external-link-square-alt"  />&nbsp;</a>
      <md-card-media>
        <!-- Local Video -->
        <md-content 
        v-show="options.audioSelected || options.videoSelected"
        class="float-left md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100" style="background:#232323">
          <fullscreen class="center" :fullscreen.sync="fullscreen" ref="fullscreen" @change="fullscreenChange">
            <video  id="inputVideoLocal" autoplay :srcObject.prop="srcObjectLocal" :poster="`${this.$root.$data.path}/assets/stream.png`" @click="togglefullscreen"></video>
          </fullscreen>
        </md-content>
        <!-- Remote Video -->
        <md-content
        v-show="
        ( ['sendrecv','recvonly'].includes(video) || ['sendrecv','recvonly'].includes(audio) )
        && userIdRemote"
        class="float-left md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100" style="background:#232323">
          <fullscreen class="center" :fullscreen.sync="fullscreen" ref="fullscreen" @change="fullscreenChange">
            <video  id="inputVideoRemote" autoplay :srcObject.prop="srcObjectRemote" :poster="`${this.$root.$data.path}/assets/stream.png`" @click="togglefullscreen"></video>
          </fullscreen>
        </md-content>
      </md-card-media>

      <md-card-header>
        <!-- Username -->
        <md-field v-show="showUserIdLocal" class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100">
          <md-input  id="inputUserIdLocal" v-model="userIdLocal" readonly="readonly" placeholder="ID (auto generated)" />
        </md-field>
        <!-- Username to call -->
        <md-field  
        v-show="userIdLocal"
        class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100">
          <md-input id="inputUserIdRemote" v-model="userIdRemote" autocomplete="off" placeholder="Remote ID" />
        </md-field>
      </md-card-header>

      <md-card-content>
        <!-- Video input -->
        <md-field
        v-show="['sendrecv','sendonly'].includes(video)"
        class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100">
          <md-select id="inputDevicesVideo" v-model="options.videoSelected" placeholder="Video input">
            <md-option v-for="item in options.video" v-bind:key="item.value" :value="item.value" :selected="item.selected">{{item.text}}</md-option>
          </md-select>
        </md-field>
        <!-- Audion input -->
        <md-field 
        v-show="['sendrecv','sendonly'].includes(audio)"
        class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100">
          <md-select id="inputDevicesAudio" v-model="options.audioSelected" placeholder="Audio input">
            <md-option v-for="item in options.audio" v-bind:key="item.value" :value="item.value"  :selected="item.selected">{{item.text}}</md-option>
          </md-select>
        </md-field>
        <!-- Connection status -->
        <md-field v-show="1" class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100">
          <md-input  id="inputConnectionStatus" readonly="readonly"  placeholder="Connection status" :value="connectionStatus"/>
        </md-field>
        <!-- Text message remote --->
        <md-field 
        v-show="!['inactive'].includes(data)"
        class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100" >
          <md-textarea id="inputTextRemote" v-model='textRemote' readonly="readonly" placeholder="Messages will be displayed here." />
        </md-field>
        <!-- Text message local --->
        <md-field
        v-show="data !== 'inactive' && userIdRemote"
        class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100">
          <md-input  id="inputTextLocal" v-model='textLocal' autocomplete='off' placeholder="Messages input" />
        </md-field>
        <!-- File local --->
        <md-field 
        v-show="['sedrecv','sendonly'].includes(file)"
        class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100">
          <md-file  id="inputDataFileLocal" multiple="multiple" placeholder="File to share" />
        </md-field>
      </md-card-content>
      <div style="clear:both"></div>
      <md-card-actions>
        <div style="clear:both"></div>
        <md-button
        v-show="showBtnDownload"
        id="btnDl"      class="md-layout-item md-xlarge-size-20"><a href="#" id="downloadAnchor" >Download</a></md-button>
        <md-button 
        v-show="userIdLocal
          && ( ( options.videoSelected || options.audioSelected ) || ['sendonly','sendrecv'].includes(file) )
          "
        id="btnStream"  class="md-layout-item md-xlarge-size-20">Stream</md-button>
        <md-button 
        v-show="
        ( ['recvonly','sendrecv'].includes(video) || ['recvonly','sendrecv'].includes(audio) || data !== 'inactive' || ['recvonly','sendrecv'].includes(file)  )
        && userIdRemote"
        id="btnCall"    class="md-layout-item md-xlarge-size-20">Dial</md-button>
        <md-button 
        v-show="userIdRemote && data !== 'inactive' && textLocal"
        id="btnSend"    class="md-layout-item md-xlarge-size-20">Send</md-button>
      </md-card-actions>
    </md-card>
    <br />
  </div>
</template>

<style lang="scss" scoped>
.social{
  font-size:30px;
  margin:5px;
  padding-left:3px;
  float:left;
  color:#6688ff;
  cursor:pointer;
}
#controlls video{
  object-fit: contain;
  height:100%;
  margin: 0 auto;
}
.hidden{
  display:none !important
}
</style>
<script>
export default {
  methods: {
    togglefullscreen () {
      this.$refs['fullscreen'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
  props: ['audio','video','data','file'],
  data: () => ({
      options:{
        optionsAudio:[],
        optionsVideo:[]
      },
      showShare:true,
      fullPath:null,
      downloadReceived:'',
      userIdLocal:'',
      userIdRemote:'',
      connections:[],
      fullscreen:false,
      connectionStatus:'',
      dataFileLocal:null,
      textLocal:'',
      textRemote:'',
      srcObjectLocal:null,
      srcObjectRemote:null,
      showBtnDial:false,
      showBtnDownload:false,
      showBtnSend:false,
      showBtnStream:false,
      showDataFileLocal:false,
      showDataTextLocal:false,
      showDataTextRemote:false,
      showDevicesAudio:false,
      showDevicesVideo:false,
      showConnnectionStatus:false,
      showUserIdLocal:true,
      showUserIdRemote:false,
      showVideoLocal:false,
      showVideoRemote:false
    }),
    mounted() {

  /* eslint-disable */
      (async () => {
      /* !TODO Multiple instances */
        if(this.$root.$data.rtc){ await this.$root.$data.rtc._destroy(); this.$root.$data.rtc = null }
        this.showShare = (window.location.href.indexOf('client') === -1)
        const loadJs = function(d, s, id, src, cb){
          let js, fjs = d.getElementsByTagName(s)[0]
          if (d.getElementById(id)){ return cb(); } // call cb if function is called on allready existing element
          js = d.createElement(s)
          js.id = id
          js.type = 'text/javascript'
          js.async = true
          js.defer = true
          js.onload = () => { (typeof cb === 'function' ? cb() : () => {} ) }
          js.src = src
          fjs.parentNode.insertBefore(js, fjs)
        }

        this.userIdRemote     = window.location.hash || ''
        let inputTextRemote   = document.querySelector('#inputTextRemote')
        
        let displayMsg        = async (m  )            => { this.textRemote += m + '\n'; inputTextRemote.scrollTop = inputTextRemote.scrollHeight; }
        let sendMessage       = async (rtc,m)          => { displayMsg('⇨ ' + m); rtc.dataSend(m); this.textLocal='' }
        inputVideoLocal.volume= 0

        let onUpdate          = async (rtc,updateData) => {
          this.connectionStatus       = updateData.connectionState
          this.userIdLocal            = updateData.userIdLocal  || ''
          this.userIdRemote           = updateData.userIdRemote || window.location.hash.substr(1) || ''
          this.srcObjectLocal         = updateData.streamLocal
          this.srcObjectRemote        = updateData.streamRemote
          this.fullPath               = this.$root.$data.path + this.$router.currentRoute.path.replace('streamer','client') + '#' + this.userIdLocal
          if(updateData.message === rtc.MSG_DATA_RECEIVED) displayMsg('⇦ ' + updateData.dataReceived)
        }
        
        loadJs(document, 'script', 'media-socket',this.$root.$data.client, async () => {
          this.$root.$data.rtc = new NkRtcClass({
            socketAddr:     this.$root.$data.socket,
            audioDirection: this.audio,
            videoDirection: this.video,
            dataDirection:  this.data,
            fileDirection:  this.file,
            stunServers:    ['stun:seqr.link:3478'],
            onUpdate:       (updateData) => { onUpdate(this.$root.$data.rtc,updateData) }
          })
          
          let rtc = this.$root.$data.rtc
          this.options = await rtc._showMedia() 
          if(['sendrecv','sendonly'].includes(this.audio) && this.options.audio.length > 1 ) this.options.audioSelected = this.options.audio[1].value
          if(['sendrecv','sendonly'].includes(this.video) && this.options.video.length > 1 ) this.options.videoSelected = this.options.video[1].value
          document.querySelector('#btnStream')      .addEventListener('click',  () => { rtc._addDevices(this.options.audioSelected,this.options.videoSelected) })
          document.querySelector('#btnCall')        .addEventListener('click',  () => { rtc.dial(this.userIdRemote) })
          document.querySelector('#btnSend')        .addEventListener('click',  () => { sendMessage(rtc,this.textLocal) })
          document.querySelector('#inputTextLocal') .addEventListener('keypress',e => { (e.key === 'Enter' ? sendMessage(rtc,this.textLocal) : false ) })
        })
      })()
  /* eslint-enable */
    }
}
</script>
