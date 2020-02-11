<template>
  <div id="app">
    <particles-bg type="cobweb" :canvas="{backgroundColor:'#888'}" :bg="true" />
    <div class="topMenu">
        <ul>
            <router-link tag="li" to="/">Home</router-link>
            <router-link tag="li" to="/about">About</router-link>
            <li style="padding-left:100px"><font-awesome-icon icon="terminal" /> ReeKol</li>
        </ul>
    </div>
    <div class="centered-container">
        <transition name="fade" mode="out-in" >
            <router-view class="view"></router-view>
        </transition>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
export default {
  name: 'app',
  components: { ParticlesBg },
}
</script>

<style lang="scss">
.center{ margin: 0 auto;}
.clear{ clear:both }
.hidden{ display:none }
.float-left{ float:left }
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}

.centered-container1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 52px);
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 300px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.topMenu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #1111;
}

.topMenu li {
  float: left;
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;
  padding:16px
}

.topMenu ul li:hover,
.topMenu ul li.router-link-exact-active {
   background-color: #333333;
   cursor: pointer;
 }
.md-card, .md-content{
  border-radius:5px !important
}
</style>
