<template>
    <div>
         <a @click="tiao()">第二个页面</a>
         <a @click="exit()">退出</a>
    </div>
</template>
<script>
    import request from 'superagent';
    export default{
        data(){
            return{

            }
        },
        methods:{
            tiao(){
                this.$router.push('/login')
            },
             exit(){
                let vm=this;
                request
                .get(`/prov-tucs-contr/login/logOut`)
                .accept('json')
                .end(function(err, res){
                    if (err) {
                        console.log(err);
                    } 
                    else if(res.body.result=='userLogOut'){
                         vm.$router.push('/login')
                    }
                }); 
            }
        }
    }
</script>
<style></style>