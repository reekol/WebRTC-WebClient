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
import { faEnvelope,faVideo,faBaby,faPhone,faComments,faFilm,faFileUpload,faMapMarkerAlt,faUserCircle,faBug,faExternalLinkSquareAlt} from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare,faTelegram,faWhatsappSquare,faSkype  } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEnvelope,faVideo,faBaby,faPhone,faComments,faFilm,faFileUpload,faMapMarkerAlt,faFacebookSquare,faBug,faExternalLinkSquareAlt,faUserCircle,faTelegram,faWhatsappSquare,faSkype)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(SocialSharing)
Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueFullscreen)
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/',                      component: Home},
    { path: '/about',                 component: About },
    { path: '/cam/security/client',   component: MediaRtc, props: { audio:'recvonly', video: 'recvonly', data:'inactive', file:'inactive'}},
    { path: '/cam/security/streamer', component: MediaRtc, props: { audio:'sendonly', video: 'sendonly', data:'inactive', file:'inactive'}},
    { path: '/cam/babyphone/client',  component: MediaRtc, props: { audio:'recvonly', video: 'recvonly', data:'inactive', file:'inactive'}},
    { path: '/cam/babyphone/streamer',component: MediaRtc, props: { audio:'sendonly', video: 'sendonly', data:'inactive', file:'inactive'}},
    { path: '/cam/phone/call',        component: MediaRtc, props: { audio:'sendrecv', video: 'inactive', data:'inactive', file:'inactive'}},
    { path: '/cam/video/call',        component: MediaRtc, props: { audio:'sendrecv', video: 'sendrecv', data:'inactive', file:'inactive'}},
    { path: '/cam/data/call',         component: MediaRtc, props: { audio:'inactive', video: 'inactive', data:'sendrecv', file:'inactive'}},
    { path: '/cam/file/streamer',     component: MediaRtc, props: { audio:'inactive', video: 'inactive', data:'inactive', file:'sendonly'}},
    { path: '/cam/file/client',       component: MediaRtc, props: { audio:'inactive', video: 'inactive', data:'inactive', file:'recvonly'}},
    { path: '/*',                     component: NotFound }
  ]
})

new Vue({
  router,
  render: h => h(Main),
  data: () => ({
    n: 0 ,
    rtc:null,
    path:  process.env.NODE_ENV === 'production' ? 'https://winterborn.org'            :"https://192.168.1.105:8080",
    client:process.env.NODE_ENV === 'production' ? "https://winterborn.org:3001/client.js" :"https://192.168.1.105:3001/client.js",
    socket:process.env.NODE_ENV === 'production' ? "wss://winterborn.org:3001/socket"      :"wss://192.168.1.105:3001/socket"
  })
}).$mount('#app')
