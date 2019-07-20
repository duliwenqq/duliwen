import React, { Component } from 'react'
import { Button } from 'antd';

export default class settings extends Component {
  render() {
    console.log(this.props.location.state);
    let {exp,facePhoto}=this.props.location.state;
    return (
      <div className="settings">
       <div className="logo">
       <span><img src={facePhoto}/></span>
       <p>{exp}</p>
          
          </div> 
           <Button>更改</Button>
      </div>
    )
  }
}
