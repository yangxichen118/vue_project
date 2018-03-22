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
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "product",

    }
</script>

<style scoped>

</style>
