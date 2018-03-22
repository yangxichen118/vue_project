<template>
      <div>
        <!--面包屑导航-->
        <div class="breadcrumb">
          <div class="container">
            <h2>
              <a href="">首页</a>&gt;<a href="">产品中心</a>&gt;<a href="">净美仕净化器</a>
            </h2>
          </div>
        </div>
        <!--页面主体-->
        <div class="main container">
          <div class="pd_info clearfloat">
            <div class="pdinfo_img">
              <img :src="data.pic" alt=""/>
            </div>
            <div class="pdinfo_text">
              <h2></h2>
              <ul>
                <li>型号：{{data.model}}</li>
                <li>功能：{{data.func}}</li>
                <li>噪音：{{data.noise}}</li>
                <li>风量：{{data.wind}}</li>
                <li>适用对象：{{data.applyTo}}</li>
                <li>适用面积：{{data.size}}</li>
                <li>空气净化能效等级：{{data.level}}</li>
              </ul>
              <p>价格：<span>¥</span><strong id="price">{{data.price}}</strong></p>
              <a href="" id="addCart"><span class="icon_cart"></span>加入购物车</a>
            </div>
          </div>
          <div class="details_box">
            <h2 class="title">产品详情</h2>
            <div class="pd_details">

              <!--<p>家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。</p>-->



              <!--<img src="product-imgs/m8088a/05.jpg" alt=""/>-->
              <!--<img src="product-imgs/m8088a/06.jpg" alt=""/>-->









            </div>
          </div>
        </div>
      </div>
</template>

<script>


    export default {


        data:function () {
          return{
            content:null,
            $pd_details:null,
            myId:0,
            data:{},
            content:null,










          }
        },
      methods:{
        showDetail:function (num) {
          var url = 'http://127.0.0.1:8888/product/detail?pid='+num;
          this.$http.get(url).then(function(res){
            console.log(res.body);
            this.data=res.body;
            this.$pd_details.html(this.data.detail);
            console.log(this.data.detail);



         })
        },
        pubTimeFilter:function (value) {
          var d = new Date(value);
          var m = d.getMonth();
          m = m<10 ? '0'+m : m;
          var t = d.getDate();
          t = t<10 ? '0'+t : t;
          var h = d.getHours();
          h = h<10 ? '0'+h : h;
          var n = d.getMinutes();
          n = n<10 ? '0'+n : n;
          return d.getFullYear()+'-'+m+'-'+t+' '+h+':'+m;
        }
      },
      created:function () {

        this.myId =
          this.$route.params.id;
        this.showDetail(this.myId);

      },
      mounted:function () {
        this.$pd_details=$('.pd_details');
      },
      watch:{

      }
    }
</script>

<style scoped>
  .news_details{
    width:970px;
    margin:0 auto;
  }
  .news_details h2{
    z-index:10;
  }

</style>
