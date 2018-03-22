<template>
    <div>
      <!--面包屑导航-->
      <div class="breadcrumb">
        <div class="container">
          <h2>
            <a href="">首页</a>&gt;<a href="">产品中心</a>
          </h2>
        </div>
      </div>
      <!--页面主体-->
      <div class="main container">
        <div class="pl_header">
          <a  @click="changeType(1)" @click.prevent="loadPager(1,1)" :class="{'cur':type==1}" class="jing">净美仕净化器</a>
          <a @click="changeType(2)" @click.prevent="loadPager(1,2)" :class="{'cur':type==2}" class="lv">净美仕滤网</a>
        </div>
        <!-- 产品列表-->
        <ul class="product_list clearfloat">
          <li v-for="(item,i) in pager.data">
            <a href=""><img :src="item.pic"/></a>
            <div class="pdlist_text clearfloat">
              <h3>
                <p>{{item.model}}</p>
                <span>{{item.title2}}</span>
              </h3>
              <router-link :to="'/product_detail/'+item.pid">查看详情</router-link>
            </div>
          </li>
          <!--<li>-->
          <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
          <!--<div class="pdlist_text clearfloat">-->
          <!--<h3>-->
          <!--<p>M-8088A</p>-->
          <!--<span>带“大脑”的空气净化器</span>-->
          <!--</h3>-->
          <!--<a href="">查看详情</a>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li>-->
          <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
          <!--<div class="pdlist_text clearfloat">-->
          <!--<h3>-->
          <!--<p>M-8088A</p>-->
          <!--<span>带“大脑”的空气净化器</span>-->
          <!--</h3>-->
          <!--<a href="">查看详情</a>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li>-->
          <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
          <!--<div class="pdlist_text clearfloat">-->
          <!--<h3>-->
          <!--<p>M-8088A</p>-->
          <!--<span>带“大脑”的空气净化器</span>-->
          <!--</h3>-->
          <!--<a href="">查看详情</a>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li>-->
          <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
          <!--<div class="pdlist_text clearfloat">-->
          <!--<h3>-->
          <!--<p>M-8088A</p>-->
          <!--<span>带“大脑”的空气净化器</span>-->
          <!--</h3>-->
          <!--<a href="">查看详情</a>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li>-->
          <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
          <!--<div class="pdlist_text clearfloat">-->
          <!--<h3>-->
          <!--<p>M-8088A</p>-->
          <!--<span>带“大脑”的空气净化器的空气净化器的空气净化器</span>-->
          <!--</h3>-->
          <!--<a href="">查看详情</a>-->
          <!--</div>-->
          <!--</li>-->
        </ul>
        <!-- 分页导航-->
        <div class="pages">
          <ul>
            <li>
              <a @click.prevent="loadPager(1,type)" :class="{'cur':pno==1}">首页</a>
            </li>
            <li v-if="pager.pageNum>1">
              <a @click.prevent="loadPager(prePage(pager.pageNum),type)">上一页</a>
            </li>
            <li v-if="pager.pageNum == 1">
              <a class="default">上一页</a>
            </li>
            <li v-if="pager.pageNum-2>0">
              <a @click.prevent="loadPager(pager.pageNum-2,type)" href="#" >{{pager.pageNum-2}}</a>
            </li>
            <li v-if="pager.pageNum-1>0">
              <a @click.prevent="loadPager(pager.pageNum-1,type)" href="#" >{{pager.pageNum-1}}</a>
            </li>
            <li><a :class="{'cur':pno==pager.pageNum}">{{pager.pageNum}}</a></li>
            <li v-if="pager.pageNum+1<=pager.pageCount">
              <a @click.prevent="loadPager(pager.pageNum+1,type)" href="#">{{pager.pageNum+1}}</a>
            </li>
            <li v-if="pager.pageNum+2<=pager.pageCount">
              <a @click.prevent="loadPager(pager.pageNum+2,type)" href="#">{{pager.pageNum+2}}</a>
            </li>
            <li  v-if="pager.pageNum<pager.pageCount">
              <a @click.prevent="loadPager(nextPage(pager.pageNum),type)" >下一页</a>
            </li>

            <li v-if="pager.pageNum==pager.pageCount">
              <a  class="default" >下一页</a>
            </li>
            <li>
              <a  :class="{'cur':pno==pager.pageCount}" @click.prevent="loadPager(pager.pageCount,type)" >最后一页</a>
            </li>
          </ul>
          <!--<a href="">上一页</a>-->
          <!--<a href="">1</a>-->
          <!--<a href="" class="cur">2</a>-->
          <!--<a href="">3</a>-->
          <!--<a href="">4</a>-->
          <!--<a href="">5</a>-->
          <!--<a href="">下一页</a>-->
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "product",
      data:function () {
        return{

          pager: {
            data:[],

          } ,    //分页器对象
          pno:1,
          type:1,
          pid:0,

        }
      },
      methods: {
        loadPager: function (num, type) {
          var url = 'http://127.0.0.1:8888/product/select?pageNum=' + num + '&type=' + type;
          this.$http.get(url).then(function (res) {
            this.pager = res.body;
            console.log(this.pager);
            this.pno = this.pager.pageNum;
            this.pager.data = res.body.data;
            this.type=type;


          })
        },
        prePage: function (num) {
          return num = this.pager.pageNum - 1;
        },
        nextPage: function (num) {
          return num = this.pager.pageNum + 1;
        },
        changeType: function (type) {
          this.type = type;
        },
        //页面跳转到详情页
        jump:function(myIndex){
          this.$router
            .push('/product_detail/'+myIndex);
        }
      },
      created:function () {
          this.loadPager(1,1);
      },
      mounted:function () {

      },


    }
</script>

<style scoped>

</style>
