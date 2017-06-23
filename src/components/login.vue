<template>
  <div>
    <div class="header_container">
			<div class="header">
				<div class="header_left">
					<span class="header_left_f">省级清分结算系统</span><br />
					<span class="header_left_s">Clearing settlement system</span>
				</div>
			</div>
		</div>
		<div class="content_container">
			<div class="content">
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
								<Input type="password" v-model="formCustom.passwd" placeholder="密码" >
									<Icon type="locked" slot="prepend"></Icon>
								</Input>
							</Form-item>
							<Form-item :label-width="0">
								<Button type="primary" @click="handleSubmit('formCustom')" long :loading="loading">登录</Button>
							</Form-item>
						</Form>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<style scoped>

.header_container {
	top:0;
	width: 100%;
	height:100px;
	background: #4E85CC;
	color: #fff;
	overflow: hidden;
}
.header {
	margin:10px auto;
}
.header_left {
	width: 520px;
	float: left;
	padding-left: 97px;
}
.header_left_f {
	font-size:24px;
	height: 16px !important;
	display: block;
}
.header_left_s {
	font-size: 16px;
	color:#B3C3E4;
	height: 24px !important;
	margin-top: 6px;
	display: block;
}
/*content style*/
.content_container {
	width: 100%;
	overflow: hidden;
}
.content {
	width: 940px;
	height: 390px;
	margin: 0px auto;
    margin-top:90px;
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
	padding-bottom:30px;
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
.input_container {
	margin: 30px 0;
	width: 335px;
	font-size: 14px;
}
.input_user {
	margin-top: 35px;
}
.input_container input {
	width: 335px;
	padding-left: 35px;
	height: 40px;
	line-height: 40px;
	border: 1px solid #E7E7E7;
}
.input_container input:focus {
	border: 1px solid #5189D3;	
}

.login_button {
	width: 100%;
	height: 50px;
	font-size:18px;
	color: #FFFFFF;
	text-align: center;
	line-height: 50px;
	cursor:pointer;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	margin-top: 35px;
	letter-spacing: 3px;
	overflow: hidden;
}
.login_button input {
	color: #fff;
	width: 100%;
	height: 100%;
	display: block;
	font-size: 18px;
	border: 0px;
	text-align: center;	
	cursor: pointer;
}
.login_button input:hover {
	background: #4B8BDB;
}
.login_button input:active {
	background: #4B8BDB;
}
/*footer style*/
.footer{
	width: 100%;
	height:130px;
	background: #4E85CC;
	color: #fff;
}
.footer p{
	width: 100%;
	font-size:14px;
	text-align: center;
	line-height: 130px;
}

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


