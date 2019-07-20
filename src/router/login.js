import React, { Component } from 'react'
import axios from "axios"
import Cookies from "js-cookie"
export default class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: "",
      psd: "",
      yzm: ""
    }
  }
 
     yz(){
     axios.get('http://localhost:3000/api/checkCode').then((res)=>{
         console.log(res.data);
         this.setState({
             yzm:res.data.Verification
         })
     })
     }
     dl(){
       {console.log(this.state)}
     axios.post('http://localhost:3000/api/login ',{phone:this.state.phone,password:this.state.psd,checkcode:this.state.yzm}).then(({data})=>{
        console.log(data);
        Cookies.set("authorization",data.sessionId);
        this.props.history.push('/Home')
     })
       

     }
  render() {
    return (
      <div className="login">
        <div className="left">
          <p>Welcome</p>
          <span>赚赚金融 开创信贷“1＋N”模式的综合互联网金融服务共享平台</span>
        </div>
        <div className="right">
          <div className="ipt">
            <div className="top">
              <span>赚</span>
              <p>赚赚金融渠道管理系统</p>
            </div>
            <div className="bot">
              <input type="text" placeholder="手机号" value={this.state.phone} onChange={(e) => {
                this.setState({
                  phone: e.target.value
                })
              }} />
              <input type="text" placeholder="登录密码" value={this.state.psd} onChange={(e) => {
                this.setState({
                  psd: e.target.value
                })
              }} />
              <div className="yz">
                <input type="text" placeholder="验证码" value={this.state.yzm} onChange={(e) => {
                  this.setState({
                    yzm: e.target.value
                  })
                }} />
                <p  onClick={this.yz.bind(this)}><span >{this.state.yzm}</span></p>
              </div>
              <button onClick={this.dl.bind(this)}>登录</button>

            </div>


          </div>
        </div>

      </div>
    )
  }
}
