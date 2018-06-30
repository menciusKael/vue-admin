<template>
    <div class="container body">
      <div class="main_container">
        <!--左边导航-->
        <div class="col-md-3 left_col">
          <!--左上头像部分-->
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <router-link to="/home/dataStat/dataStates" class="site_title"></router-link>
            </div>
            <div class="clearfix"></div>
            <!-- 用户头像信息 -->
            <div class="profile clearfix">
              <div class="profile_pic">
                <img src="../assets/images/tu.jpg" alt="..." class="img-circle profile_img">
              </div>
              <div class="profile_info">
                <span>您好！</span>
                <h2>{{names}}</h2>
              </div>
              <div class="clearfix"></div>
            </div>
            <!-- end -->
            <br/>
            <!-- 左边导航列表 -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section" style="margin-bottom: 0px">

                <ul class="nav side-menu">
                  <li v-show="jurisdiction.statistics"><router-link to="/home/dataStat/dataStates"><i class="glyphicon glyphicon-signal"></i>数据统计<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/dataStat/dataStates">数据总览</router-link></li>
                      <li><router-link to="/home/dataStat/visitor">访客分析</router-link></li>
                      <li><router-link to="/home/dataStat/userAnalyze">用户分析</router-link></li>
                      <li><router-link to="/home/dataStat/dataAnalyze">数据分析</router-link></li>
                      <li><router-link to="/home/dataStat/userPortrayal">用户画像</router-link></li>
                    </ul>
                  </li>
                  <li v-show="jurisdiction.customer"><router-link to="/home/userManage/userManageData"><i class="glyphicon glyphicon-user"></i>用户管理<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/userManage/userManageData">用户列表</router-link></li>
                      <li><router-link to="/home/userManage/userClass">用户分组</router-link></li>
                      <!--<li><router-link to="/home/userManage/addressManage">地址管理</router-link></li>-->
                    </ul>
                  </li>
                  <li v-show="jurisdiction.product"><router-link to="/home/commodControl/productList"><i class="glyphicon glyphicon-th-large"></i> 商品管理 <span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/commodControl/productList">商品管理</router-link></li>
                      <li><router-link to="/home/commodControl/setSort">排序设置</router-link></li>
                      <li><router-link to="/home/commodControl/classManage">分类管理</router-link></li>
                      <li><router-link to="/home/commodControl/store">店铺设置</router-link></li>
                    </ul>
                  </li>
                  <li v-show="jurisdiction.distributor"><router-link to="/home/distribution/distributionList"><i class="glyphicon glyphicon-th-large"></i> 微分销 <span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/distribution/distributionList">分销商列表</router-link></li>
                      <li><router-link to="/home/distribution/setbrokerage">佣金设置</router-link></li>
                      <li><router-link to="/home/distribution/depositList">申请提现</router-link></li>
                      <li><router-link to="/home/distribution/Commission">佣金统计</router-link></li>
                    </ul>
                  </li>
                  <li v-show="jurisdiction.integral"><router-link to="/home/Integral/IntegralList"><i class="glyphicon glyphicon-th"></i>积分商品<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/Integral/IntegralList">积分商品</router-link></li>
                      <!--<li><router-link to="/home/Integral/addIntegral">添加积分商品</router-link></li>-->
                    </ul>
                  </li>
                  <li v-show="jurisdiction.tool"><router-link to="/home/marketing/vip"><i class="glyphicon glyphicon-tags"></i>营销工具<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/marketing/vip">会员卡</router-link></li>
                      <!--<li><router-link to="/home/marketing/voucher">代金券</router-link></li>-->
                      <li><router-link to="/home/marketing/convert">兑换券</router-link></li>
                      <li><router-link to="/home/marketing/petCard">储值卡</router-link></li>
                      <li><router-link to="/home/marketing/discount">折扣券</router-link></li>
                      <li><router-link to="/home/marketing/MoneyOff">满减</router-link></li>
                      <li><router-link to="/home/marketing/seckill">秒杀</router-link></li>
                      <li><router-link to="/home/marketing/booking">拼团</router-link></li>
                    </ul>
                  </li>
                  <li v-show="jurisdiction.comment"><router-link to="/home/critical/criticalList"><i class="glyphicon glyphicon-comment"></i>评论管理<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/critical/criticalList">评论管理</router-link></li>
                      <!--<li><router-link to="/home/critical/lookCritical">查看详情</router-link></li>-->
                    </ul>
                  </li>
                  <li v-show="jurisdiction.slider "><router-link to="/home/carousel/carouselList"><i class="glyphicon glyphicon-picture"></i>轮播管理<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/carousel/carouselList">轮播列表</router-link></li>
                      <!--<li><router-link to="/home/carousel/setcarousel">编辑轮播</router-link></li>-->
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="menu_section">
                <!--<h3>Live On</h3>-->
                <ul class="nav side-menu">
                  <li v-show="jurisdiction.layout "><router-link to="/home/pageManage/pageManageList"><i class="glyphicon glyphicon-duplicate"></i>页面管理<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/pageManage/pageManageList">页面管理</router-link></li>
                      <!--<li><router-link to="/home/pageManage/setpagemanage">编辑页面</router-link></li>-->
                    </ul>
                  </li>
                  <!--<li><router-link to="/home/freight/freightList"><i class="glyphicon glyphicon-bed"></i>运费管理<span class="fa fa-chevron-down"></span></router-link>-->
                    <!--<ul class="nav child_menu">-->
                      <!--<li><router-link to="/home/freight/freightList">运费管理</router-link></li>-->
                      <!--<li><router-link to="/home/freight/newstemp">新建运费模板</router-link></li>-->
                    <!--</ul>-->
                  <!--</li>-->
                  <li v-show="jurisdiction.article "><router-link to="/home/articletxt/manageArticles"><i class="glyphicon glyphicon-file"></i>文章管理<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/articletxt/manageArticles">文章列表</router-link>
                      <li><router-link to="/home/articletxt/classArticletxt">分类管理</router-link></li>
                    </ul>
                  </li>
                  <li v-if="jurisdiction.video "><router-link to="/home/videoManage/videoList"><i class="glyphicon glyphicon-film"></i>视频管理<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/videoManage/videoList">视频列表</router-link>
                      <li><router-link to="/home/videoManage/classvideo">视频分类</router-link></li>
                    </ul>
                  </li>
                  <li v-show="jurisdiction.order "><router-link to="/home/orderList/orderEcoms/orderEcom"><i class="glyphicon glyphicon-list-alt"></i>订单管理<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/orderList/orderEcoms/orderEcom">订单列表</router-link></li>
                      <li><router-link to="/home/orderList/orderEcoms/billDetail">账单明细</router-link></li>
                      <li><router-link to="/home/orderList/orderEcoms/exchange">退换货</router-link></li>
                      <!--<li><a href="#level1_2">预约订单</a></li>-->
                    </ul>
                  </li>
                  <li v-show="jurisdiction.shop"><router-link to="/home/merchant/merchantList"><i class="glyphicon glyphicon-oil"></i>多商家<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/merchant/merchantList">店铺列表</router-link>
                      <li><router-link to="">订单分析</router-link></li>
                    </ul>
                  </li>
                  <li v-if="jurisdiction.user"><router-link to="/home/bypassId/bypassIdMain"><i class="glyphicon glyphicon-plus"></i>子账号<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/bypassId/bypassIdMain">子账号主页</router-link></li>
                    </ul>
                  </li>
                  <li v-show="jurisdiction.groupmessage"><router-link to="/home/FSend/FSendList"><i class="glyphicon glyphicon-envelope"></i>群发<span class="fa fa-chevron-down"></span></router-link>
                    <ul class="nav child_menu">
                      <li><router-link to="/home/FSend/FSendList">群发列表</router-link>
                      <li><router-link to="/home/FSend/draft">新建群发</router-link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <!-- /end -->

          </div>
        </div>
        <!--左边导航 end-->

        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav>
              <div class="nav toggle">
                <a id="menu_toggle">
                  <!--<i class="fa fa-bars"></i>-->
                </a>
              </div>
              <ul class="nav navbar-nav navbar-right">
                <li class="">
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="images/img.jpg" alt="">{{names}}
                    <span class=" fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href="http://mps.essocial.com.cn/home/login"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                  </ul>
                </li>
                <li role="presentation" class="dropdown">
                  <!--<a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-envelope-o"></i>
                    <span class="badge bg-green">0</span>
                  </a>-->
                  <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">

                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->

        <!-- page content -->
        <div class="right_col" role="main">
          <router-view></router-view>
        </div>
        <!-- /page content -->
        <!-- footer content -->
        <footer>
          <div class="pull-right">
            翼升科技 © 版权所有
            <!--Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>-->
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
      </div>
    </div>

