import React, { Component } from 'react'
import { Menu, Button } from 'antd';
import RouterView from "../views/viewrouterconfig.jsx"
// import { NavLink } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import {connect} from "react-redux"
// import {routes} from "../views/router" 
const { SubMenu } = Menu;
 class Home extends Component {
  constructor(props){
       super(props)
       this.state={
           data:{},
           one:'首页',
           two:'设置',
           three:"贷款订单",
           four:"转单订单",
           five:"保险订单",
           con:0
       }
  
      
  }
  handleClick = e => {
    console.log('click ', e)
  };
 
  render() {
     console.log(this.props.list.List)
    let list=this.props.list.List;
    return (
      <div className="box">
        <div className="left">
          <div className="logo">
            <span><img src={this.state.data.facePhoto}/></span>
            <p>{this.state.data.exp}</p>
          </div>
          <div style={{ width: 210 }}>
            <Button type="primary" onClick={()=>{
                 this.props.history.push('/login')
            }}>
              退出
    </Button>
            <Button>设置</Button>
            
            <Menu defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="dark">
              <Menu.Item key="1"><span onClick={()=>{
                this.props.history.push("/Home/index")
                this.props.add({title:this.state.one,path:"/Home/index"})
               }}>首页</span></Menu.Item>
              <Menu.Item key="2"><span onClick={()=>{
                this.props.history.push("/Home/settings",this.state.data)
                this.props.add({title:this.state.two,path:"/Home/settings"})

                }}>设置</span></Menu.Item>
              <SubMenu key="sub1"title={
                  <span><span>订单管理</span></span>
                }>
                <Menu.Item key="5">
                <span onClick={()=>{
                this.props.history.push("/Home/List/Dai",this.state.data)
                this.props.add({title:this.state.three,path:"/Home/List/Dai"})

                }}>贷款订单</span>
                </Menu.Item>
                <Menu.Item key="6">
                <span onClick={()=>{
                this.props.history.push("/Home/List/Zhuan",this.state.data)
                this.props.add({title:this.state.four,path:"/Home/List/Zhuan"})

                }}>转单订单</span>
                </Menu.Item>
                <Menu.Item key="7">
                <span onClick={()=>{
                this.props.history.push("/Home/List/Bao",this.state.data)
                this.props.add({title:this.state.five,path:"/Home/List/Bao"})

                }}>保险订单</span>
                </Menu.Item>

              </SubMenu>

            </Menu>
           
          </div>



        </div>
        <div className="right">
          <div className="top">
            {
              list.map((item,index)=>{
                  return <p  className={index==this.state.con?"active":""} key={index} onClick={()=>{
                     this.props.history.push(item.path,this.state.data)
                     this.setState({
                        con:index
                     })
                  }}>{item.title}<span onClick={()=>{
                        this.props.remove(item.id) ;
                        console.log(item.id)
                  }}>&times;</span></p>
              })
            }
          
          </div>
          <div className="bot">

            <RouterView routes={this.props.children}></RouterView>
          </div>

        </div>
      </div>

    )
  }
  componentDidMount() {


    if (Cookies.get("authorization")) {
      
      axios.defaults.headers.common['authorization'] = Cookies.get("authorization");
      axios.get(`http://localhost:3000/api/islogin`).then(({ data }) => {
        // console.log(data.info.exp);
        this.setState({
          data:data.info
        })
        
        
        
      })
    } else {
      this.props.history.push('/login')
    }
  }
 
}
let mapStateToProps=(state)=>{
   return {
        list:{
             ...state
        }
   }
}
let mapDispatchToProps=(dispatch)=>{
     return {
          add:(obj)=>{
            dispatch({type:"ADD",obj})
          },
          remove:(ind)=>{
               dispatch({type:'Remove',ind})
          }
     }
}
export default connect(mapStateToProps,mapDispatchToProps) (Home)
