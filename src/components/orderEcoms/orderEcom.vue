<template>
  <div class="orderEcom">
    <header>
      <h3>订单列表</h3>
      <div class="ManageData-headRight">
        <label>版本类型 ：</label>
        <el-select
          name="selectList"
          id=""
          class="selectType"
          filterable
          placeholder="请选择"
          @change="changs"
          v-model="values_type">
          <el-option
            v-for="item in listOptins"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <button type="button" class="btn btn-primary" >导出数据</button>
        <!--<el-button type="danger" icon="el-icon-delete" @click="allDeleta">批量删除<i class="el-icon-delete"></i></el-button>-->
      </div>
    </header>
    <section class="orderEcom-main">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="全部订单" name="all">
          <div class="first">
            <div class="allList">
              <div class="screen">
                <div class="screen-list" style="margin-left: 30px">
                  <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                    <el-option
                      v-for="item in oerder_code"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
                </div>
                <div class="screen-list" >
                  <span>付款方式：</span>
                  <el-select v-model="payment_value1" @change="paymentType" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in payment"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="screen-list">
                  <span>订单来源：</span>
                  <el-select v-model="source_value1" @change="oerderSource" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in source"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="screen-list">
                  <span>选择日期：</span>
                  <div class="block">
                    <el-date-picker
                      v-model="startTime1"
                      type="daterange"
                      @change="selectTimes"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                  <span>活动类型：</span>
                  <el-select v-model="activity_value1" @change="activeType" placeholder="请选择" style="width: 180px">
                    <el-option
                      v-for="item in activity"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <el-table
                ref="multipleTable"
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
              >
                <el-table-column
                  type="index"
                  width="80">
                </el-table-column>
                <el-table-column label="订单号" prop="order_code">

                </el-table-column>
                <el-table-column label="姓名" prop="name">

                </el-table-column>
                <el-table-column label="电话" prop="tel">

                </el-table-column>
                <el-table-column label="实收" prop="income">

                </el-table-column>
                <el-table-column label="总金额" prop="total">

                </el-table-column>
                <el-table-column label="订单状态" prop="status">

                </el-table-column>
                <el-table-column label="日期" prop="create_date" sortable>

                </el-table-column>
                <el-table-column label="操作" width="280">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      :disabled="fsnumShow"
                      @click="pushOrderDetails(scope.$index, scope.row)"
                      >查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin: 20px auto;">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  align="center"
                  :page-sizes="[10, 20, 30, 40]"
                  :pager-count="currentPage"
                  :page-size="pagesize"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChanges"
                  :total="sum">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="second">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_second"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="日期" prop="create_date" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="third">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_third"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="日期" prop="create_date" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="fourth">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_fourth"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="日期" prop="create_date" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="accomplish">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_accomplish"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="日期" prop="create_date" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已取消订单的" name="accomplishs">
          <div class="allList">
            <div class="screen">
              <div class="screen-list" style="margin-left: 30px">
                <el-select v-model="oderCode_value1" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="item in oerder_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="width: 180px" v-model="search_value1" @keydown.enter.native="sendOerderCode"></el-input>
              </div>
              <div class="screen-list" >
                <span>付款方式：</span>
                <el-select v-model="payment_value1" @change="paymentType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in payment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>订单来源：</span>
                <el-select v-model="source_value1" @change="oerderSource" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in source"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="screen-list">
                <span>选择日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="startTime1"
                    type="daterange"
                    @change="selectTimes"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="screen-list" style="margin-left: 30px;margin-top: 10px;clear: left">
                <span>活动类型：</span>
                <el-select v-model="activity_value1" @change="activeType" placeholder="请选择" style="width: 180px">
                  <el-option
                    v-for="item in activity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData_accomplishs"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="80">
              </el-table-column>
              <el-table-column label="订单号" prop="order_code">

              </el-table-column>
              <el-table-column label="姓名" prop="name">

              </el-table-column>
              <el-table-column label="电话" prop="tel">

              </el-table-column>
              <el-table-column label="实收" prop="income">

              </el-table-column>
              <el-table-column label="总金额" prop="total">

              </el-table-column>
              <el-table-column label="订单状态" prop="status">

              </el-table-column>
              <el-table-column label="日期" prop="create_date" sortable>

              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="fsnumShow"
                    @click="pushOrderDetails(scope.$index, scope.row)"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<script>
  import parson from '../../assets/js/parson'
  export default {
    data () {
      return {
        activeName: 'all',
        tableData:[],
        //代发货
        tableData_second:[],
        tableData_third:[],
        tableData_fourth:[],
        tableData_accomplish:[],
        tableData_accomplishs:[],
        values_type:'',
        options: [],
        value: '',
        //所有
        search_value1:'',
        oderCode_value1:'',
        payment_value1:'',
        source_value1:'',
        activity_value1:'',
        startTime1:'',

        fsnumShow:false,
        //商品订单刷选
        productType:'',
        listOptins: [{
          value: '1',
          label: '电商订单'
        }, {
          value: '2',
          label: '到店订单'
        }, {
          value: '3',
          label: '外卖订单'
        },{
          value: '4',
          label: '预约订单'
        },{
          value: '5',
          label: '分销订单'
        }
        ],
        //订单号筛选
        oerder_code:this.$store.state.oerder_code,
        // 付款方式
        payment:this.$store.state.payment,
        //订单来源
        source:this.$store.state.source,
        //活动形式
        activity:[{
            label:'会员卡',
            value:'1'
          },{
            label:'积分',
            value:'2'
          },{
            label:'优惠券',
            value:'3'
          },{
            label:'储值卡',
            value:'4'
          },{
            label:'拼团',
            value:'5'
          },{
            label:'折扣券',
            value:'6'
          },{
            label:'满减',
            value:'7'
          },{
            label:'秒杀',
            value:'8'
          }
          ],
        //时间
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
   methods: {
     handleClick(tab, event) {
       switch(this.activeName){
         case 'all':
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           this.$axios.post('/order/getOrderList')
             .then((response) =>{
               this.tableData = response.data.data
             })
           break;
         case 'second':
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let secondData = {
             program_type:this.values_type,
             status:2
           }
           //console.log(secondData)
           this.$axios.post('/order/getOrderList',secondData)
             .then((response) =>{
               this.tableData_second = response.data.data
             })
           break;
         case 'third':
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let thirdData = {
             program_type:this.values_type,
             status:1
           }
           this.$axios.post('/order/getOrderList',thirdData)
             .then((response) =>{
               this.tableData_third = response.data.data
             })
           break;
         case 'fourth':
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let fourthData = {
             program_type:this.values_type,
             status:3
           }
           this.$axios.post('/order/getOrderList',fourthData)
             .then((response) =>{
               this.tableData_fourth = response.data.data
             })
           break;
         case 'accomplish':
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let accomplishData = {
             program_type:this.values_type,
             status:4
           }
           this.$axios.post('/order/getOrderList',accomplishData)
             .then((response) =>{
               this.tableData_accomplish = response.data.data
             })
           break;
         case 'accomplishs':
           this.search_value1 = ''
           this.oderCode_value1 =''
           this.payment_value1 = ''
           this.source_value1 = ''
           this.activity_value1 = ''
           this.startTime1 = ''
           let accomplishsData = {
             program_type:this.values_type,
             status:5
           }
           this.$axios.post('/order/getOrderList',accomplishsData)
             .then((response) =>{
               this.tableData_accomplishs = response.data.data
             })
           break;
         default:
           alert('还未添加')
       }
     },
     handleEdit(index, row) {
       console.log(index, row);
     },
     /*handleDelete(index, row) {
       switch(this.activeName){
         case 'all':
           this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           })
             .then(() => {
               this.$message({
                 type: 'success',
                 message: '删除成功!'
               });
               this.tableData.splice(index,1);
               this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
                 if(response.data.status === 1){
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'success'
                   });
                 }else {
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'error'
                   });
                 }
               })
             }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });
           });
           break;
         case 'second':
           this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           })
             .then(() => {
               this.$message({
                 type: 'success',
                 message: '删除成功!'
               });
               this.tableData_second.splice(index,1);
               this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
                 if(response.data.status === 1){
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'success'
                   });
                 }else {
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'error'
                   });
                 }
               })
             }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });
           });
           break;
         case 'third':
           this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           })
             .then(() => {
               this.$message({
                 type: 'success',
                 message: '删除成功!'
               });
               this.tableData_third.splice(index,1);
               this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
                 if(response.data.status === 1){
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'success'
                   });
                 }else {
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'error'
                   });
                 }
               })
             }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });
           });
           break;
         case 'fourth':
           this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           })
             .then(() => {
               this.$message({
                 type: 'success',
                 message: '删除成功!'
               });
               this.tableData_fourth.splice(index,1);
               this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
                 if(response.data.status === 1){
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'success'
                   });
                 }else {
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'error'
                   });
                 }
               })
             }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });
           });
           break;
         case 'accomplish':
           this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           })
             .then(() => {
               this.$message({
                 type: 'success',
                 message: '删除成功!'
               });
               this.tableData_accomplish.splice(index,1);
               this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
                 if(response.data.status === 1){
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'success'
                   });
                 }else {
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'error'
                   });
                 }
               })
             }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });
           });
           break;
         case 'accomplishs':
           this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           })
             .then(() => {
               this.$message({
                 type: 'success',
                 message: '删除成功!'
               });
               this.tableData_accomplishs.splice(index,1);
               this.$axios.post('/order/deleteOrder',{'order_id':row.order_id}).then((response) =>{
                 if(response.data.status === 1){
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'success'
                   });
                 }else {
                   this.$message({
                     showClose: true,
                     message: response.data.message,
                     type: 'error'
                   });
                 }
               })
             }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });
           });
           break;
         default:
           alert('还未添加')
       }
     },*/
     /*allDeleta(){
       // 点击删除全部时
       let arr = []
       //console.log(this.multipleSelection)
       this.multipleSelection.forEach(selectedItem =>{
         arr.push(selectedItem.order_id)
         return arr
       })
       let arr_id = JSON.stringify(arr)
       this.$axios({
         url:'/order/deleteOrderInBatch',
         method:'post',
         data:{
           'order_id_array':arr_id
         }
       }).then((response)=>{
         //console.log(response)
         if(response.data.status === 1){
           this.$axios.post('/order/getOrderList').then((response) =>{
             if(response.status === 0){
               alert('获取商品列表失败！')
             }else {
               //console.log(response)
               this.tableData = response.data.data
             }
           })
           this.$message({
             showClose: true,
             message: response.data.message,
             type: 'success'
           });
         }else {
           this.$message({
             showClose: true,
             message: response.data.message,
             type: 'error'
           });
         }
       })
     },*/
     changs(){
       this.$nextTick(function () {
         let sum = parseInt(this.values_type)
         //console.log(this.values_type)
         this.$axios.post('/order/getOrderList',{'program_type':sum})
           .then((response)=>{
             if(response.data.current_program_type == this.values_type){
               this.fsnumShow = false
             }else {
               this.fsnumShow = true
             }
             this.tableData = response.data.data
           })
       })
     },
     pushOrderDetails(index, row){
       //console.log(this.productType)
       switch(parseInt(this.productType)){
         case 1:
           this.$router.push({name:'Ecommerce',query:{data_id:row.order_id,edit:'查看电商详情'}})
           break;
         case 2:
           this.$router.push({name:'Arrival',query:{data_id:row.order_id,edit:'查看到店商品'}})
           break;
         case 3:
           this.$router.push({name:'takeOuts',query:{data_id:row.order_id,edit:'查看外卖商品'}})
           break;
         case 4:
           this.$router.push({name:'makeOerder',query:{data_id:row.order_id,edit:this.values_type}})
           break;
         case 5:
           this.$router.push({name:'distribution',query:{data_id:row.order_id,edit:'查看分销详情'}})
           break;
         default:
           alert('还未添加')
       }
     },
     //订单号筛选
     sendOerderCode(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 // console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }
           break;
         default:

       }
     },
     //付款方式
     paymentType(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 // console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }
           break;
         default:

       }
     },
     //订单来源
     oerderSource(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 // console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }
           break;
         default:

       }
     },
     //选择日期
     selectTimes(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                // console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }
           break;
         default:

       }
     },
     //活动类型
     activeType(){
       switch(this.activeName){
         case 'all':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                // console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData = response.data.data
               })
           }
           break;
         case 'second':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_second = response.data.data
               })
           }
           break;
         case 'third':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                // console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_third = response.data.data
               })
           }
           break;
         case 'fourth':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_fourth = response.data.data
               })
           }
           break;
         case 'accomplish':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplish = response.data.data
               })
           }
           break;
         case 'accomplishs':
           if(this.startTime1 === ''){
             let datess = []
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.search_value1,
               source:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //console.log(sedData)
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }else {
             let getDates = new parson.getTime()
             let rises = getDates.formatTime(this.startTime1[0])
             let overs = getDates.formatTime(this.startTime1[1])
             let datess = []
             datess.push(rises)
             datess.push(overs)
             let sedData = {
               program_type:this.productType,
               status:0,
               search_type:this.oderCode_value1,
               search_value:this.source_value1,
               date:datess,
               payment_type:this.payment_value1,
               discount_type:this.activity_value1
             }
             //全部订单
             this.$axios.post('/order/getOrderList',sedData)
               .then((response) =>{
                 //console.log(response)
                 //this.productType = response.data.current_program_type
                 this.tableData_accomplishs = response.data.data
               })
           }
           break;
         default:

       }
     },
     //分页
     handleSizeChange(val){
       this.pagesize = val;
       console.log(`每页 ${val} 条`);
     },
     handleCurrentChanges(val){
       this.currentPage = val;
       console.log(`当前页: ${val}`);
     }
   },
    created(){
      //全部订单
      this.$axios.post('/order/getOrderList')
        .then((response) =>{
          //console.log(response)
          this.productType = response.data.current_program_type
          this.sum = response.data.data.length
          this.tableData = response.data.data
        })
    },

  }
</script>
<style scoped lang="scss">
  .orderEcom{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
      .ManageData-headRight{
        float: right;
        padding-right: 30px;
        .selectType{
          width: 110px;
        }
      }
    }
    .orderEcom-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
      .demo-table-expand {
        font-size: 0;
      }
      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
        padding: 0 126px;
      }
    }
  }
  .screen{
    overflow: hidden;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    .screen-list{
      overflow: hidden;
      float: left;
      margin-right: 20px;
      .block{
        float: right;
      }
    }
  }
</style>
