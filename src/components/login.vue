<template>
<div id="box"> 
	<div id="header">
		<div class="header_left">
			<p class="header_left_f">省级清分结算系统</p>
			<p class="header_left_s">Clearing settlement system</p>
		</div>
	</div> 
	<div id="main"> 
		<div id="wrap"> 
			<div id="text"> 
				<div class="content_img">
					<img src="./../assets/images/login/login_content.png" alt="" />
				</div>
				<div class="content_right_container">
					<div class="login_title">用户登录</div>
					<div class="content_right">
						<Form ref=formCustom :model="formCustom" :rules="ruleCustom" >
							<Form-item prop="insCode">
								<Input type="text" v-model="formCustom.insCode" placeholder="机构号">
									<Icon type="ios-home" slot="prepend"></Icon>
								</Input>
							</Form-item>
							<Form-item prop="user">
								<Input type="text" v-model="formCustom.user" placeholder="用户名">
									<Icon type="person" slot="prepend"></Icon>
								</Input>
							</Form-item>
							<Form-item prop="passwd" @keyup.enter="onEnter">
								<Input type="password" v-model="formCustom.passwd" placeholder="密码" @keyup.enter="onEnter()">
									<Icon type="locked" slot="prepend"></Icon>
								</Input>
							</Form-item>
							<Form-item :label-width="0">
								<Button type="primary" @click="handleSubmit('formCustom')" long :loading="loading">登 录</Button>
							</Form-item>
						</Form>
					</div>
				</div>
			</div> 
		</div> 
	</div> 
	<div id="footer">footer</div> 
</div> 
</template>
<style scoped>
	#box { 
height:100%; 
} 
body { 
text-align:center; 
} 
#box { 
text-align:left; 
background:#666; 
display:table; 
width:100%; 
margin:0 auto; 
position:relative; 
} 
i{font-size:16px;}
#box > div { 
display:table-row; 
} 
.header_left {
	width: 520px;
	float: left;
	padding-left: 97px;
}
.header_left_f {
	font-size:24px;
	height:60px;
	line-height:60px;
}
.header_left_s {
	font-size: 16px;
	height:30px;
	color:#B3C3E4;
}
#header{
	height:100px;
	background: #4E85CC;
	color:white;
} 
#footer{
	height:150px;
	color:white;
	background:white;
}
#main { 
background:#fff; 
vertical-align: middle;
} 
#main #wrap { 
display:table-cell; 
vertical-align:middle;
} 
#text {
width:1000px;
margin:0 auto;
min-height: 400px;
vertical-align: middle;
padding-left:10px;
padding-right:10px;
} 
.content_img {
	display: block;
	float: left;
	width: 390px;
}
.content_img img {
	width: 390px;
	height:315px;
	margin-top: 32px;
}
.content_right_container {
	width: 380px;
	padding-bottom:20px;
	margin-top:50px;
	float: right;
	background: #fff;
	-webkit-box-shadow:2px 6px 8px #292929;
	-moz-box-shadow:2px 6px 8px #292929;
	box-shadow:0 6px 26px #C1D8E5, 0 0  #C1D8E5;
}
.content_right {
	width: 335px;
	margin:0 auto;
	margin-top:20px;	
}
.login_title {
	height:50px ;
	width: 100%;
	line-height: 50px;
	color: #fff;
	text-indent: 20px;
	font-size:14px;
	background: url(./../assets/images/login/logo_content_header.jpg);
	-webkit-box-shadow:2px 6px 8px #292929;
	-moz-box-shadow:2px 6px 8px #292929;
	box-shadow:2px 6px 8px #A9ABAE;
	background-size: cover;
}
/*[if IE]> 
#header, 
#footer { 
width:100%; 
z-index:3; 
position:absolute; 
} 
#footer { 
bottom:0; 
} 
#main { 
height:100%; 
z-index:1; 
position:relative; 
} 
#main #wrap { 
position:absolute; 
top:50%; 
width:100%; 
text-align:left; 
} 
#main #text { 
position:relative; 
width:100%; 
top:-50%; 
background:#ccc; 
} 
[endif]*/
</style>
<script>
import request from 'superagent';
	export default{
		data(){
			const validateInsCode = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入机构号'));
				} else {
					callback();
				}
			};
			const validateUser = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			const validatePasswd = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return{
				loading:false,
				formCustom:{
					insCode:'',
					user:'',
					passwd:'',
				},
				ruleCustom: {
					insCode: [
						{ validator: validateInsCode, trigger: 'blur' }
					],
					user: [
						{ validator: validateUser, trigger: 'blur' }
					],
					passwd: [
						{ validator: validatePasswd, trigger: 'blur' }
					],
       			 }
			}
		},
		methods:{
			onEnter(){
				this.handleSubmit('formCustom');
			},
			reset(){
				this.$refs['formCustom'].resetFields();
			},
			handleSubmit (name) {
				this.loading=true;
				this.$refs[name].validate((valid) => {
				if (valid) {
					let vm=this;
					let param=vm.formCustom;
					request
					.get(`/prov-tucs-contr/login/authenticate`)
					.accept('json')
					.query(param)
					.end(function(err, res){
					if (err) {
						console.log(err);
					} 
					else if(res.body.result=='usererror'){
						vm.$Message.error('登录失败!');
					}
					else if(res.body.result=='locked'){
						vm.$Message.error('被锁定!');
					}
					else if(res.body.result=='disabled'){
						vm.$Message.error('已经停用!');
					}
					else if(res.body.result=='noperm'){
						vm.$Message.error('无权限!');
					}
					else if(res.body.result=='roledisabled'){
						vm.$Message.error('用户所属角色已停用!');
					}
					else if(res.body.result=='success'){
						vm.$router.push('/mainPage')
						vm.reset();
					}
					vm.loading=false;
				}); 
				} else {
					this.$Message.error('请检查机构号、用户名和密码!');
					this.loading=false;	
				}
				})
     	 	},
		},		
	}
</script>


