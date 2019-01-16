import Vue from 'vue'
import video from './template/video.vue'
import '../src/css/common.css'
console.log(process)
// console.log(pathConfig.modulePath)
new Vue({
    el:"#app",
    render:h=>h(video)
})