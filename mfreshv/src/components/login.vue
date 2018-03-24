<template>
  <!--页面主体-->
  <div class="login_box login_box_bottom">
    <div class="container">
      <div class="login">
        <h2>用户登录</h2>
        <dl class="clearfloat">
          <dt><span :class="{'tips':isNula}" id="uname_prompt_text" v-show="isNula">{{uname_prompt_text}}</span>用户名：</dt>
          <dd>
            <input v-model="uname" @blur="unameCheck()"
                   type="text" id="uname" placeholder="邮箱/手机号"/>
            <em class="icon_user"></em>
            <i :class="{'icon_error':isNula}" id="uname_prompt_icon" v-show="isNula"></i>
          </dd>
        </dl>
        <dl>
          <dt><span :class="{'tips':isNulb}" id="pwd_prompt_text" v-show="isNulb">请输入密码</span>密码：</dt>
          <dd>
            <input v-model="upwd" @blur="upwdCheck()" type="password" id="pwd" placeholder="密码"/>
            <em class="icon_pwd"></em>
            <i :class="{'icon_error':isNulb}" id="pwd_prompt_icon" v-show="isNulb" ></i>
          </dd>
        </dl>
        <p>

          <input type="checkbox"/>
          <span>自动登录</span>

        </p>
        <button type="button" id="login" @click="goLogin()">立 即 登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
      data:function () {
        return {
          uname:'',
          upwd:'',
          $uname_prompt_icon:null,
          $uname_prompt_icon:'',
          $uname_prompt_text:null,
          uname_prompt_text:'',
          isNula:false,
          isNulb:false,
          rname:null,
          rpwd:null,





        }
      },
      methods:{
        unameCheck(){
          // this.uname= $.trim($("#uname").val());
          if(!this.uname){//用户名为空的时候
            // this.$uname_prompt_text.show().text("用户名不能为空");
            // this.$uname_prompt_icon.show();
            this.uname_prompt_text='用户名不能为空';
            console.log(0);
            this.isNula=true;
            return true;
          }else{
            this.isNula=false;
            return false;

          }
        },
        upwdCheck(){
          // this.uname= $.trim($("#uname").val());
          if(!this.upwd){//用户名为空的时候
            // this.$uname_prompt_text.show().text("用户名不能为空");
            // this.$uname_prompt_icon.show();
            this.isNulb=true;
            return true;
          }else{
            this.isNulb=false;
            return false;
          }
        },
        goLogin(){
          this.rname=this.unameCheck();
          this.rpwd=this.upwdCheck();
          // console.log(this.rname);
          // console.log(this.rpwd);



          if(!this.rname&&!this.rpwd){
            var url = `http://127.0.0.1:8889/user/register?uname=${this.uname}&upwd=${this.upwd}`;
            this.$http.get(url).then( function (res){
              console.log(res.body);
              if(res.body.code==1){
                sessionStorage.uid= res.body.uid;
                sessionStorage.uname= res.body.uname;
                history.go(-1);
                console.log(111);
              }

            })

          }
          console.log('这是 gologion');
        }

      },
      mounted:function () {
        this.uname= $.trim($("#uname").val());
        this.upwd= $.trim($("#pwd").val());
        this.$uname_prompt_text=$('#uname_prompt_text');
        this.$uname_prompt_icon=$('#uname_prompt_icon');
        this.uname_prompt_text=$('#uname_prompt_text').text();
      }

    }
</script>

<style scoped>
  .login_box_bottom{
    margin-bottom: 0;
  }
  .tips,.icon_error{
    display: inline-block;
  }


</style>
