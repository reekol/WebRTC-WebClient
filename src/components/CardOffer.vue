<template>
    <md-card class="md-elevation-24" >
      <md-card-media>
        <router-link v-if="linkhead" :to="`${linkhead}`">
          <font-awesome-icon :icon="image" class="fa" />
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
        <router-link v-if="link1" :to="`${link1}`"><md-button>{{btn1}}</md-button></router-link>
        <router-link v-if="link2" :to="`${link2}`"><md-button>{{btn2}}</md-button></router-link>
      </md-card-actions>
    </md-card>
</template>

<style lang="scss" scoped>
  .fa{
    font-size:100px;
    margin-top:20px
  }
  .md-title{
    font-size:18px !important
  }
  .md-card {
    width: 220px;
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
      'link1',
      'link2',
      'btn1',
      'btn2',
      'image',
      'title',
      'subhead',
      'content1',
      'content2',
      'content3'
    ]
}
</script>
