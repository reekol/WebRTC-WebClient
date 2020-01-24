const os        = require('os')
const cp        = require('child_process')
const fs        = require('fs')
const https     = require('https')
const WebSocket = require('ws')
const express   = require('express')
const app       = express()
const uuidv     = require('uuid/v4')
const users     = {}
const sendTo    = (ws, message) => {  if(typeof ws === 'object') ws.send(JSON.stringify(message)) }
const cert      = fs.readFileSync('./crt/certificate.pem')
const key       = fs.readFileSync('./crt/key.pem')
const server    = https.createServer({cert:cert,key:key},app)
const wss       = new WebSocket.Server({ server: server , path: '/socket'})
const cwd       = process.cwd()
const d         = console.log

const getLocalIpV4 = () => {
  let interfaces = os.networkInterfaces()
  let filtered = {}
  Object.keys(interfaces).forEach( ifname => {
    let f = interfaces[ifname].filter( iface => { return ((!iface.internal) && (iface.family === 'IPv4')) })
    if(f.length > 0) filtered[ifname] = f
  })
  return filtered
}

const sugggestLocalNetIp = () => {
  let localIpV4 = getLocalIpV4()
  let found = Object.keys(localIpV4)
  if(!found.length) return '0.0.0.0';
  return localIpV4[found[0]][0].address // get the first address of the first found iterface
}

wss.on('connection', ws => {
  ws.on('message', message => {
    let data = null
    let soc  = null
    try { 
        data = JSON.parse(message)
    } catch (error) {
        console.error('Invalid JSON', error)
        data = {}
    }
    let rsp  = { type: '_' + data.type }
    d(data.type)

    switch (data.type) {
      case 'login':
          let uuid
          if(ws.username !== null) delete users[ws.username]
          if(data.uuid) { uuid = data.uuid }
          else          { while( uuid = uuidv().substring(0,3) ) if(typeof users[uuid] === 'undefined') break; }
          ws.username       = uuid
          rsp.success       = uuid
          users[uuid]       = ws
          soc               = ws // gets back to caller
        break
      case 'offer':
          ws.otherUsername  = data.otherUsername
          rsp.offer         = data.offer
          rsp.username      = ws.username
          soc               = users[data.otherUsername]
        break
      case 'answer':
          ws.otherUsername  = data.otherUsername
          rsp.answer        = data.answer
          soc               = users[data.otherUsername]
        break
      case 'candidate':
          rsp.candidate     = data.candidate
          soc               = users[data.otherUsername]
        break
      default:
          soc               = ws
          rsp.message       = 'Command not found: ' + data.type
        break
    }
    sendTo(soc, rsp)
  })
  ws.on('close', () => { if (ws.username) delete users[ws.username] })
})

let localIp = sugggestLocalNetIp()
d('Starting stund on: ' + localIp)
let stund = cp.spawn('/usr/sbin/stund',['-v','-h',localIp])
    stund.stdout.on('data',  data => console.log   )
    stund.stderr.on('data',  data => console.error )
    stund       .on('close', code => console.log   )

// app.get('/',                (req, res) => res.sendFile(`${cwd}/public/index.html` ) )
server.listen(3001)

