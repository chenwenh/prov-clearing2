<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import request from 'superagent';
  export default{
    name:'app',
    mounted:function(){
        let vm=this;
       // 验证是否登录
        window.onload = function(){
          vm.checkLogin();
        }.bind(this)
    },
    methods:{
       checkLogin(){
          let vm=this;    
          request
          .get(`/prov-tucs-contr/login/isLogin`)
          .accept('json')
          .end(function(err, res){
              if (err) {
                  console.log(err);
                  vm.$router.push('/login')
              } 
              else if(res.body.result=='logged'){
                  vm.$router.push('/mainPage')
              }
              else if(res.body.result=='unlogin'){
                  vm.$router.push('/login')
              }
          }); 
       }
     }
  }
</script>
<style scoped>
  #app{
    height:100%;
  }
</style>