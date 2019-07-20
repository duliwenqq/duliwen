import React, { Component,Fragment } from 'react'
import {Switch,Route,Redirect} from "react-router-dom"
 class routerview extends Component {
  render() {
      let routes=this.props.routes;
      let arrRoutes=routes.filter(item=>item.redirect)
      let Redirects=arrRoutes.map((item,index)=>{
            return <Redirect from={item.path} exact to={item.redirect} key={index}/>
      })
      routes=routes.filter(item=>!item.redirect)
    return (
      <Switch>
        {
             routes.map((item,index)=>{
                 return <Route key={index} path={item.path} render={(props)=>{
                     return <Fragment>
                       {
                           item.children&&<item.component children={item.children} {...props}/>
                       }
                       {
                           !item.children&&<item.component {...props}/>
                       }

                     </Fragment>
                  
                 }}/>
             })
        }
        {
            Redirects.length!==0&&Redirects
        }
      </Switch>
    )
  }
}
export default routerview