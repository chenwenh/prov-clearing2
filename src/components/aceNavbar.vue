<template>
    <div>
        <header id="header">        
            <div class="brand">
                <span style="font-size:16px;color:white;font-weight:bold;">省级清分结算系统</span>
            </div>
            <!--<div class="toggle-navigation toggle-left">
                <button type="button" class="btn btn-default" id="toggle-left" data-toggle="tooltip" data-placement="right" title="左侧导航栏隐藏或展开">
                    <Icon type="navicon-round"></Icon>
                </button>
            </div> -->
            <div class="user-nav">
                <span style="color:white;font-size:14px;">{{userName+'('+roleName+')'}}</span>
                <ul style="display:inline-block;">
                    <li class="dropdown settings">
                        <span  href="#" @click="shows">
                            <Icon type="locked" ></Icon>  修改密码
                        </span>
                    </li>
                    <li class="dropdown settings">
                        <span href="#" @click="exit">
                            <Icon type="power"></Icon>  退出系统
                        </span>
                    </li>
                </ul>
            </div>
        </header>
        <Modal v-model="modal" width="460"  :mask-closable="false"  :closable="false">
            <p slot="header" >
                <Icon type="information-circled" @click="close()"></Icon>
                <span>修改密码</span>
            </p>
            <div style="text-align:center">
                <Form ref=formCustom :model="formCustom" :rules="ruleCustom" :label-width="80">
                    <Form-item label="原密码" prop="before">
                        <Input type="password" v-model="formCustom.before"></Input>
                    </Form-item>
                    <Form-item label="新密码" prop="passwd">
                        <Input type="password" v-model="formCustom.passwd"></Input>
                    </Form-item>
                    <Form-item label="确认密码" prop="passwdCheck">
                        <Input type="password" v-model="formCustom.passwdCheck"></Input>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <span @click="close()" style="cursor:pointer;margin-right:20px;">取消</span>
                <Button type="info"   :loading="loading" @click="handleSubmit()">确认</Button>
            </div>
        </Modal>
    </div>
</template>
<style scoped>
#header {
    min-height:40px;
    min-width:830px;
    background:#3c8dbc;
    z-index: 200;
    background: #3c8dbc;
    line-height:40px;
}

#header .brand {
    float: left;
    width: 260px;
    height: 40px;
    position: relative;
    background: #367fa9  no-repeat;
    text-align:center;
}

#header .logo {
    color: #fff;
    font-size: 1.4em;
    text-transform: uppercase;
    line-height:40px;
    display: inline-block
}

#header .logo span {
    font-weight: 700
}

#header .toggle-navigation.toggle-left {
    margin:0 0 0 20px;
    display: inline-block
}

#header .btn-default {
    padding: 3px 9px;
    background: #F6F6F6;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-bottom:2px;
}

#header .btn-default .fa-bars,#header .btn-default .fa-comment {
    cursor: pointer;
    color: #797979
}

#header .user-nav {
    float: right;
    padding-right: 20px;
    background: #3c8dbc;
    padding-left: 42px;
    height:40px;
    line-height:40px;
}
#header .user-nav span{
    display:inline-block;
    height:40px;
    line-height:40px;
    color:white;
    cursor: pointer;
}
#header .user-nav li:hover{
    background:#367fa9;
    color:white;
}
#header .user-nav li:hover a{
    color:white;
}
#leftside-navigation ul ul li{
    text-indent:33px;
}
.user-nav a{
    display:inline-block;
    line-height: 40px;
    padding:0 10px;
}
.ivu-modal-footer span{
    font-size:14px;
}
.ivu-modal-footer span:hover{
    color:#2db7f5;
}
.user-nav ul li {
    display: inline-block;
    vertical-align: middle;
    font-size: 15px;
    height:40px;
    line-height:40px;
}

.user-nav ul li .profile-photo {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle
}

.user-nav ul li.dropdown.messages .dropdown-menu {
    width: 350px
}

.user-nav ul li.dropdown.settings .dropdown-menu {
    width: 125px
}
.messages .badge {
    position: absolute;
    top: -10px;
    left: -5px
}

