<template>
  <div>
    <!--banner-->
    <div class="banner">
      <!-- 练习：编写banner的html和css-->
      <!-- 图片列表-->
      <ul>
        <li style="background: url(../../static/img/banner_01.jpg) center 0 no-repeat; display: block;z-index: 20;"><a href="#" class="link"></a></li>
        <li style="background: url(../../static/img/banner_02.jpg) center 0 no-repeat;"><a href="#" class="link"></a></li>
        <li style="background: url(../../static/img/banner_03.jpg) center 0 no-repeat;"><a href="#" class="link"></a></li>
        <li style="background: url(../../static/img/banner_04.jpg) center 0 no-repeat;"><a href="#" class="link"></a></li>
      </ul>
      <!-- 左右箭头-->
      <span class="cut prev"></span>
      <span class="cut next"></span>
      <!-- 小圆点指示器-->
      <div class="indicator">
        <a href="" class="cur"></a><a href=""></a><a href=""></a><a href=""></a>
      </div>
    </div>
    <!--main-->
    <div class="main container">
      <div class="ind_con1">
        <h2 class="title"><a href="#" class="more">more</a>净美仕产品</h2>
        <ul class="clearfloat">
          <li><a href="#" class="link"><img src="../assets/images/01.jpg" alt=""/></a></li>
          <li><a href="#" class="link"><img src="../assets/images/02.jpg" alt=""/></a></li>
          <li><a href="#" class="link"><img src="../assets/images/03.jpg" alt=""/></a></li>
        </ul>
      </div>
      <div class="ind_con2 clearfloat">
        <div class="ind_about">
          <h2 class="title"><a href="#" class="more">more</a>关于净美仕</h2>
          <p>北京净美仕环境科技有限公司自诞生起一直关注人类呼吸健康的问题，并专注于室内空气质量的研究与改善。2003年，非典来袭，环境安全威胁到了每个人的生命，全国陷入一片恐慌。净美仕肩负着为人类创造健康安全生活环境的使命应运而生。2012年7月，亿朗以“净美仕(Mfresh)”为品牌重塑，以崭新的面貌屹立在净化行业。 <a
            href="#">查看更多</a></p>
        </div>
        <div class="ind_news">
          <h2 class="title"><a href="#" class="more">more</a>公司动态</h2>
          <ul>
            <li><span>2016-02-21</span><a href="">空气净化器要逆天？ “玫瑰金”“土豪金”齐上阵</a></li>
            <li><span>2016-02-21</span><a href="">净美仕新风净化系统　助力校园新风行动</a></li>
            <li><span>2016-02-21</span><a href="">全国新风行动全面启动 助推净美仕战略升级</a></li>
            <li><span>2016-02-21</span><a href="">智能空气净化器翻盘：净美仕能否领衔?</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //cur:0,//当前显示的图片
      //number:0,
      timer:0,//定时器
      now:null,


    }
  },
  methods:{

    carousel(){
      var number = $(".banner ul li").size()-1;//图片的数量
      var cur = 0;


      //下一个
      function slideNext(){
        if(cur<number){
          $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
          $(".banner ul li").eq(cur+1).css({'z-index':20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(cur+1).addClass("cur");
          cur+=1;
        }else{
          $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
          $(".banner ul li").eq(0).css({'z-index':20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(0).addClass("cur");
          cur=0;
        }
      }
      //上一个
      function slidePrev(){
        if(cur>0){
          $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
          $(".banner ul li").eq(cur-1).css({'z-index':20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(cur-1).addClass("cur");
          cur-=1;
        }else{
          $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
          $(".banner ul li").eq(number).css({'z-index':20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(number).addClass("cur");
          cur=number;
        }
      }

      this.timer=setInterval(slideNext,3000);

      //当鼠标移入banner时，清除定时器
      $(".banner").mouseover(function(){
        clearInterval(this.timer);
      });
      $(".banner").mouseout(function(){
        this.timer=setInterval(slideNext,3000)
      });

      //上一个、下一个
      $(".banner .prev").click(function(){
        slidePrev();
      });
      $(".banner .next").click(function(){
        slideNext();
      });

      //小圆点指示器
      $(".indicator>a").mouseover(function(){
        this.now=$(this).index();//获取鼠标移入的是第几个a标记
        $(".indicator>a").removeClass();//删除a标记中的class=cur
        $(this).addClass("cur");//为此a标记添加cur样式
        console.log(cur);
        $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();//隐藏当前的图片
        $(".banner ul li").eq(this.now).css({'z-index':20}).stop().fadeIn();//显示和a序列号一样的图片
        cur=this.now;//为变量cur重新赋值，以便于再次启用定时器的时候，从当前显示的图片开始播放
      });
    },

  },
  mounted:function () {
      this.carousel();

  }
}
</script>

<style scoped>
</style>
