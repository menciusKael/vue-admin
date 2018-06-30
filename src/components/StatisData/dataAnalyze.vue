<template>
  <!--数据分析-->
  <div class="dataAnalyze">
    <div class="entrance">
      <p>入口分析</p>
      <div class="entrance-data">
        <div id="entrancedata" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
    <div class="timeShare">
      <p>分时浏览</p>
      <div class="timeShare-data">
        <div id="timeSharedata" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
    <div class="onLine">
      <p>人均在线时长</p>
      <div class="onLine-data">
        <div id="onLinedata" :style="{width:'100%',height:'100%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        source:[],
        source_data_outs:[],
        stay_day:[],
        stay_times:[]
      }
    },
    mounted(){

    },
    methods:{
      entrancedatas(){
        let entrancedata = this.$echarts.init(document.getElementById('entrancedata'))
        entrancedata.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left'
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.source_data_outs
            },
            {
              name:'访问来源',
              type:'pie',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data:this.source
            }
          ]
        })
      },
      timeSharedatas(){
        let timeSharedata = this.$echarts.init(document.getElementById('timeSharedata'))
        let randomData = function() {
          now = new Date(+now + oneDay);
          value = value + Math.random() * 21 - 10;
          return {
            name: now.toString(),
            value: [
              [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
              Math.round(value)
            ]
          }
        }
        var data = [];
        var now = +new Date(1997, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var value = Math.random() * 1000;
        for (var i = 0; i < 1000; i++) {
          data.push(randomData());
        }
        timeSharedata.setOption({
          title: {
            text: '动态数据 + 时间坐标轴'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0];
              var date = new Date(params.name);
              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
          }]
        })

        setInterval(function () {
          for (var i = 0; i < 5; i++) {
            data.shift();
            data.push(randomData());
          }

          timeSharedata.setOption({
            series: [{
              data: data
            }]
          });
        }, 1000);
      },
      onLinedatas(){
        let onLinedata = this.$echarts.init(document.getElementById('onLinedata'))
        onLinedata.setOption({
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: this.stay_day
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.stay_times,
            type: 'line'
          }]
        })
      }
    },
    created(){
      this.$axios.post('/statistics/data_analysis')
        .then((response)=>{
          this.source = response.data.data.source_data_inside
          this.source_data_outs = response.data.data.source_data_outside
          this.stay_day = response.data.data.stay_days
          this.stay_times = response.data.data.stay_time
          this.entrancedatas();
          this.timeSharedatas();
          this.onLinedatas();
          //console.log(response)
        })
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
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
  /*数据分析*/
  .dataAnalyze{
    .newUser{
      overflow: hidden;
      height: auto;
      p{
        font-weight: 700;
        font-size: 24px;
        white-space: normal;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 10px;
      }
      .newUser-data{
        width: 860px;
        height: 180px;
        @include border_overfloe;
      }
    }
    .entrance{
      @extend .newUser;
      .entrance-data{
        width: 1000px;
        height: 500px;
        @include border_overfloe;
      }
    }
    .timeShare{
      @extend .newUser;
      .timeShare-data{
        width: 1000px;
        height: 380px;
        @include border_overfloe;
      }
    }
    .onLine{
      @extend .newUser;
      .onLine-data{
        width: 1000px;
        height: 380px;
        @include border_overfloe;
      }
    }
  }
  /*end*/
</style>
