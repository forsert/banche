<template>
    <div class="loadmove-box scroll" 
         @scroll='scroll'
         @touchstart='touchStart'
         @touchmove='touchmove'
         @touchend='touchend'
         ref='move'
        >
        <div class="loadmove-top-box relative" ref='loadTop'>
            <div class="loadmove-top-content flex absolute" ref='loadHeight'>
                <img src="https://pic.bianla.cn/bianlaAPI/common/img/ajax-loader.gif" v-show='offRefreshLoading' class='ajax-loader' alt="">
                <span class="icon iconfont" :class="{animate:arrowAnimate}" v-show="!offRefreshLoading">&#xe62d;</span>
                <span v-text='refreshTipsText'></span>
                <!-- <span>正在刷新数据</span>
                <span>松开可以刷新</span> -->
            </div>
        </div>
        <slot></slot>
        <div class="loademove-footer-box">
            <div class="flex">
                <img src="https://pic.bianla.cn/bianlaAPI/common/img/ajax-loader.gif" v-show='offLoadMoveIcon' class='ajax-loader' alt="">
                <span v-text='loadTipsText'></span>
                <!-- <span>没有更多了</span> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            touchY:0,
            isTouch:true,
            startScrollTop:0,
            triggerLine:60,
            scroHeight:0,
            loadBottomLoading:true,
            refreshTipsText:"下拉可以刷新",
            loadTipsText:"正在加载",
            arrowAnimate:false,
            offRefreshLoading:false,
            offLoadMoveIcon:true

        }
    },
    methods:{
        scroll(){
            if(!this.loadBottomLoading){return}
            if(this.$refs.move.scrollHeight-this.$refs.move.scrollTop-this.$refs.move.offsetHeight<150){
                this.loadBottomLoading = false;
                this.$emit("loadBottom",(statu)=>{
                    if(statu){
                        this.loadTipsText = '没有更多了';
                        this.offLoadMoveIcon = false;
                        this.loadBottomLoading = false;
                        return;
                    }
                    this.loadBottomLoading = true;
                })
            }
        },
        touchStart(ev){
            if(!this.isTouch){return}
            this.touchY = ev.touches[0].clientY;
            this.startScrollTop = this.$refs.move.scrollTop;
        },
        touchmove(ev){
            if(!this.isTouch){ev.preventDefault(); return}
            var touchY = ev.touches[0].clientY - this.touchY;
            if(this.$refs.move.scrollTop<=0 && ev.touches[0].clientY-this.touchY>0){
                ev.preventDefault();
                var number = touchY-this.startScrollTop;
                this.scroHeight = number/3;
                console.log(this.scroHeight)
                this.$refs.loadTop.style.cssText = `height:${number/3}px`;
                if(this.scroHeight>=this.triggerLine){
                    this.refreshTipsText='松开可以刷新';
                    this.arrowAnimate = true;
                }
            }
        },
        touchend(ev){
            var _self = this;
            if(!this.isTouch){return};
            this.$refs.loadTop.classList.add("animate");
            if(this.scroHeight>=this.triggerLine){
                this.isTouch = false;
                this.scroHeight = 0;
                this.$refs.loadTop.style.height = this.$refs.loadHeight.offsetHeight+"px";
                this.refreshTipsText='正在刷新数据';
                this.offRefreshLoading = true;
                
                this.$emit("loadTop",()=>{
                    this.$refs.loadTop.style.height = 0;
                    this.loadTipsText = '正在加载';
                    this.offLoadMoveIcon = true;
                    this.loadBottomLoading = true;
                    setTimeout(()=>{
                        this.$refs.loadTop.classList.remove("animate");
                        this.refreshTipsText='下拉可以刷新';
                        this.isTouch = true;
                        this.offRefreshLoading = false;
                        this.arrowAnimate = false;
                    },300);
                })
            }else{
                 this.$refs.loadTop.style.height = 0;
                 setTimeout(()=>{
                    this.$refs.loadTop.classList.remove("animate");
                    this.isTouch = true;
                },300);
            };
            
        }
    },
    mounted(){
        var _selfel = this.$refs.move;
        _selfel.style.height = window.innerHeight - _selfel.offsetTop+'px'
    }
}
</script>
<style lang='less' scoped>
    .loademove-footer-box{
        text-align:center;
        &>div{
            height:125px;
            justify-content: center;
            align-items: center;
        }
    }
    .loadmove-top-box{
        &.animate{
            transition: height 0.3s;
        }
        height:0;
        width:100%;
        overflow:hidden;
        .loadmove-top-content{
            justify-content: center;
            align-items: center;
            height:100px;
            width:100%;
            bottom:0;
            span.icon.iconfont{
                transform: rotate(180deg)
            }
            span.icon.animate{
                transition: all 0.3s;
                transform: rotate(0deg);
            }
        }
    }
    ul{
        overflow:scroll;
    }
    .loadmove-box{
        // position:fixed;
        top:0;
        width:100%;
        height:100%;
        overflow-y:scroll;
        overflow-x:hidden;
    }
</style>

