<template>
    <div class='relative'>
        <span class="play absolute icon iconfont" @click='play'>&#xe662;</span>
        <video :src="src" :poster='poster' :controls='controls' :muted='muted' :loop="loop" :autoplay="autoplay" ref='video' x5-playsinline playsinline webkit-playsinline></video>
        <div class="progress-box absolute flex">
            <span class="icon iconfont play-btn" >&#xe638;</span>
            <!-- <span class="icon iconfont suspend-btn">&#xe63f;</span> -->
            <span class="time">00:00/02.07</span>
            <div class="time-line-box"></div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        src:{
            type:String,
            default:"https://pic.bianla.cn/community/video/20181129/yingyangbuliang.mp4"
        },
        poster:{
            type:String,
            default:"https://pic.bianla.cn/fatDoyen/20181218/ed4d688c58654a358ff183654421fe28.jpg"
        },
        autoplay:{
            type:Boolean,
            default:false
        },
        loop:{
            type:Boolean,
            default:true
        },
        controls:{
            type:Boolean,
            default:false
        },
        muted:{
            type:Boolean,
            default:false
        },

    },
    data(){
        return {}
    },
    methods:{
        play(){
            console.log(this.$refs.video)
            this.$refs.video.play()
        }
    },
    created(){

    }
}
</script>
<style scoped lang='less'>
    video{
        max-width:100%;
        max-height:100%;
    }
    .play{
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        color:#fff;
        font-size:120px;
        z-index:9;
    }
    .progress-box{
        padding:20px 24px ;
        bottom:0;
        color:#fff;
        span.icon{
            font-size:26px;
        }
    }
    // video::-webkit-media-controls-enclosure,video::-webkit-media-controls-overlay-enclosure,video::-webkit-media-controls{
    //     display:none !important;
    // }
    
</style>