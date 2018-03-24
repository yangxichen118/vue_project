<template>
  <div>
    <header class="header container">
      <h1 class="logo"><a href="index.html" class="link"></a></h1>
      <div class="h_con">
        <ul class="clearfloat">
          <li class="phone">4000-585-116</li>
          <li><a href="#">中文</a></li>
          <li><em>|</em></li>
          <li><a href="#">English</a></li>
          <li><a href="#" class="weixin"></a></li>
          <li><a href="#" class="weibo"></a></li>
          <li><router-link to="/login"  class="h_login">登录</router-link></li>
          <li><em>|</em></li>
          <li><router-link to="/register" class="h_register">注册</router-link></li>
          <li class="top_user"><a href="">admin</a></li>
          <li class="top_quit"><a href="">退出</a></li>
        </ul>
        <div class="search clearfloat">
          <button type="button"></button>
          <input type="text"/>
        </div>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="container">
        <div class="nav">
          <ul>
            <li><router-link to="/"><span class="icon_home"></span>首页</router-link></li>
            <li><router-link to="/about">关于净美仕</router-link></li>
            <li><router-link to="/news" >公司动态</router-link></li>
            <li class="nav_pd">
              <router-link to="/product" >产品中心<span class="icon_pd"></span></router-link>
              <div class="pd_dropdown">
                <a @click="loadPager(1,1)">净美仕净化器</a>
                <a @click="loadPager(1,2)">净美仕滤网</a>
              </div>
            </li>
            <li><router-link to="/contact">联系我们</router-link></li>
          </ul>
        </div>
        <div class="s_cart">
          <a href="cart.html">
            <span class="icon_cart"></span>购物车(<strong id="cart_sum">0</strong>)<span class="icon_sj"></span>
          </a>
          <div class="cart_dropdown">
            <!--<h3>您的购物车为空~</h3>-->
            <ul>
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
            </ul>
            <div class="cd_js clearfloat">
              <span>共计：<strong>0.00</strong></span>
              <a href="#">结算</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods:{
    loadPager: function (num, type) {
      var url = 'http://127.0.0.1:8888/product/select?pageNum=' + num + '&type=' + type;
      this.$http.get(url).then(function (res) {
        this.pager = res.body;
        console.log(this.pager);
        this.pno = this.pager.pageNum;
        this.pager.data = res.body.data;
        this.pageCount=res.body.pageCount;



      })
  }
},
  watch:{
    pageCount:function () {

    }
  }

}
</script>

<style scoped>
</style>
