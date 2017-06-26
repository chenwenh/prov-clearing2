<template>
  <section id="container">
        <ace-navbar></ace-navbar><!--顶部-->
        <aside class="sidebar">
            <div id="leftside-navigation" class="nano">
                <ul class="nano-content">
                    <li class="sub-menu" v-for="item in items">
                        <a href="javascript:void(0);" v-bind:class="item.class">
                            <Icon :type="item.type"></Icon><span>{{item.head}}</span><Icon type="chevron-down" style="float:right;transition:all 1s;transform-origin:40% 50%;"></Icon>
                        </a>
                        <ul>
                            <li v-for="labels in item.children" v-bind:class="labels.class"><router-link to="{labels.href}"  @click="add(labels.label,labels.href)">{{labels.label}}</router-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside><!--左侧导航-->
        <section class="main-content-wrapper">
          <section id="main-content">
            <div class="contents">
                <div class="pagess">
                    <ul>
                      <li v-for="item in itemss" class="active" @click="toggleClass($index)">
                          <router-link to="{item.href}" :titles="item.href">{{item.value}}</router-link><Icon type="close" @click="close($index)" style="margin-right:4px;cursor:pointer;padding-left:4px;padding-top:8px;padding-bottom:8px;"></Icon>
                      </li>
                    </ul>
                </div>
                <div class="boxContainer">
                   <div>
                       <div class="box">
                       <router-view></router-view>
                       </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
    <!--右侧路由对应的内容-->
    </section>
</template>
<style>
   .ivu-icon-chevron-down{
        float:right;
    }
    .ivu-icon-chevron-up{
        float:right;
    }
    .ivu-table td, .ivu-table th{
        height:35px;
    }  
    .pagess{
      margin-top:10px;
    }
    .pagess ul{
      position:relative;
      bottom:-1px;
      overflow:hidden;
      border-left:1px solid #ccc;
    }    
     .pagess ul li{       
         background:#F9F9F9;
         float:left;
         border:1px solid #ccc;
         border-left:none;
     }
     .pagess ul li a{
        padding:5px 15px;
        color:#999;
        display:inline-block;
     }
     .pagess ul li a:hover{
       color:#3c8dbc;
       background:white;
     }
     .pagess ul li.active{
       border-bottom:none;
       background:white;
       color:black;
       border-top:2px solid #4c8fbd;
       margin-bottom:-1px;
       border-bottom:1px solid white;
       box-shadow: 0 -2px 3px 0 rgba(0,0,0,.15);
     }
     #whiteList{
       padding-top:10px;
     }
     .pagess ul li.active a{
         color:#3c8dbc;
         font-weight:bold;
     }
</style>
<script>
import './../assets/css/main.css'  
import './../assets/plugins/bootstrap/js/bootstrap.min.js'
import './../assets/js/application.js'
import aceNavbar from './aceNavbar';
import request from 'superagent';
import $ from 'jquery';
 export default {
   
        data(){
            return{
              itemss:[
                  {value:'首页',href:'/info'}
              ],
              items:[
                 
              ],
            }
        },
        mounted:function(){   
           let vm=this;
           this.$Notice.config({
                top: 100,
                duration: 3
            });
           this.$Notice.info({
                title: '登录成功',
                desc:'欢迎进入省级清分结算系统'
            });
           $('.pagess ul li:first').children('i').remove();
           $('.sidebar').css({"height":$(window).height()-42+'px'});
           request
                .get(`prov-tucs-contr/menu/getMenuList`)
                .accept('json')
                .end(function(err, res){
                    if (err) {
                        console.log(err);
                    } 
                    else{
                        vm.items=res.body.result;
                    }
                }); 
        },
        components:{
          aceNavbar,
        },
        methods:{
        //点击左侧的导航时显示打开的窗口，并且不能超过12个。
          add(label,href){
            let vm=this;
            var label=label;
            var href=href;
            var count=vm.itemss.length;
            var numbers=0;
            if(count>=13){
                for(var i=0;i<count;i++){
                    if(vm.itemss[i].value==label){
                        numbers++;
                    }
                } 
                if(numbers>0){
                   //有匹配上的，说明已经打开过
                   var currentIndex=$('.pagess ul li a[titles="'+href+'"]').parent('li').index();//获取左侧点击的对应打开窗口的索引值。
                    setTimeout(function(){
                        vm.toggleClass(currentIndex);
                    },0);//控制颜色改变。
                    //内容显示对应的。
                    vm.$router.go(href);
                }
                else{
                    vm.$Modal.warning({
                        content: '最多只能打开12个标签页'
                    });
                    var paths=$('.pagess ul li.active').children('a').attr('titles');//当已经打开了12个窗口时仍然显示当前打开的窗口。
                    setTimeout(function(){
                        vm.$router.go(paths);
                    },0);
                }
            }
            else{
                vm.itemss.push({
                    value:label,
                    href:href
                });
                setTimeout(function(){
                    $('.boxContainer').css({"height":$(window).height()-$('.pagess ul').height()-60+'px',"overflow":"auto"});
                },0);
                for(var i=0;i<count;i++){
                    if(vm.itemss[i].value==label){
                        numbers++;
                    }
                } 
                if(numbers>0){
                    var currentIndex=$('.pagess ul li a[titles="'+href+'"]').parent('li').index();//获取左侧点击的对应打开窗口的索引值。
                    setTimeout(function(){
                        vm.toggleClass(currentIndex);
                    },0);//控制颜色改变。
                    //内容显示对应的。
                    vm.$router.go(href);
                    var length=vm.itemss.length;
                    vm.itemss.splice(length-1,1);
                }
                else{
                    $('.pagess ul li').removeClass('active');
                    vm.$router.go(href);   
                }
            }           
          },
          //窗口关闭时颜色和对应路由的切换。
          close(index,path){
            let vm=this;
            vm.itemss.splice(index,1);
            setTimeout(function(){
                $('.boxContainer').css({"height":$(window).height()-$('.pagess ul').height()-60+'px',"overflow":"auto"});
            },0);
            var length=vm.itemss.length;
            if(index==length){
              if($('.pagess ul li').eq(index).hasClass('active')){
                 // console.log('删除最后一个时并且有active时');
                  $('.pagess ul li').eq(length-1).addClass('active').siblings().removeClass('active');
                  var paths=$('.pagess ul li.active').children('a').attr('titles');
                  this.$router.go(paths);
              } 
              else{
                  //console.log('删除最后一个时并且没有active时');
                  vm.itemss.splice(index,1);
              }
            }
            else{
              if($('.pagess ul li').eq(index).hasClass('active')){
                 // console.log('删除不是最后一个并且有active');
                  var paths=$('.pagess ul li:last').children('a').attr('titles');
                  this.$router.go(paths);
                  $('.pagess ul li:last').addClass('active').siblings().removeClass('active');
              }
              else{
                  //console.log('删除不是最后一个并且没有active');
              }
            }
          },
          //打开窗口之间颜色的切换。
          toggleClass(index){
            $('.pagess ul li').eq(index).addClass('active').siblings().removeClass('active');
          },
          //修改浏览器中的链接的，暂时没有用到。
          transfer(href){
            let vm=this;
            var address=window.document.location.href;
            var index= address.lastIndexOf('/');
            var rep=address.slice(index);
            var newAddress=address.replace(rep,href);
          },
        },
  }
</script>

