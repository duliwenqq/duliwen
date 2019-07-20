import React, { Component } from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import Routerviews from "../views/viewrouterconfig.jsx"
import {routes} from "../views/router"
export default class Pei extends Component {
  render() {
    return (
      <Router>
        <Routerviews  routes={routes}></Routerviews>
      </Router>
    )
  }
}
