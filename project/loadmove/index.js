import indexVue from './template/index.vue'
import Vue from 'vue';
import "../src/css/common.css"
new Vue({
    el: '#app',
    render:h=> h(indexVue)
});
  