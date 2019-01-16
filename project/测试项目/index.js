function Seer (dataObj) {
    // 定义一个控对象
    let signals = {}
    
    // 观察数据
    observeData(dataObj)
  
    // 除了响应式的数据对象，我们也需要返回并且暴露出 observe 和 notify 函数。
    return {
      data: dataObj,
      observe,
      notify
    }
    // 观察
    function observe (property, signalHandler) {
      if(!signals[property]) signals[property] = []
      signals[property].push(signalHandler)
    }
    //通知
    function notify (signal) {
      if(!signals[signal] || signals[signal].length < 1) return
      signals[signal].forEach((signalHandler) => signalHandler())
    }
  
    function makeReactive (obj, key) {
      let val = obj[key]
  
      Object.defineProperty(obj, key, {
        get () {
          return val
        },
        set (newVal) {
          val = newVal;
          notify(key)
        }
      })
    }
  
    function observeData (obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          makeReactive(obj, key)
        }
      }
    }
}


function observeData(obj){
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            makeReactive(obj,key)
        }
    }
}

function makeReactive(obj,key){
    let val = obj[key];
    Object.defineProperty(obj,key,{
        get(){
            return val
        },
        set(newVal){
            val = newVal;
            console.log(6639)
        }
    })
}