.options i {
    color: #797979;
    font-size: 1.1em
}
.user-nav ul li.dropdown.settings {
    line-height: 40px;
    margin-right: 10px;
    padding: 0 10px;
    margin-bottom:4px;
}
.user-nav ul li.dropdown.settings .dropdown-menu>li>span {
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 4px;
    margin:0 10px;
}

@media only screen and (max-width: 700px) {
     #header .user-nav{
        width:100%;
    }
}

@media only screen and (max-width: 479px) {
    #main-content .h1 {
        font-size:22px
    }

    #header .dropdown.messages {
        display: none
    }
}
</style>
<script>
    import request from 'superagent';   
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    if(value==this.formCustom.before){
                         callback(new Error('新密码不可以和原密码相同!'));
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback(
                        
                    );
                }
            };
            const validateBefore = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('原密码不能为空'));
                }
                else{
                    callback();
                }
            };
            return {
                modal:false,
                show:false,
                loading:false,
                formCustom: {
                    passwd: '',
                    passwdCheck: '',
                    before:'',
                },
                userName:'',
                roleName:'',
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                     before: [
                        { validator: validateBefore, trigger: 'blur' }
                    ]
                }
            }
        },
        created:function(){
            var vm = this;
           //获取机构列表信息
             request
                .post(`/prov-tucs-contr/user/getCurrentUserStatus`)
                .accept('json')
                .end(function(err, res){
                    if (err) {
                        console.log(err);
                    } 
                    else{
                        // console.log(res.body.bean);
                        vm.userName=res.body.bean.userName;
                        vm.roleName=res.body.bean.roleName;
                    }
                });
            
        },
        methods: {
            handleSubmit () {
                let vm=this;
                vm.loading=true;
                vm.$refs['formCustom'].validate((valid) => {
                    if (valid) {
                        request
                            .post(`/prov-tucs-contr/user/editPassword?before=${vm.formCustom.before}&&passwd=${vm.formCustom.passwd}`)
                            .accept('json')
                            .end(function(err, res){
                                if (err) {
                                    console.log(err);
                                } 
                                else if(res.body.result==true){
                                    vm.$Message.success('修改成功!');
                                    vm.close();
                                }
                                else if(res.body.result==false){
                                    vm.$Message.error('原密码错误或修改失败');
                                }
                                vm.loading=false;
                            }); 
                    } else {
                        vm.$Message.config({
                            top: 200,
                        });
                        vm.$Message.warning('请检查所填写的信息!');
                        vm.loading=false;
                    }
                })
            },
            drag(){
                var oDrag=document.getElementsByClassName('.ivu-modal-header')[0];
                var box=document.getElementsByClassName('.ivu-modal-content')[0];
                oDrag.onmousedown=function (ev)
                {
                    var oEvent=ev||event;
                    var disX=oEvent.clientX-box.offsetLeft;//x坐标
                    var disY=oEvent.clientY-box.offsetTop;//y坐标
                    
                    document.onmousemove=function (ev)
                    {
                        var oEvent=ev||event;
                        var l=oEvent.clientX-disX;//移动x坐标位置
                        var t=oEvent.clientY-disY;//移动y坐标位置
                        //限制范围
                        if(l<0)
                        {
                            l=0;
                        }
                        else if(l>document.documentElement.clientWidth-box.offsetWidth)
                        {
                            l=document.documentElement.clientWidth-box.offsetWidth;
                        }
                        
                        if(t<0)
                        {
                            t=0;
                        }
                        else if(t>document.documentElement.clientHeight-box.offsetHeight)
                        {
                            t=document.documentElement.clientHeight-box.offsetHeight;
                        }
                        
                        box.style.left=l+'px';
                        box.style.top=t+'px';
                    };
                    
                    document.onmouseup=function ()
                    {
                        document.onmousemove=null;
                        document.onmouseup=null;
                    };
                }
            },
            shows(){
                let vm=this;
                vm.drag();
                vm.modal=true;
            },
            close(){
                let vm=this;
                vm.modal=false;
                vm.$refs['formCustom'].resetFields(); 
                console.log(vm.formCustom);
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
                            window.location.href='/index.html'
                        }
                    }); 
            }
        },
        components:{
            
        }
    }
</script>
