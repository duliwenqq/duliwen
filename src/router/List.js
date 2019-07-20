import React, { Component } from 'react'
import RouterView from "../views/viewrouterconfig.jsx"

export default class List extends Component {
  render() {
    return (
      <div>
     
         <RouterView routes={this.props.children}></RouterView>
      </div>
    )
  }
}
