<template>
    <media-rtc :video="video" :audio="audio" :data="data" descr=""/>
</template>
<script>
  import MediaRtc from '../components/MediaRtc.vue'
  export default { components:{ MediaRtc }, props: ['audio','video','data']}
</script>
