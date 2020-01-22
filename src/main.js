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
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/cam/security/client', component: AppSecurityClient },
    { path: '/cam/security/streamer', component: AppSecurityStreamer },
    { path: '/cam/babyphone/client', component: AppBabyPhoneClient },
    { path: '/cam/babyphone/streamer', component: AppBabyPhoneStreamer },
    { path: '/cam/phone/call', component: AppPhoneCall },
    { path: '/cam/video/call', component: AppVideoCall },
    { path: '/*', component: NotFound }
  ]
})

new Vue({
  router,
  render: h => h(Main),
  data: () => ({ n: 0 })
}).$mount('#app')
