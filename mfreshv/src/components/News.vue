<template>
  <div>
    <!--面包屑导航-->

    <!--页面主体-->
    <div class="main container">
      <div class="news">
        <ul>
          <li v-for="(item,i) in pager.data">
            <span>{{ pubTimeFilter(item.pubTime)}}</span><a @click="jump(item.nid)">{{item.title}}</a>
          </li>
          <!--<li><span>2016-02-21</span><a href="">净美仕新风净化系统　助力校园新风行动</a></li>-->
          <!--<li><span>2016-02-21</span><a href="">全国新风行动全面启动 助推净美仕战略升级</a></li>-->
          <!--<li><span>2016-02-21</span><a href="">智能空气净化器翻盘：净美仕能否领衔?</a></li>-->

        </ul>

      </div>
      <!-- 分页导航-->
      <div class="pages clearfloat">
        <ul>
          <li>
            <a @click.prevent="loadPager(1)" :class="{'cur':pno==1}">首页</a>
          </li>
          <li v-if="pager.pageNum>1">
            <a @click.prevent="loadPager(prePage(pager.pageNum))">上一页</a>
          </li>
          <li v-if="pager.pageNum == 1">
            <a class="default">上一页</a>
          </li>
          <li v-if="pager.pageNum-2>0">
            <a @click.prevent="loadPager(pager.pageNum-2)" href="#" >{{pager.pageNum-2}}</a>
          </li>
          <li v-if="pager.pageNum-1>0">
            <a @click.prevent="loadPager(pager.pageNum-1)" href="#" >{{pager.pageNum-1}}</a>
          </li>
          <li><a :class="{'cur':pno==pager.pageNum}">{{pager.pageNum}}</a></li>
          <li v-if="pager.pageNum+1<=pager.pageCount">
            <a @click.prevent="loadPager(pager.pageNum+1)" href="#">{{pager.pageNum+1}}</a>
          </li>
          <li v-if="pager.pageNum+2<=pager.pageCount">
            <a @click.prevent="loadPager(pager.pageNum+2)" href="#">{{pager.pageNum+2}}</a>
          </li>
          <li  v-if="pager.pageNum<pager.pageCount">
            <a @click.prevent="loadPager(nextPage(pager.pageNum))" >下一页</a>
          </li>

          <li v-if="pager.pageNum==pager.pageCount">
            <a  class="default" >下一页</a>
          </li>
          <li>
            <a  :class="{'cur':pno==pager.pageCount}" @click.prevent="loadPager(pager.pageCount)" >最后一页</a>
          </li>
        </ul>
        <!--<a href="" class="">上一页</a>-->
        <!--<a href="" class="cur">1</a>-->
        <!--<a href="">2</a>-->
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
  data () {
    return {

      pager: {
        data:[],

      } ,    //分页器对象
      pno:1,
      nid:1,
      n:0

    }
  },


  mounted: function(){
    //向WEB服务器发起异步请求，获取动态数据
    this.loadPager(1);
  },
  methods: {
    loadPager: function(num){
      var url = 'http://127.0.0.1:8888/news/select?pageNum='+num;
      this.$http.get(url).then(function(res){
        this.pager = res.body;
        console.log(this.pager);
        this.pno=this.pager.pageNum;

      })
    },
    prePage:function (num) {
      return num =this.pager.pageNum-1;
    },
    nextPage:function (num) {
     return num =this.pager.pageNum+1;
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
    },
    //页面跳转到详情页
    jump:function(myIndex){
      this.$router
        .push('/news_detail/'+myIndex);
    }
  },
  created: function () {
    //向服务器端获取新闻列表的数据

  },
  watch:{
     pno:function (newValue,oldValue) {
       console.log(arguments);
     },

  }

}
</script>

<style scoped>

</style>
