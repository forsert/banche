<template>
    <div id="box">
        {{a}}
        <div class='right-content'></div>
    </div>
</template>
<script>
// import '../less/index.less'
export default {
    data(){
        return {
           a: 123
        }
    }
}
</script>
<style lang=less scoped>
    html{
        font-size:10vh;
        div{
            color:red;
        }
    }
</style>




