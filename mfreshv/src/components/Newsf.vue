<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">公司动态</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <router-view></router-view>

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
        this.n=res.body.data.length;
        for(var i=0;i<this.n;i++){
          this.nid=res.body.data[i].nid;
          console.log(this.nid);
        }

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
    }
  },
  created: function () {
    //向服务器端获取新闻列表的数据

  },
  watch:{
     pno:function (newValue,oldValue) {
       console.log(arguments);
     }
  }

}
</script>

<style scoped>

</style>
