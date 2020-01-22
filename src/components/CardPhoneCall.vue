<template>
    <md-card class="md-elevation-24">
      <md-card-media>
        <router-link to="/cam/phone/call">
           <img src="/assets/phonecall.png" alt="Baby" style="width:70%" />
        </router-link>
      </md-card-media>

      <md-card-header>
        <div class="md-title">Phone call</div>
        <div class="md-subhead">Free for non commersial use.</div>
      </md-card-header>

      <md-card-content>
        <ul>
         <li>Two way audio.</li>
         <li>....</li>
         <li>....</li>
        </ul>
      </md-card-content>
      <div style="clear:both"></div>
      <md-card-actions>
        <router-link to="/cam/phone/call"><md-button>Call</md-button></router-link>
      </md-card-actions>
    </md-card>
</template>

<script>
  export default {
  }
</script>
