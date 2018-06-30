<template>
  <!--访客分析-->
  <div class="visitor">
    <div class="facility">
      <p>设备情况</p>
      <div class="facility-info">
        <div id="facility" :style="{width:'100%',height:'100%'}">

        </div>
      </div>
    </div>
    <!--访问深度-->
    <div class="depth">
      <p>访问深度</p>
      <div class="depth-visit">
        <div id="depths" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>

    <!--地区分布-->
    <div class="regional">
      <p>地区分布</p>
      <div class="regional-Dis">
        <div id="diqu" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
  </div>
  <!--end-->
</template>
<script>
  import ecStat from '../../../node_modules/_echarts-stat@1.1.1@echarts-stat/dist/ecStat'

  export default {
    data () {
      return {
        shebei:[],
        Device:[],
        depth_datas:[],
        mapdata:[]
      }
    },
    mounted(){

    },
    methods: {
      facilityinfo(){
        let myChart = this.$echarts.init(document.getElementById('facility'))
        myChart.setOption({
          title : {
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['安卓','诺基亚','小米','vivo','苹果']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '75%',
              center: ['50%', '55%'],
              data:this.shebei,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      depths(){
        let depth = this.$echarts.init(document.getElementById('depths'))
        let timedata =['1页','2页','3页','4页','5页','6页','7页','8页','9页','大于10页']
        depth.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: timedata
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [{
            barWidth: '40%',
            data: this.depth_datas,
            type: 'bar'
          }]
        })
      },
      diqu(){
        let myChart = this.$echarts.init(document.getElementById('diqu'))
        var name_title = ""
        var subname = ''
        var nameColor = " rgb(55, 75, 113)"
        var name_fontFamily = '等线'
        var subname_fontSize = 15
        var name_fontSize = 18
        var mapName = 'china'
        var data =  [
          {name:"北京",value:177},
          {name:"天津",value:42},
          {name:"河北",value:102},
          {name:"山西",value:81},
          {name:"内蒙古",value:47},
          {name:"辽宁",value:67},
          {name:"吉林",value:82},
          {name:"黑龙江",value:66},
          {name:"上海",value:24},
          {name:"江苏",value:92},
          {name:"浙江",value:114},
          {name:"安徽",value:109},
          {name:"福建",value:116},
          {name:"江西",value:91},
          {name:"山东",value:119},
          {name:"河南",value:137},
          {name:"湖北",value:116},
          {name:"湖南",value:114},
          {name:"重庆",value:91},
          {name:"四川"},
          {name:"贵州",value:62},
          {name:"云南",value:83},
          {name:"西藏",value:9},
          {name:"陕西",value:80},
          {name:"甘肃",value:56},
          {name:"青海",value:10},
          {name:"宁夏",value:18},
          {name:"新疆",value:67},
          {name:"广东",value:123},
          {name:"广西",value:59},
          {name:"海南",value:14},
        ];

        var geoCoordMap = {};
        var toolTipData = this.mapdata;
        /*
       [
          {name:"北京",value:[{name:"用户数量",value:95}]},
          {name:"天津",value:[{name:"用户数量",value:22}]},
          {name:"河北",value:[{name:"用户数量",value:60}]},
          {name:"山西",value:[{name:"用户数量",value:40}]},
          {name:"内蒙古",value:[{name:"用户数量",value:23}]},
          {name:"辽宁",value:[{name:"用户数量",value:39}]},
          {name:"吉林",value:[{name:"用户数量",value:41}]},
          {name:"黑龙江",value:[{name:"用户数量",value:35}]},
          {name:"上海",value:[{name:"用户数量",value:12}]},
          {name:"江苏",value:[{name:"用户数量",value:47}]},
          {name:"浙江",value:[{name:"用户数量",value:57}]},
          {name:"安徽",value:[{name:"用户数量",value:57}]},
          {name:"福建",value:[{name:"用户数量",value:59}]},
          {name:"江西",value:[{name:"用户数量",value:49}]},
          {name:"山东",value:[{name:"用户数量",value:67}]},
          {name:"河南",value:[{name:"用户数量",value:69}]},
          {name:"湖北",value:[{name:"用户数量",value:60}]},
          {name:"湖南",value:[{name:"用户数量",value:62}]},
          {name:"重庆",value:[{name:"用户数量",value:47}]},
          {name:"四川",value:[{name:"用户数量",value:65}]},
          {name:"贵州",value:[{name:"用户数量",value:32}]},
          {name:"云南",value:[{name:"用户数量",value:42}]},
          {name:"西藏",value:[{name:"用户数量",value:5}]},
          {name:"陕西",value:[{name:"用户数量",value:38}]},
          {name:"甘肃",value:[{name:"用户数量",value:28}]},
          {name:"青海",value:[{name:"用户数量",value:5}]},
          {name:"宁夏",value:[{name:"用户数量",value:10}]},
          {name:"新疆",value:[{name:"用户数量",value:36}]},
          {name:"广东",value:[{name:"用户数量",value:63}]},
          {name:"广西",value:[{name:"用户数量",value:29}]},
          {name:"海南",value:[{name:"用户数量",value:8}]},
        ]
        */
        /*获取地图数据*/
        myChart.showLoading();
        //console.log(this.$echarts)
        var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        mapFeatures.forEach(function(v) {
          // 地区名称
          var name = v.properties.name;
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp;

        });
        var max = 480,
          min = 9; // todo
        var maxSize4Pin = 100,
          minSize4Pin = 20;

        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
              });
            }
          }
          return res;
        };


        myChart.setOption({
          title: {
            text: name_title,
            subtext: subname,
            x: 'center',
            textStyle: {
              color: nameColor,
              fontFamily: name_fontFamily,
              fontSize: name_fontSize
            },
            subtextStyle:{
              fontSize:subname_fontSize,
              fontFamily:name_fontFamily
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              if (typeof(params.value)[2] == "undefined") {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                  if(params.name==toolTipData[i].name){
                    toolTiphtml += toolTipData[i].name+':<br>'
                    for(var j = 0;j<toolTipData[i].value.length;j++){
                      toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                    }
                  }
                }
                //console.log(toolTiphtml)
                // console.log(convertData(data))
                return toolTiphtml;
              } else {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                  if(params.name==toolTipData[i].name){
                    toolTiphtml += toolTipData[i].name+':<br>'
                    for(var j = 0;j<toolTipData[i].value.length;j++){
                      toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                    }
                  }
                }
                //console.log(toolTiphtml)
                // console.log(convertData(data))
                return toolTiphtml;
              }
            }
          },
          // legend: {
          //     orient: 'vertical',
          //     y: 'bottom',
          //     x: 'right',
          //     data: ['credit_pm2.5'],
          //     textStyle: {
          //         color: '#fff'
          //     }
          // },
          visualMap: {
            show: true,
            min: 0,
            max: 0,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
              // color: ['#3B5077', '#031525'] // 蓝黑
              // color: ['#ffc0cb', '#800080'] // 红紫
              // color: ['#3C3B3F', '#605C3C'] // 黑绿
              // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
              // color: ['#23074d', '#cc5333'] // 紫红
              //color: ['#00467F', '#A5CC82'] // 蓝绿
                 color: ['#1488CC', '#eaf5fc'] // 浅蓝
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿

            }
          },
          /*工具按钮组*/
          // toolbox: {
          //     show: true,
          //     orient: 'vertical',
          //     left: 'right',
          //     top: 'center',
          //     feature: {
          //         dataView: {
          //             readOnly: false
          //         },
          //         restore: {},
          //         saveAsImage: {}
          //     }
          // },
          geo: {
            show: true,
            map: mapName,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7',
              }
            }
          },
          series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {

            }
          },
            {
              type: 'map',
              map: mapName,
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#000'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: data
            },
            {
              name: '点',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin', //气泡
              symbolSize: function(val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                return a * val[2] + b;
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 9,
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#F62157', //标志颜色
                }
              },
              zlevel: 6,
              data: convertData(data),
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(data.sort(function(a, b) {
                return b.value - a.value;
              }).slice(0, 5)),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: 'yellow',
                  shadowBlur: 10,
                  shadowColor: 'yellow'
                }
              },
              zlevel: 1
            },
          ]
        })
      }
    },
    created(){
      this.$axios.post('/statistics/visitor_analysis').then((response)=>{
          //console.log(response)
        this.shebei = response.data.data.platform_data
        this.depth_datas = response.data.data.depth_data
        this.mapdata = response.data.data.map_data
        //console.log(response.data.data.platform_data)

        this.facilityinfo();
        this.depths();
        this.diqu()
        })
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
    border: 1px solid;
    margin: 0 auto;
  }
  /*
  设置宽高overflow
  */
  @mixin aspect($width,$height){
    width: $width;
    height: $height;
    overflow: hidden;
  }
  /*访客分析*/
  .visitor{
    width: 100%;
    height: auto;
    overflow: hidden;
    display: block;
    /*设备情况*/
    .facility{
      p{
        padding-top: 30px;
        margin: 0;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        white-space: normal;
      }
      .facility-info{
        width: 500px;
        height: 300px;
        /*border: 1px solid;*/
        overflow: hidden;
        margin: 0 auto;
      }
    }
    /*访问深度*/
    .depth{
      @extend .visitor;
      margin-top: 100px;
      @extend .facility;
      .depth-visit{
        width: 850px;
        height: 300px;
        /*border: 1px red solid;*/
        margin: 0 auto;
      }
    }
    /*访问地区*/
    .regional{
      @extend .visitor;
      margin-top: 50px;
      @extend .facility;
      .regional-Dis{
        width:100%;
        height: 890px;
        /*border: 1px solid;*/
        //margin: 0 auto;
      }
    }
  }
  /*end*/
</style>
