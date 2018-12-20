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
                <span class="icon iconfont">&#xe62d;</span>
                <span>下拉可以刷新</span>
                <!-- <span>正在刷新数据</span>
                <span>松开可以刷新</span> -->
            </div>
        </div>
        <slot></slot>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
            <li>21</li>
            <li>22</li>
            <li>23</li>
            <li>24</li>
            <li>25</li>
            <li>26</li>
            <li>27</li>
            <li>28</li>
            <li>29</li>
            <li>30</li>
            <li>31</li>
            <li>32</li>
            <li>33</li>
            <li>34</li>
            <li>35</li>
            <li>36</li>
            <li>37</li>
            <li>38</li>
            <li>39</li>
            <li>40</li>
            <li>41</li>
            <li>42</li>
            <li>43</li>
            <li>44</li>
            <li>45</li>
            <li>46</li>
            <li>47</li>
            <li>48</li>
            <li>49</li>
            <li>50</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
            <li>21</li>
            <li>22</li>
            <li>23</li>
            <li>24</li>
            <li>25</li>
            <li>26</li>
            <li>27</li>
            <li>28</li>
            <li>29</li>
            <li>30</li>
            <li>31</li>
            <li>32</li>
            <li>33</li>
            <li>34</li>
            <li>35</li>
            <li>36</li>
            <li>37</li>
            <li>38</li>
            <li>39</li>
            <li>40</li>
            <li>41</li>
            <li>42</li>
            <li>43</li>
            <li>44</li>
            <li>45</li>
            <li>46</li>
            <li>47</li>
            <li>48</li>
            <li>49</li>
            <li>50</li>
        </ul>
        <div class="loademove-footer-box">
            <div class="flex">
                <img src="https://pic.bianla.cn/bianlaAPI/common/img/ajax-loader.gif" class='ajax-loader' alt="">
                <span>正在加载</span>
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
            loadBottomLoading:true
        }
    },
    methods:{
        scroll(){
            if(!this.loadBottomLoading){return}
            if(this.$refs.move.scrollHeight-this.$refs.move.scrollTop-this.$refs.move.offsetHeight<150){
                this.loadBottomLoading = false;
                this.$emit("loadBottom",()=>{
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
            if(!this.isTouch){ ev.preventDefault();return}
            // this.touchY = ev.touches[0].clientY;
            var touchY = ev.touches[0].clientY - this.touchY;
            if(this.$refs.move.scrollTop<=0 && ev.touches[0].clientY-this.touchY>0){
                ev.preventDefault();
                var number = touchY-this.startScrollTop;
                this.scroHeight = number/3;
                this.$refs.loadTop.style.cssText = `height:${number/3}px`;
            }
        },
        touchend(ev){
            var _self = this;
            if(!this.isTouch){return};
            this.isTouch = false;
            this.$refs.loadTop.classList.add("animate");
            if(this.scroHeight>=this.triggerLine){
                this.$refs.loadTop.style.height = this.$refs.loadHeight.offsetHeight+"px";
                this.$emit("loadTop",()=>{
                    this.$refs.loadTop.style.height = 0;
                    setTimeout(()=>{
                        this.$refs.loadTop.classList.remove("animate");
                        this.isTouch = true;
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

