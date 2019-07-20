import React, { Component } from 'react'
import { Table, DatePicker, Button } from 'antd';
import axios from "axios"
import Cookie from "js-cookie"
const { RangePicker } = DatePicker;

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  function onOk(value) {
    console.log('onOk: ', value);
  }
  
//   function onChange(value) {
//     console.log('changed', value);
//   }
export default class Zhuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
        con: 0,
        type: "",
        start: "",
        end: "",
        index: "",
        first: "",
        two: "",
        serviceName: "",
        money: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }, { name: 7 }, { name: 8 }],
        Twomoney: [{ name: 9 }, { name: 10 }, { name: 11 }, { name: 12 }, { name: 13 }, { name: 14 }, { name: 15 }, { name: 16 }, { name: 20 }],
        opt: [{ name: "请选择类型" }, { name: "信用贷" }, { name: "押房贷" }, { name: "车乐贷" }, { name: "房乐贷" }],
        opts: [{ name: "请选择客服" }, { name: "李大维" }, { name: "李小冉" }, { name: "李莉" }, { name: "张玲" }, { name: "李家豪" }],
        columns: [
            {
                title: '订单号',
                width: 200,
                dataIndex: 'id',
                key: 'name',
                fixed: 'left',
            },
            {
                title: '下单时间',
                width: 200,
                dataIndex: 'date',
                key: 'age',
                fixed: 'left',
            },
            { title: '用户名称', dataIndex: 'customerName', key: '1',width: 180,fixed: 'left' },
            { title: '手机号', dataIndex: 'phone', key: '2',width: 180,fixed: 'left' },
            { title: '转单类型', dataIndex: 'type', key: '3',width: 180,fixed: 'left' },
            { title: '客服', dataIndex: 'serviceName', key: '4', width: 180, fixed: 'left',},
            { title: '转单类型', dataIndex: 'handleState', key: '5', width: 180, fixed: 'left',},
             { title: '贷款金额(万元)', dataIndex: 'money', key: '6', width: 180, fixed: 'left',},
            {
                title: '操作',
                key: 'operation',
                fixed: 'left',
                width: 100,
                render: () => <a href="javascript:;">...</a>,
            },
        ],
        list: [
            {
                name: "新订单",
            },
            {
                name: "未审核"
            },
            {
                name: "已接单"
            },
            {
                name: "已完成"
            },
            {
                name: "暂无状态"
            },
            {
                name: "全部"
            }
        ],
        data: [
        ]
    }
}
componentDidMount() {
  axios.defaults.headers.common["authorization"] = Cookie.get("authorization")

  axios.get("http://localhost:3000/api/list?order=2").then(({ data }) => {

      data.data.forEach((item, index) => {//解决key报错
          item.key = index
      })
      this.setState({
          data: data.data
      })
  })

}
clickItem(item, index) {
  this.setState({
      con: index
  })
  this.setState({
      index: index
  })

}
 
render() {
    
  return (
      <div className="Dai">
      <div className="to">
      <span>处理时间:<RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['Start Time', 'End Time']}
              onChange={(arr, arring) => {
                console.log(arr, arring)
                this.setState({
                  start: arring[0],
                  end: arring[1]
                })
              }}
              onOk={onOk}
            /></span>
            <span>金额范围(万):
                      <select value={this.state.first} onChange={(e) => {
                let arr = this.state.first = e.target.value;
                this.setState({
                  first: arr
                })
                console.log(this.state.first)
              }}>
                {
                  this.state.money.map((item, index) => {
                    return <option key={index} value={item.name}>{item.name}</option>
                  })
                }
              </select>
              -
                      <select value={this.state.two} onChange={(e) => {
                let brr =e.target.value;
                this.setState({
                  two: brr
                })
                console.log(this.state.two)
              }}>
                {
                  this.state.Twomoney.map((item, index) => {
                    return <option value={item.name} key={index}>{item.name}</option>
                  })
                }
              </select>
            </span>
  
  <div className="zt">
  处理状态:
               {
              this.state.list.map((item, index) => {
                return <Button onClick={this.clickItem.bind(this, item, index)} className={index === this.state.con ? "mm" : ""} key={index}>{item.name}</Button>
              })
            }
            转单类型: <select value={this.state.type} onChange={(e) => {

              let arr = e.target.value
              this.setState({
                type: arr
              })
            }}>
              {
                this.state.opt.map((item, index) => {
                  return <option key={index} value={item.name}>{item.name}</option>
                })
              }
            </select>
            客服名称: <select value={this.state.serviceName} onChange={(e) => {
              let brr = e.target.value;
              this.setState({
                serviceName: brr
              })

            }}>
              {
                this.state.opts.map((item, index) => {
                  return <option key={index} value={item.name}>{item.name}</option>
                })
              }
            </select>
    
            <Button type="primary" style={{ marginLeft: "20px" }} onClick={() => {
             
              axios.get("http://localhost:3000/api/list?order=2").then(({ data }) => {
                data.data.forEach((item, index) => {//解决key报错
                  item.key = index
                })
                let obj = {
                  type: this.state.type,
                  serviceName: this.state.serviceName,
                  handleState: this.state.index,
                  money: this.state.first,
                  money2: this.state.two,
                  start: this.state.start,
                  end: this.state.end
                }
                let startTime = new Date(obj.start) * 1;
                let endTime = new Date(obj.end) * 1
                let arr = data.data.filter((item) => {
                
                  if(obj.money&&obj.money2){
                    if(item.money>obj.money2||item.money<obj.money){
                      return false
                    }
                  }
                  let newDate = new Date(item.date) * 1
                  if (startTime && endTime) {
                    if (newDate > endTime || newDate < startTime) {
                      return false
                    }
                  }

                  if (obj.type !== "" && obj.type !== "请选择类型") {
                    if (obj.type !== item.type) {
                      return false
                    }
                  }

                  if (obj.serviceName !== "" && obj.serviceName !== '请选择客服') {
                    if (obj.serviceName !== item.serviceName) {
                      return false
                    }
                  }
                  if (obj.handleState !== "" && obj.handleState !== '0') {
                    if (obj.handleState !== item.handleState) {
                      return false
                    }
                  }
                  return true
                })
                this.setState({
                  data: arr
                })
                console.log(this.state.data)
              })

            }}>查询</Button>
  </div>
  <div className="item">
  <Table pagination={{pageSize:5}} columns={this.state.columns} dataSource={this.state.data} />

          </div>
    </div>
    </div>

   
  )
}
}