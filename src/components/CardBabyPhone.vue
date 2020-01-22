<template>
    <md-card class="md-elevation-24">
      <md-card-media>
        <router-link to="/cam/babyphone/streamer">
           <img src="/assets/baby.png" alt="Baby" style="width:70%" />
        </router-link>
      </md-card-media>

      <md-card-header>
        <div class="md-title">Baby monitor</div>
        <div class="md-subhead">Free for non commersial use.</div>
      </md-card-header>

      <md-card-content>
        <ul>
         <li>One way audio.</li>
         <li>One way video.</li>
         <li>More features in dev.</li>
        </ul>
      </md-card-content>
      <div style="clear:both"></div>
      <md-card-actions>
        <router-link to="/cam/babyphone/streamer"><md-button>Streamer</md-button></router-link>
        <router-link to="/cam/babyphone/client"><md-button>Client</md-button></router-link>
      </md-card-actions>
    </md-card>
</template>

<script>
  export default {
  }
</script>
