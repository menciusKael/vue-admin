import Vue from "vue";
import Router from "vue-router";
import Homepage from "@/components/homepage";
import login from "@/components/login";
//数据总览
import dataStat from "@/components/dataStat";
import dataStates from "@/components/StatisData/dataStates";
import userAnalyze from "@/components/StatisData/userAnalyze";
import visitor from "@/components/StatisData/visitor";
import dataAnalyze from "@/components/StatisData/dataAnalyze";
import userPortrayal from "@/components/StatisData/userPortrayal";
//用户管理
 
// 商品管理
import commodControl from "@/components/commodControl";
import classManage from "@/components/productManage/classManage";
import productList from "@/components/productManage/productList";
//微分销
import distributions from "@/components/distribution/distributions";
import distributionList from "@/components/distribution/distributionList";
import setbrokerage from "@/components/distribution/setbrokerage";
import depositList from "@/components/distribution/depositList";
import Commission from "@/components/distribution/Commission";
//排序
import setSort from "@/components/productManage/setSort";
//添加外卖
import takeOut from "@/components/productManage/takeOut";
import addTack from "@/components/productManage/addTack";
//添加到店
import addArrival from "@/components/productManage/addArrival";
import editArrival from "@/components/productManage/editArrival";
// 添加商品
import addCommod from "@/components/productManage/addCommod";
import editCommod from "@/components/productManage/editCommod";
//添加预约商品
import addSubscribe from "@/components/productManage/addSubscribe";
//添加分销
import distributionsystem from "@/components/productManage/distributionsystem";
import editDistributionsys from "@/components/productManage/editDistributionsys";
//添加分类
import addClass from "@/components/productManage/addclass";
//编辑分类
import editClass from "@/components/productManage/editClass";
// 店铺管理
import store from "@/components/productManage/store";
// 积分管理
import Integral from "@/components/Integral";
import IntegralList from "@/components/subseries/IntegralList";
import addIntegral from "@/components/subseries/addIntegral";
// 营销工具
import marketing from "@/components/marketing";
import vip from "@/components/makeTool/vip";
import addvip from "@/components/makeTool/addvip";
import editVip from "@/components/makeTool/editVip";
import voucher from "@/components/makeTool/voucher";
import addVoucher from "@/components/makeTool/addVoucher";
import convert from "@/components/makeTool/convert";
import addconvert from "@/components/makeTool/addconvert";
import petCard from "@/components/makeTool/petCard";
import recharge from "@/components/makeTool/recharge";
import setStoredCard from "@/components/makeTool/setStoredCard";
import booking from "@/components/makeTool/booking";
import addBooking from "@/components/makeTool/addBooking";
import discount from "@/components/makeTool/discount";
import addDiscount from "@/components/makeTool/addDiscount";
import MoneyOff from "@/components/makeTool/MoneyOff";
import seckill from "@/components/makeTool/seckill";
import addSeckill from "@/components/makeTool/addSeckill";
//评论管理
import critical from "@/components/critical";
import criticalList from "@/components/subseries/criticalList";
import lookCritical from "@/components/subseries/lookCritical";
//轮播管理
import carousel from "@/components/carousel";
import carouselList from "@/components/subseries/carouselList";
import setcarousel from "@/components/subseries/setcarousel";
//页面管理
import pageManage from "@/components/pageManage";
import pageManageList from "@/components/subseries/pageManageList";
import setpagemanage from "@/components/subseries/setpagemanage";
//运费管理
import freight from "@/components/freight";
import freightList from "@/components/subseries/freightList";
import newstemp from "@/components/subseries/newstemp";
//文章管理
import articletxt from "@/components/articletxt";
import manageArticles from "@/components/subseries/manageArticles";
import newArticletxt from "@/components/subseries/newArticletxt";
import addnewArticle from "@/components/subseries/addnewArticle";
import classArticletxt from "@/components/subseries/classArticletxt";
import addclassArticletxt from "@/components/subseries/addclassArticletxt";
//视频管理
import videoList from "@/components/subseries/videoList";
import addvideo from "@/components/subseries/addvideo";
import classvideo from "@/components/subseries/classvideo";
import addclassvideo from "@/components/subseries/addclassvideo";
//多商家
import merchant from "@/components/merchant";
import merchantList from "@/components/subseries/merchantList";
import addMerchant from "@/components/subseries/addMerchant";
//订单管理
import orderList from "@/components/orderList";
import orderEcom from "@/components/orderEcoms/orderEcom";
import orderDetails from "@/components/orderEcoms/orderDetails";
import makeOerder from "@/components/orderEcoms/makeOerder";
//电商
import Ecommerce from "@/components/orderEcoms/Ecommerce";
//分销
import distribution from "@/components/orderEcoms/distribution";
//到店
import Arrival from "@/components/orderEcoms/Arrival";
//外卖
import takeOuts from "@/components/orderEcoms/takeOuts";
import billDetail from "@/components/orderEcoms/billDetail";
import exchange from "@/components/orderEcoms/exchange";
import exchesDetali from "@/components/orderEcoms/exchesDetali";
import statistics from "@/components/subseries/statistics";
//群发
import FSend from "@/components/FSend";
import FSendList from "@/components/subseries/FSendList";
import draft from "@/components/subseries/draft";
//子账号
import bypassId from "@/components/bypassId";
import bypassIdMain from "@/components/subseries/bypassIdMain";
Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/home/dataStat/dataStates" },
    // {path: '/', component: login},
    {
      path: "/home",
      name: "homepage",
      component: Homepage,
      children: [
        //数据统计
        {
          path: "/home/dataStat",
          component: dataStat,
          children: [
            { path: "/home/dataStat/dataStates", component: dataStates },
            { path: "/home/dataStat/userAnalyze", component: userAnalyze },
            { path: "/home/dataStat/visitor", component: visitor },
            { path: "/home/dataStat/dataAnalyze", component: dataAnalyze },
            { path: "/home/dataStat/userPortrayal", component: userPortrayal }
          ]
        },
        //用户管理
        
        //商品管理
        {
          path: "/home/commodControl",
          component: commodControl,
          children: [
            { path: "/home/commodControl/classManage", component: classManage },
            { path: "/home/commodControl/productList", component: productList },
            //添加到店
            {
              name: "addArrival",
              path: "/home/commodControl/addArrival",
              component: addArrival
            },
            {
              name: "editArrival",
              path: "/home/commodControl/editArrival",
              component: editArrival
            },
            //添加排序
            { path: "/home/commodControl/setSort", component: setSort },
            //外卖
            {
              name: "takeOut",
              path: "/home/commodControl/takeOut",
              component: takeOut
            },
            //添加外卖
            {
              name: "addTack",
              path: "/home/commodControl/addTack",
              component: addTack
            },
            //预约
            {
              name: "addCommod",
              path: "/home/commodControl/addCommod",
              component: addCommod
            },
            {
              name: "editCommod",
              path: "/home/commodControl/editCommod",
              component: editCommod
            },
            //添加预约商品  addSubscribe
            {
              name: "addSubscribe",
              path: "/home/commodControl/addSubscribe",
              component: addSubscribe
            },
            {
              name: "addClass",
              path: "/home/commodControl/addClass",
              component: addClass
            },
            {
              name: "editClass",
              path: "/home/commodControl/editClass",
              component: editClass
            },
            { path: "/home/commodControl/store", component: store },
            //分销
            {
              name: "distributionsystem",
              path: "/home/commodControl/distributionsystem",
              component: distributionsystem
            },
            {
              name: "editDistributionsys",
              path: "/home/commodControl/editDistributionsys",
              component: editDistributionsys
            }
          ]
        },
        //微分销
        {
          path: "/home/distribution",
          component: distributions,
          children: [
            {
              path: "/home/distribution/distributionList",
              component: distributionList
            },
            {
              path: "/home/distribution/setbrokerage",
              component: setbrokerage
            },
            { path: "/home/distribution/depositList", component: depositList },
            { path: "/home/distribution/Commission", component: Commission }
          ]
        },
        //积分管理
        {
          path: "/home/Integral",
          component: Integral,
          children: [
            { path: "/home/Integral/IntegralList", component: IntegralList },
            { path: "/home/Integral/addIntegral", component: addIntegral }
          ]
        },
        //营销工具
        {
          path: "/home/marketing",
          component: marketing,
          children: [
            { path: "/home/marketing/vip", component: vip },
            {
              name: "addvip",
              path: "/home/marketing/addvip",
              component: addvip
            },
            {
              name: "editVip",
              path: "/home/marketing/editVip",
              component: editVip
            },
            { path: "/home/marketing/voucher", component: voucher },
            { path: "/home/marketing/addVoucher", component: addVoucher },
            { path: "/home/marketing/convert", component: convert },
            { path: "/home/marketing/addconvert", component: addconvert },
            { path: "/home/marketing/petCard", component: petCard },
            { path: "/home/marketing/recharge", component: recharge },
            { path: "/home/marketing/setStoredCard", component: setStoredCard },
            { path: "/home/marketing/booking", component: booking },
            {
              name: "addBooking",
              path: "/home/marketing/addBooking",
              component: addBooking
            },
            { path: "/home/marketing/discount", component: discount },
            { path: "/home/marketing/addDiscount", component: addDiscount },
            { path: "/home/marketing/MoneyOff", component: MoneyOff },
            { path: "/home/marketing/seckill", component: seckill },
            { path: "/home/marketing/addSeckill", component: addSeckill }
          ]
        },
        //评论管理
        {
          path: "/home/critical",
          component: critical,
          children: [
            { path: "/home/critical/criticalList", component: criticalList },
            {
              name: "lookCritical",
              path: "/home/critical/lookCritical",
              component: lookCritical
            }
          ]
        },
        //轮播管理
        {
          path: "/home/carousel",
          component: carousel,
          children: [
            { path: "/home/carousel/carouselList", component: carouselList },
            {
              name: "setcarousel",
              path: "/home/carousel/setcarousel",
              component: setcarousel
            }
          ]
        },
        //页面管理
        {
          path: "/home/pageManage",
          component: pageManage,
          children: [
            {
              path: "/home/pageManage/pageManageList",
              component: pageManageList
            },
            {
              name: "setpagemanage",
              path: "/home/pageManage/setpagemanage",
              component: setpagemanage
            }
          ]
        },
        //文章管理
        {
          path: "/home/freight",
          component: freight,
          children: [
            { path: "/home/freight/freightList", component: freightList },
            { path: "/home/freight/newstemp", component: newstemp }
          ]
        },
        //视频管理
        {
          path: "/home/articletxt",
          component: articletxt,
          children: [
            {
              path: "/home/articletxt/manageArticles",
              component: manageArticles
            },
            {
              name: "newArticletxt",
              path: "/home/articletxt/newArticletxt",
              component: newArticletxt
            },
            {
              path: "/home/articletxt/classArticletxt",
              component: classArticletxt
            },
            {
              name: "addclassArticletxt",
              path: "/home/articletxt/addclassArticletxt",
              component: addclassArticletxt
            },
            {
              name: "addnewArticle",
              path: "/home/articletxt/addnewArticle",
              component: addnewArticle
            }
          ]
        },
         
        //多商家
        {
          path: "/home/merchant",
          component: merchant,
          children: [
            { path: "/home/merchant/merchantList", component: merchantList },
            { path: "/home/merchant/addMerchant", component: addMerchant }
          ]
        },
        //子账号
        {
          path: "/home/orderList",
          component: orderList,
          children: [
            {
              path: "/home/orderList/orderEcoms/orderEcom",
              component: orderEcom
            },
            {
              name: "orderDetails",
              path: "/home/orderList/orderEcoms/orderDetails",
              component: orderDetails
            },
            {
              name: "makeOerder",
              path: "/home/orderList/orderEcoms/makeOerder",
              component: makeOerder
            },
            {
              name: "Ecommerce",
              path: "/home/orderList/orderEcoms/Ecommerce",
              component: Ecommerce
            },
            {
              name: "distribution",
              path: "/home/orderList/orderEcoms/distribution",
              component: distribution
            },
            {
              name: "Arrival",
              path: "/home/orderList/orderEcoms/Arrival",
              component: Arrival
            },
            {
              name: "takeOuts",
              path: "/home/orderList/orderEcoms/takeOuts",
              component: takeOuts
            },
            {
              name: "exchesDetali",
              path: "/home/orderList/orderEcoms/exchesDetali",
              component: exchesDetali
            },
            {
              path: "/home/orderList/orderEcoms/billDetail",
              component: billDetail
            },
            {
              path: "/home/orderList/orderEcoms/exchange",
              component: exchange
            },
            { path: "/home/orderList/statistics", component: statistics }
          ]
        },
        //群发
        {
          path: "/home/FSend",
          component: FSend,
          children: [
            { path: "/home/FSend/FSendList", component: FSendList },
            { path: "/home/FSend/draft", component: draft }
          ]
        },

        {
          path: "/home/bypassId",
          component: bypassId,
          children: [
            { path: "/home/bypassId/bypassIdMain", component: bypassIdMain }
          ]
        }
      ]
    }
  ]
});
