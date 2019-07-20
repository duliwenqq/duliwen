import React, { Component } from 'react'
import {Provider} from "react-redux"
import store from "./store/store"
import Pei from "./component/Pei"
import "./App.css"
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Pei/>
       </Provider>
    )
  }
}
