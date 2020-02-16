// Comments: http://patorjk.com/software/taag/#p=display&f=Doom&t=Api%20methods
// Font: Doom

let d = (m) => {/* eslint-disable no-console */ console.log(m)  /* eslint-enable no-console */ }

class NkRtcClass {

  constructor(options){
    this.MSG_SOCKET_CONNECTED   = 'Socket connected'
    this.MSG_SOCKET_LOGIN_READY = 'Loged in'
    this.MSG_RTC_OBJECT_INIT    = 'Rtc init ready'
    this.MSG_STREAM_LOCAL       = "Local stream ready"
    this.MSG_STREAM_REMOTE      = "Remote stream ready"
    this.MSG_CONNECTION_STATE   = 'Connection state changed'
    this.MSG_USER_REMOTE_CONN   = "Remote user connected"
    this.MSG_DATA_RECEIVED      = "Data received"
    this.MSG_CHUNK_RECEIVED     = "Data chunk deceived"
    this.MSG_FILE_READY         = "File ready to download"
    
    this._lastFileConst         = {size:0,lastChunkNumber:0, lastChunkSize:0, chunks:[], receivedTotal:0,percents:0}
    this._lastFile              = this._lastFileConst
    this._socketAddr            = options.socketAddr
    this._audioDirection        = options.audioDirection
    this._videoDirection        = options.videoDirection
    this._dataDirection         = options.dataDirection
    this._fileDirection         = options.fileDirection
    this._stunServers           = options.stunServers
    this._onUpdate              = options.onUpdate ||  (() => { })
    this._chunkSize             = options.chunkSize || 56384
    this._streamLocal           = null
    this._streamRemote          = null    
    this._userIdLocal           = null
    this._userIdRemote          = null
    this._wss                   = null
    this._connection            = null
    this._initWss()
    this._initRtc()
  }
//  _____      _ _      __                  _   _                 
// |_   _|    (_) |    / _|                | | (_)                
//   | | _ __  _| |_  | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
//   | || '_ \| | __| |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
//  _| || | | | | |_  | | | |_| | | | | (__| |_| | (_) | | | \__ \
//  \___/_| |_|_|\__| |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
//                                                                
//                   
  async _destroy(){
    this._wss.close()
    this._connection.close()
    if(this._streamLocal)   this._streamLocal .getTracks().forEach( track => track.stop() )
    if(this._streamRemote)  this._streamRemote.getTracks().forEach( track => track.stop() )
    this._streamLocal = null
    this._streamRemote = null
    this._connection = null
  }
  async _initWss(){
    this._wss = new WebSocket(this._socketAddr)
    this._wss._retryTime  = 5000
    this._wss.onopen      = (e  ) => { this._update({message:this.MSG_SOCKET_CONNECTED}); this.login()  }
    this._wss.onmessage   = (e  ) => { this._onMessage(e) }
    this._wss.onclose     = (   ) => {  }
    this._wss.onerror     = (e  ) => { setTimeout(this._wss._connect(), this._wss._retryTime) }
    this._wss.sendJson    = (msg) => { msg.otherUsername = this._userIdRemote; this._wss.send(JSON.stringify(msg)) }
  }
  async _initRtc(){
    this._connection      = await new RTCPeerConnection({
      sdpSemantics: "unified-plan",
      iceServers: [{ urls: this._stunServers }]
    })
    this._connection.ontrack                      = this._onTrack.bind(this)
    this._connection.onaddstream                  = this._onTrack.bind(this)
    this._connection.onicecandidate               = this._onIceCandidate.bind(this)
    this._connection.onconnectionstatechange      = this._onStateChanged.bind(this)
    this._connection.oniceconnectionstatechange   = this._onStateChanged.bind(this)
    if(['sendrecv','sendonly','recvonly'].includes(this._dataDirection)) this._addDataChannel()
    if(['sendrecv','sendonly','recvonly'].includes(this._fileDirection)) this._addDataChannel()
  }
//  _____                             _   _                         _ _ _                _        
// /  __ \                           | | (_)                       | | | |              | |       
// | /  \/ ___  _ __  _ __   ___  ___| |_ _  ___  _ __     ___ __ _| | | |__   __ _  ___| | _____ 
// | |    / _ \| '_ \| '_ \ / _ \/ __| __| |/ _ \| '_ \   / __/ _` | | | '_ \ / _` |/ __| |/ / __|
// | \__/\ (_) | | | | | | |  __/ (__| |_| | (_) | | | | | (_| (_| | | | |_) | (_| | (__|   <\__ \
//  \____/\___/|_| |_|_| |_|\___|\___|\__|_|\___/|_| |_|  \___\__,_|_|_|_.__/ \__,_|\___|_|\_\___/
//                                                                                                
//                                                                                                
  async _onIceCandidate(event){ 
    if (event.candidate) this._wss.sendJson({ type: 'candidate', candidate: event.candidate })
  }
  async _onStateChanged(event){
    this._update({message:this.MSG_CONNECTION_STATE})
  }
  async _onTrack(event){ 
    if( event.stream ){
      this._streamRemote = event.stream
    }else if (event.streams && event.streams[0]) {
      this._streamRemote = event.streams[0]
    } else {
      let inboundStream = new MediaStream()
      this._streamRemote  = inboundStream
      this._streamRemote .addTrack(event.track)
    }
    this._update({message:this.MSG_STREAM_REMOTE})
  }
//  _   _                 _     _           _                         _   _               _     
// | | | |               | |   | |         | |                       | | | |             | |    
// | |_| | __ _ _ __   __| |___| |__   __ _| | _____   _ __ ___   ___| |_| |__   ___   __| |___ 
// |  _  |/ _` | '_ \ / _` / __| '_ \ / _` | |/ / _ \ | '_ ` _ \ / _ \ __| '_ \ / _ \ / _` / __|
// | | | | (_| | | | | (_| \__ \ | | | (_| |   <  __/ | | | | | |  __/ |_| | | | (_) | (_| \__ \
// \_| |_/\__,_|_| |_|\__,_|___/_| |_|\__,_|_|\_\___| |_| |_| |_|\___|\__|_| |_|\___/ \__,_|___/
//                                                                                              
//                                                                                              
  async _onMessage(data){
    data = JSON.parse(data.data)
          if(data.type === '_login'    ) this._login    (data)
    else  if(data.type === '_offer'    ) this._offer    (data)
    else  if(data.type === '_answer'   ) this._answer   (data)
    else  if(data.type === '_candidate') this._candidate(data)
  }
  async offer       (data ){
    this._wss.sendJson({ type: 'offer', offer: data})
    this._connection.setLocalDescription(data)
  }
  async _offer      (data ){
    this._userIdRemote = data.username
    this._update({message:this.MSG_USER_REMOTE_CONN})
    this._connection.setRemoteDescription(new RTCSessionDescription(data.offer))
    this._connection.createAnswer(data => { this.answer(data) },this.error)
  }
  async answer      (data ){
    this._connection.setLocalDescription(data); this._wss.sendJson({ type: 'answer',answer: data})
  }
  async _answer     (data ){
    this._connection.setRemoteDescription(new RTCSessionDescription(data.answer))
  }
  async _candidate  (data ){ 
    this._connection.addIceCandidate(new RTCIceCandidate(data.candidate)) 
  }
  async dataSend    (msg  ){ 
    d(['data send',msg])
    this._connection.dataChannel.send(msg) 
  }
  dataSendSync      (msg  ){ 
    d(['data send',msg])
    this._connection.dataChannel.send(msg) 
  }
  async _rtcConnectionState(){ 
    return (this._connection.connectionState || this._connection.iceConnectionState) || null
    
  }
  async _addTransceevers(){
    if(this._connection.getTransceivers().length === 0){
      this._connection.addTransceiver('video',{currentDirection:this._videoDirection})
      this._connection.addTransceiver('audio',{currentDirection:this._audioDirection})
    }
  }
//   ___        _                  _   _               _     
//  / _ \      (_)                | | | |             | |    
// / /_\ \_ __  _   _ __ ___   ___| |_| |__   ___   __| |___ 
// |  _  | '_ \| | | '_ ` _ \ / _ \ __| '_ \ / _ \ / _` / __|
// | | | | |_) | | | | | | | |  __/ |_| | | | (_) | (_| \__ \
// \_| |_/ .__/|_| |_| |_| |_|\___|\__|_| |_|\___/ \__,_|___/
//       | |                                                 
//       |_|                                                 
  async login       (hash ){
    this._wss.sendJson({type: 'login',uuid: hash})
  }
  async _login      (data ){
    this._userIdLocal = data.success
    this._update({ message:this.MSG_SOCKET_LOGIN_READY})
  }
  async error       (e    ){
    d(['ERROR',e])
  }
  async dial        (userIdRemote){ 
    this._userIdRemote = userIdRemote
    this._addTransceevers()
    this._connection.createOffer (data => { this.offer (data) },this.error)
  }
  async _getState(){
    return {
       message:         null,
       dataReceived:    null,
       connectionState: await this._rtcConnectionState() || 'before init',
       userIdLocal:     this._userIdLocal     || null,
       userIdRemote:    this._userIdRemote    || null,
       streamRemote:    this._streamRemote    || null,
       streamLocal:     this._streamLocal     || null,
       null:null
    }
  }
  async _update(data){
    let state = await this._getState()
    if(data.message)  state.message = data.message
    if(data.data)     state.dataReceived = data.data
    this._onUpdate(state)
  }
  async _addDevices(audioDeviceId,videoDeviceId){
    let hasMedia = false
    let videoDevice = ( videoDeviceId && videoDeviceId !== 'none' ? { deviceId: { exact: videoDeviceId }} : false )
    let audioDevice = ( audioDeviceId && audioDeviceId !== 'none' ? { deviceId: { exact: audioDeviceId }} : false )
        hasMedia = ( audioDevice || videoDevice )
    if(hasMedia){
      this._streamLocal = await navigator.mediaDevices.getUserMedia({video: videoDevice,audio: audioDevice })
      this._streamLocal.getTracks().map(track => this._connection.addTrack(track, this._streamLocal))
      this._update({message:this.MSG_STREAM_LOCAL})
    }
    this._addTransceevers()
  }
  _dataDetection(data){
    let meta = null;
    try{ meta = JSON.parse(data)
    }catch(e){ }
    if(meta){
      this._lastFile = this._lastFileConst
      this._lastFile.size = meta.size
      this._lastFile.name = meta.name
    }else{
      if(typeof data === 'object'){
        this._lastFile.lastChunkNumber++
        this._lastFile.lastChunkSize = data.byteLength
        this._lastFile.receivedTotal += data.byteLength
        this._lastFile.percents = (this._lastFile.receivedTotal / this._lastFile.size) * 100
        this._lastFile.chunks.push(data)
          this._update({message:(this._lastFile.percents < 100 ? this.MSG_CHUNK_RECEIVED :this.MSG_FILE_READY),data:this._lastFile})
      }else{
        this._update({message:this.MSG_DATA_RECEIVED,data:data})
      }
    }
  }
  async _addDataChannel(){
    this._connection.dataChannel           = this._connection.createDataChannel({ ordered: false, maxPacketLifeTime: 3000, })
    this._connection.dataChannel.onerror   = this.error
    this._connection.dataChannel.onmessage = event => { d("Got Data Channel Message:", event.data) }
    this._connection.dataChannel.onclose   = ()    => { d("The Data Channel is Closed") }
    this._connection.dataChannel.onopen    = ()    => { d("--- DC connected ---") }
    this._connection.ondatachannel         = (event) =>{ event.channel.onmessage = (e) => { this._dataDetection(e.data) } }
  }
  async sendFile(file) {
    if (file.size === 0) return // Handle 0 size files.
    await this.dataSend(JSON.stringify({
      name:file.name,
      size:file.size,
      type:file.type
    }))
    let fileReader = new FileReader()
    let offset = 0
    let readSlice = o => { fileReader.readAsArrayBuffer(file.slice(offset, o + this._chunkSize)) }
    fileReader.addEventListener('error', error => console.error('Error reading file:', error))
    fileReader.addEventListener('abort', event => console.log('File reading aborted:', event))
    fileReader.addEventListener('load' , event => { this.dataSendSync(event.target.result); offset += event.target.result.byteLength; if (offset < file.size) readSlice(offset) })
    readSlice(0)
  }
  async _showMedia(){
    let optionsAudio = [{text:'No audio',value:''}]
    let optionsVideo = [{text:'No video',value:''}]
    await navigator.mediaDevices.enumerateDevices().then(async dev => {
      dev.map((dev,i) => { 
        if(dev.kind === 'videoinput') optionsVideo.push({text: dev.label || 'Device ' + i, value: dev.deviceId})
        if(dev.kind === 'audioinput') optionsAudio.push({text: dev.label || 'Device ' + i, value: dev.deviceId})
      })
    })
    return {
      audio: optionsAudio,
      video: optionsVideo
    }
  }
}