</template>
<script>
export default {
  data() {
    return {
      names: "",
      jurisdiction: {
        statistics: "",
        customer: "",
        product: "",
        distributor: "",
        integral: "",
        tool: "",
        comment: "",
        slider: "",
        layout: "",
        article: "",
        video: "",
        order: "",
        shop: "",
        user: "",
        groupmessage: ""
      }
    };
  },
  components: {},
  methods: {
    checks() {}
  },
  mounted: function() {
    //console.log(this.$router)
  },
  created() {
    this.$axios.post("/user/getPerssion").then(response => {
      //this.jurisdiction = response.data.data
      console.log(response);
      this.names = response.data.mobile;
      if (response.data.status === 1) {
        this.jurisdiction = response.data.data;
        /*let value = false
          let isGroupmessage = response.data.data.groupmessage = value === 'false' ? false:true
          this.jurisdiction.groupmessage = isGroupmessage

          let isStatistics = response.data.data.statistics = value === 'false' ? false:true
          this.jurisdiction.statistics = isStatistics

          let isproduct  = response.data.data.product  = value === 'false' ? false:true
          this.jurisdiction.product = isproduct

          let isdistributor  = response.data.data.distributor  = value === 'false' ? false:true
          this.jurisdiction.distributor = isdistributor

          let isintegral  = response.data.data.integral  = value === 'false' ? false:true
          this.jurisdiction.integral  = isintegral

          let istool  = response.data.data.tool  = value === 'false' ? false:true
          this.jurisdiction.tool  = istool

          let iscomment  = response.data.data.comment  = value === 'false' ? false:true
          this.jurisdiction.comment  = iscomment

          let slider  = response.data.data.slider  = value === 'false' ? false:true
          this.jurisdiction.slider  = slider

          let layout  = response.data.data.layout  = value === 'false' ? false:true
          this.jurisdiction.layout  = layout

          let article  = response.data.data.article  = value === 'false' ? false:true
          this.jurisdiction.article  = article

          let video  = response.data.data.video  = value === 'false' ? false:true
          this.jurisdiction.video  = video

          let order  = response.data.data.order  = value === 'false' ? false:true
          this.jurisdiction.order  = order

          let shop = response.data.data.shop = value === 'false' ? false:true
          this.jurisdiction.shop = shop

          let user  = response.data.data.user  = value === 'false' ? false:true
          this.jurisdiction.user  = user

          let isCustomer = response.data.data.customer = value === 'false' ? false:true
          this.jurisdiction.customer = isCustomer*/
      } else {
        window.location.href = response.data.data;
      }
      //console.log(response)
    });
  }
};
</script>
<style scoped lang="scss">
.navbar {
  background-image: url("../assets/images/logo.png");
  background-size: 100% 100%;
  background-position: center;
}
.right_col {
  padding-top: 60px !important;
}
.glyphicon {
  margin-right: 10px;
}
</style>
