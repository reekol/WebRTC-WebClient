import Vue from 'vue'
import Main from './layouts/Main.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import NotFound from './pages/404.vue'
import AppSecurityClient from './pages/AppSecurityClient.vue'
import AppSecurityStreamer from './pages/AppSecurityStreamer.vue'
import AppBabyPhoneClient from './pages/AppBabyPhoneClient.vue'
import AppBabyPhoneStreamer from './pages/AppBabyPhoneStreamer.vue'
import AppPhoneCall from './pages/AppPhoneCall.vue'
import AppVideoCall from './pages/AppVideoCall.vue'
import VueMaterial from "vue-material"
import VueRouter from "vue-router"
import VueFullscreen from 'vue-fullscreen'
import "vue-material/dist/vue-material.min.css"
import "vue-material/dist/theme/black-green-light.css" // default, default-dark, black-green-dark, black-green-light

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueFullscreen)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/rtc/', component: Home },
    { path: '/rtc/about', component: About },
    { path: '/rtc/cam/security/client', component: AppSecurityClient },
    { path: '/rtc/cam/security/streamer', component: AppSecurityStreamer },
    { path: '/rtc/cam/babyphone/client', component: AppBabyPhoneClient },
    { path: '/rtc/cam/babyphone/streamer', component: AppBabyPhoneStreamer },
    { path: '/rtc/cam/phone/call', component: AppPhoneCall },
    { path: '/rtc/cam/video/call', component: AppVideoCall },
    { path: '/rtc/*', component: NotFound }
  ]
})

new Vue({
  router,
  render: h => h(Main),
  data: () => ({
    n: 0 ,
    path: process.env.NODE_ENV === 'production' ? 'https://seqr.link/rtc' : 'https://localhost:8083'
  })
}).$mount('#app')
