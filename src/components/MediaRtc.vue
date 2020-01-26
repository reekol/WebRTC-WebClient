<template>
  <div>
    <md-card 
      style="margin-top:50px"
      id="controlls"
      class="center md-elevation-24 md-layout-item md-xlarge-size-30 md-large-size-40 md-big-size-60 md-medium-size-70 md-small-size-90 md-xsmall-size-100" >
      <md-card-media>
        <!-- Local Video -->
        <md-field
          v-show="video === 'sendrecv' || video === 'sendonly'"
          class="float-left md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
          <fullscreen class="center" :fullscreen.sync="fullscreen" ref="fullscreen" @change="fullscreenChange">
            <video  id="local"  autoplay :poster="`${this.$root.$data.path}/assets/stream.png`" @click="togglefullscreen"></video>
          </fullscreen>
        </md-field>
        
        <!-- Remote Video -->
        <md-field 
          v-show="video === 'sendrecv' || video === 'recvonly'"
          class="float-left md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
          <fullscreen class="center" :fullscreen.sync="fullscreen" ref="fullscreen" @change="fullscreenChange">
            <video  id="remote" autoplay :poster="`${this.$root.$data.path}/assets/stream.png`" @click="togglefullscreen"></video>
          </fullscreen>
        </md-field>
      </md-card-media>

      <md-card-header>
        <!-- Username -->
        <md-field 
          v-show="video === 'sendrecv' || video === 'sendonly' || audio === 'sendrecv' || audio === 'sendonly' || data === 'sendrecv' || data  === 'sendonly' || file === 'sendrecv' || file  === 'sendonly'"
          class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100">
          <md-input  id="username" readonly="readonly" placeholder="ID (auto generated)"/>
        </md-field>
        <!-- Username to call -->
        <md-field 
          v-show="video === 'sendrecv' || video === 'recvonly' || audio === 'sendrecv' || audio === 'recvonly' || data === 'sendrecv' || data  === 'recvonly'"
          class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100">
          <md-input  id="username-to-call" placeholder="ID to call" />
        </md-field>
      </md-card-header>

      <md-card-content>
        <!-- Video input -->
        <md-field 
          v-show="video === 'sendrecv' || video === 'sendonly'"
          class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100">
          <md-select id="videoinput" v-model="videoSelected" placeholder="Video input">
            <md-option v-for="item in optionsVideo" v-bind:key="item.value" :value="item.value">{{item.text}}</md-option>
          </md-select>
        </md-field>
        <!-- Audion input -->
        <md-field 
          v-show="audio === 'sendrecv' || audio === 'sendonly'"
          class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100">
          <md-select id="audioinput" v-model="audioSelected" placeholder="Audio input">
            <md-option v-for="item in optionsAudio" v-bind:key="item.value" :value="item.value"  :selected="true">{{item.text}}</md-option>
          </md-select>
        </md-field>
        
        <!-- Connection status -->
        <md-field 
          v-show="1"
          class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100">
          <md-input  id="state" readonly="readonly"  placeholder="Connection status" />
        </md-field>

        <!-- Text message remote --->
        <md-field 
          v-show="data === 'sendrecv' || data === 'sendonly'"
          class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100">
          <md-textarea  id="message-output" placeholder="Messages will be displayed here." />
        </md-field>
        
        <!-- Text message local --->
        <md-field 
          v-show="data === 'sendrecv' || data === 'sendonly'"
          class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100">
          <md-input  id="message-input" placeholder="Messages input" />
        </md-field>
        
        <!-- File local --->
        <md-field 
          v-show="file === 'sendrecv' || file === 'sendonly'"
          class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100">
          <md-file  id="file-local" placeholder="File to share" />
        </md-field>
        

      </md-card-content>
      <div style="clear:both"></div>
      <md-card-actions>
        <!-- Register and Dial -->
        <div style="clear:both"></div>
        <md-button
          id="login"
          class="md-layout-item md-xlarge-size-20">Register</md-button>
        <md-button 
          v-show="video === 'sendrecv' || video === 'recvonly' || audio === 'sendrecv' || audio === 'recvonly' || data === 'sendrecv' || data === 'recvonly'"
          id="call-make"
          class="md-layout-item md-xlarge-size-20">Dial</md-button>
        <md-button 
          v-show="data === 'sendrecv' || data === 'sendonly'"
          id="sendMsg"
          class="md-layout-item md-xlarge-size-20">Send</md-button>

      </md-card-actions>
    </md-card>
  </div>
</template>

