import Vue from 'vue'
import Main from './layouts/Main.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import NotFound from './pages/404.vue'
import MediaRtc from './components/MediaRtc.vue'
import VueMaterial from "vue-material"
import VueRouter from "vue-router"
import VueFullscreen from 'vue-fullscreen'
import SocialSharing from 'vue-social-sharing'
import "vue-material/dist/vue-material.min.css"
import "vue-material/dist/theme/black-green-light.css" // default, default-dark, black-green-dark, black-green-light

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope,faVideo,faBaby,faPhone,faComments,faFilm,faFileUpload,faMapMarkerAlt,faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEnvelope,faVideo,faBaby,faPhone,faComments,faFilm,faFileUpload,faMapMarkerAlt,faFacebookSquare,faUserCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(SocialSharing)
Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueFullscreen)
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/rtc/',                      component: Home},
    { path: '/rtc/about',                 component: About },
    { path: '/rtc/cam/security/client',   component: MediaRtc, props: { audio:'recvonly', video: 'recvonly', data:'inactive', file:'inactive'}},
    { path: '/rtc/cam/security/streamer', component: MediaRtc, props: { audio:'sendonly', video: 'sendonly', data:'inactive', file:'inactive'}},
    { path: '/rtc/cam/babyphone/client',  component: MediaRtc, props: { audio:'recvonly', video: 'recvonly', data:'inactive', file:'inactive'}},
    { path: '/rtc/cam/babyphone/streamer',component: MediaRtc, props: { audio:'sendonly', video: 'sendonly', data:'inactive', file:'inactive'}},
    { path: '/rtc/cam/phone/call',        component: MediaRtc, props: { audio:'sendrecv', video: 'inactive', data:'inactive', file:'inactive'}},
    { path: '/rtc/cam/video/call',        component: MediaRtc, props: { audio:'sendrecv', video: 'sendrecv', data:'inactive', file:'inactive'}},
    { path: '/rtc/cam/data/call',         component: MediaRtc, props: { audio:'inactive', video: 'inactive', data:'sendrecv', file:'inactive'}},
    { path: '/rtc/cam/file/streamer',     component: MediaRtc, props: { audio:'inactive', video: 'inactive', data:'inactive', file:'sendonly'}},
    { path: '/rtc/cam/file/client',       component: MediaRtc, props: { audio:'inactive', video: 'inactive', data:'inactive', file:'recvonly'}},
    { path: '/rtc/*',                     component: NotFound }
  ]
})

new Vue({
  router,
  render: h => h(Main),
  data: () => ({
    n: 0 ,
    rtc:null,
    path:  process.env.NODE_ENV === 'production' ? 'https://seqr.link/rtc'            :"https://192.168.1.105:8080",
    client:process.env.NODE_ENV === 'production' ? "https://seqr.link:3001/client.js" :"https://192.168.1.105:3001/client.js",
    socket:process.env.NODE_ENV === 'production' ? "wss://seqr.link:3001/socket"      :"wss://192.168.1.105:3001/socket"
  })
}).$mount('#app')
