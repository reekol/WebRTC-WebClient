<template>
    <md-card class="md-elevation-24 md-primary" md-theme="ree-card">
      <md-card-media>
        <router-link v-if="linkhead" :to="`${linkhead}`">
           <img v-if="image" :src="`${this.$root.$data.path}${image}`" :alt="`${title}`" style="width:70%" />
        </router-link>
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{title}}</div>
        <div class="md-subhead">{{subhead}}</div>
      </md-card-header>

      <md-card-content>
        <ul>
         <li>{{content1}}</li>
         <li>{{content2}}</li>
         <li>{{content3}}</li>
        </ul>
      </md-card-content>
      
      <div style="clear:both"></div>

      <md-card-actions>
        <router-link v-if="linkstreamer" :to="`${linkstreamer}`"><md-button>Streamer</md-button></router-link>
        <router-link v-if="linkclient" :to="`${linkclient}`"><md-button>Client</md-button></router-link>
        <router-link v-if="linkcall" :to="`${linkcall}`"><md-button>Call</md-button></router-link>
      </md-card-actions>
    </md-card>
</template>

<style lang="scss" scoped>
  .md-card {
    width: 260px;
    margin: 20px;
    margin-top:auto;
    display: inline-block;
    vertical-align: center;
  }
  .md-card-content ul{
    list-style-type: none;
    float:left;
    margin: 0;
  }
  .md-card-content li{
    padding:2px;
    color: #333333;
    text-align: left;
    text-decoration: none;
  }
</style>

<script>
export default {
    props: [
      'linkhead',
      'linkstreamer',
      'linkclient',
      'linkcall',
      'image',
      'title',
      'subhead',
      'content1',
      'content2',
      'content3'
    ]
}
</script>