<style lang="scss">
#controlls video{
  object-fit: contain;
  height:100%;
  margin: 0 auto;
}
.center{
  margin: 0 auto;
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
        fullscreen:false,
        audioSelected: '',
        optionsAudio: [],
        videoSelected: '',
        optionsVideo: []
      }),
      mounted() {
          let init = () => {
            let connection        = null
            let dataChannel       = null
            let otherUsername     = null
            let messageIn         = document.querySelector('input#message-input')
            let messageOut        = document.querySelector('textarea#message-output')
            let local             = document.querySelector('video#local')
            let remote            = document.querySelector('video#remote')
            let remoteName        = document.querySelector('#username-to-call')
            let state             = document.querySelector('#state')
            let btnLogin          = document.querySelector('button#login')
            let callBtn           = document.querySelector('button#call-make')
            let sendBtn           = document.querySelector('button#sendMsg')
            let hash              = window.location.hash.substr(1)
            let ws                = new WebSocket('wss://seqr.link:3001/socket')
            let connectionState   = (conn)        => { return (conn.connectionState || conn.iceConnectionState) }
            let checkState        = (conn)        => { return  ['new','connecting','failed','disconnected'].includes(connectionState(conn)) }
            let error             = error         => { d(error) }
            let answer            = answr         => { connection.setLocalDescription(answr); sendMessage({type: 'answer',answer: answr}) }
            let offer             = ofr           => { sendMessage({ type: 'offer', offer: ofr }); connection.setLocalDescription(ofr)}
            let makeCall          = ()            => { otherUsername = remoteName.value; connection.createOffer( offer,error ) }
            let sendMessage       = message       => { message.otherUsername = otherUsername; ws.send(JSON.stringify(message)) }
            let login             = ()            => { sendMessage({type: 'login',uuid: hash}) }
            let displayMsg        = (m)           => { messageOut.value += m + '\n'; messageOut.scrollTop = messageOut.scrollHeight  }
            let d                 = (e)           => { /* eslint-disable no-console */ console.log(e) /* eslint-enable no-console */}
            let _close            = ()            => { }
            let _answer           = data          => { if( checkState(connection)) connection.setRemoteDescription(new RTCSessionDescription(data.answer)) }
            let _candidate        = data          => { if( checkState(connection)) connection.addIceCandidate     (new RTCIceCandidate(data.candidate))    }
            let _offer            = data          => { if( checkState(connection)) otherUsername = data.username; connection.setRemoteDescription(new RTCSessionDescription(data.offer)); connection.createAnswer(answer,error) }
            let _login            = data          => {
                local.volume = 0
                local.style.visibility = 'visible'
                document.querySelector('#username').value = data.success
                createConnection()
            }
            let sendMsg           = ()            => { 
              if(messageIn.value){ 
                dataChannel.send(messageIn.value)
                displayMsg('>' + messageIn.value)
                messageIn.value = ''
              }
            }
            let createConnection  = async ()      => {
                    connection = new RTCPeerConnection({ iceServers: [{ urls: ['stun:seqr.link:3478'] }] })
                let audio     = ( this.audioSelected === 'none' ? false : { deviceId: { exact: this.audioSelected }} )
                let video     = ( this.videoSelected === 'none' ? false : { deviceId: { exact: this.videoSelected}} )
                let hasMedia  = ( audio || video )
                if(hasMedia){
                  let localStream = await navigator.mediaDevices.getUserMedia({video: video,audio: audio })
                  local.srcObject = localStream
                  connection.addStream(localStream)
                }

                if(this.data || ['sendrecv','sendonly'].includes(this.file) ){
                  dataChannel           = connection.createDataChannel({ ordered: false, maxPacketLifeTime: 3000, })
                  dataChannel.onerror   = error => { d("Data Channel Error:", error) }
                  dataChannel.onmessage = event => { d("Got Data Channel Message:", event.data) }
                  dataChannel.onopen    = ()    => { d("--- connected ---") }
                  dataChannel.onclose   = ()    => { d("The Data Channel is Closed") }
                  connection.ondatachannel = (event) =>{ event.channel.onmessage = (e) => { displayMsg('<' + e.data)}  }
                }

                connection.addTransceiver('video',{currentDirection:this.video})
                connection.addTransceiver('audio',{currentDirection:this.audio})
                connection.ontrack                      = event  => { remote.srcObject = event.stream }
                connection.onaddstream                  = connection.ontrack
                connection.onicecandidate               = event  => { if (event.candidate) sendMessage({ type: 'candidate', candidate: event.candidate }) }
                connection.onconnectionstatechange      = () => { state.value = connectionState(connection) }
                connection.oniceconnectionstatechange   = connection.onconnectionstatechange
                state.value = connectionState(connection)
            }
            let handlers            =                   {_login:_login,_offer:_offer,_answer:_answer,_candidate:_candidate,_close:_close}
            ws.onopen               = ()             => { d('Connected to the signaling server') }
            ws.onmessage            = msg            => { let data = JSON.parse(msg.data); handlers[data.type](data) }
            ws.onerror              = error
            btnLogin    .addEventListener('click', login    )
            callBtn     .addEventListener('click', makeCall )
            sendBtn     .addEventListener('click', sendMsg  )
            messageIn   .addEventListener('keypress', e => { (e.key === 'Enter' ? sendMsg : ()=>{} )() })
            
            let defaultVideo = {text: 'No video selected', value: 'none'}
            let defaultAudio = {text: 'No audio selected', value: 'none'}
            this.optionsVideo.push(defaultVideo)
            this.optionsAudio.push(defaultAudio)
            navigator.mediaDevices.enumerateDevices().then(dev => {
                dev.map((dev) => { 
                  if(dev.kind === 'videoinput') this.optionsVideo.push({text: dev.label, value: dev.deviceId})
                  if(dev.kind === 'audioinput') this.optionsAudio.push({text: dev.label, value: dev.deviceId})
                })
                this.videoSelected = defaultVideo.value
                this.audioSelected = defaultAudio.value

                if(['sendrcv','sendonly'].includes(this.video)) this.videoSelected = this.optionsVideo[1].value
                if(['sendrcv','sendonly'].includes(this.audio)) this.audioSelected = this.optionsAudio[1].value
              }
            )
        }
        init()
    }
}
</script>
