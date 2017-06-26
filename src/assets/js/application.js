var app = function() {
    var e = function() {
        t(),
        o(),
        l(),
        i()
    }
      , t = function() {
        $("#toggle-left").tooltip();
    }
      , o = function() {
        $("#toggle-left").bind("click", function(e) {
            $(".sidebar").toggleClass("sidebar-toggle");
            $(".main-content-wrapper").toggleClass("main-content-toggle-left");
            e.stopPropagation();
        })
    }
      , l = function() {
        $(document).on('click','#leftside-navigation .sub-menu > a',function(e) {
            $("#leftside-navigation ul ul").slideUp();
            $(this).next().is(":visible") || $(this).next().slideDown();
            if($(this).children('.ivu-icon-chevron-down').length==1){
                $(this).children('.ivu-icon-chevron-down').removeClass('ivu-icon-chevron-down').addClass('ivu-icon-chevron-up');
                $(this).parent().siblings().find('.ivu-icon-chevron-up').removeClass('ivu-icon-chevron-up').addClass('ivu-icon-chevron-down');
            }
            else{
                $(this).children('.ivu-icon-chevron-up').removeClass('ivu-icon-chevron-up').addClass('ivu-icon-chevron-down');
            }
            e.stopPropagation();
        })
      }
      ,i=function(){
        //左侧导航点击时效果
        $(document).on('click','#leftside-navigation ul ul li',function(){
            $(this).parent().prev().addClass('hover');
            $(this).parent().prev().
            parent('li').siblings().children('a').removeClass('hover');
            $(this).parent().prev().parent('li').siblings().children('a').next('ul').find('li').removeClass('hover active');
            $(this).addClass('hover active').siblings().removeClass('hover active');
        });
    }
    return {
        init: e
    }
}();
$(document).ready(function() {
    app.init();
    resize();
    //控制左侧导航条背景的高度和右侧内容区域的高度。
    function resize(){
        $('#main-content .contents').css({"min-height":$(window).height()-$('.pagess').height()-80+'px'});       
        $('.layer .content').css({
        "max-height":$(window).height()-$('.layer .header').height()-$('.layer .footer').height()-42+'px'
        });
        $('.boxContainer').css({"height":$(window).height()-$('.pagess ul').height()-55+'px',"overflow":"auto"});
        $('.sidebar').css({"min-height":$(window).height()-40+'px',"height":$('#main-content').height()+'px'});
    }

    window.onresize=function(){
        resize();
    }   
    
    //当窗口很小时点击左侧的菜单之后自动的缩回去然后右侧出现对应的内容。  
   $(document).on('click','.sidebar-toggle ul li ul li a',function(){
        $('#toggle-left').click();
   }); 
});