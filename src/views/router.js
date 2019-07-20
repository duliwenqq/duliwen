import React from 'react'
import loadable from "react-loadable"
function loading(){
      return <div>loading</div>
}
let Home=loadable({
    loader:()=>import ("../router/Home"),
    loading:loading
})
let login=loadable({
    loader:()=>import ("../router/login"),
    loading:loading
})
let settings=loadable({
    loader:()=>import ("../router/settings"),
    loading:loading
})
let index=loadable({
    loader:()=>import ("../router/index"),
    loading:loading
})
let List=loadable({
    loader:()=>import ("../router/List"),
    loading:loading
})
let Bao=loadable({
    loader:()=>import ("../router/List/Bao"),
    loading:loading
})
let Dai=loadable({
    loader:()=>import ("../router/List/Dai"),
    loading:loading
})
let Zhuan=loadable({
    loader:()=>import ("../router/List/Zhuan"),
    loading:loading
})
export const routes=[
    {
         path:'/Home',
         component:Home,
         children:[{
            path:'/Home/index',
            component:index
         },{
            path:"/Home",
            redirect:'/Home/index'
        },
             {
            
                    path:'/Home/settings',
                    component:settings
                   
             },{
                path:'/Home/List',
                component:List,
                children:[
                    {
                        path:'/Home/List/Bao',
                        component:Bao
                    },{
                        path:'/Home/List/Dai',
                        component:Dai
                    },{
                        path:'/Home/List/Zhuan',
                        component:Zhuan
                    },{
                        path:'/Home/List',
                        redirect:'/Home/List/Dai'
                    }
                ]
             }
         ]
    },{
        path:'/login',
        component:login
   },{
       path:'/',
       redirect:'/Home'
   }
]