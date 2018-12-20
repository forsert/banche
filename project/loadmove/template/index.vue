<template>
    <loadMove @loadTop='loadTops' @loadBottom='loadBottom'></loadMove>
</template>
<script>
import loadMove from "./loadmove.vue"
export default {
    data(){
        return{
            
        }
    },
    components:{
        loadMove
    },
    methods:{
        loadTops(callback){
            setTimeout(()=>{
                callback? callback():'';
            },2000)
            
        },
        loadBottom(callback){
            setTimeout(()=>{
                callback?callback():'';
            },5000)
        }
    }
}
</script>
<style>

</style>


