import Mock from "mockjs"
import {createStore} from "redux"
let data=Mock.mock({
     
})
let defaultData={
     data:data.list,
     List:[],
     dks:[]
}
let reducer=(state=defaultData,action)=>{
   let newData=JSON.parse(JSON.stringify(state))
   switch(action.type){
     case "ADD":
     let ind=newData.List.findIndex(item=>item.title==action.obj.title)
     console.log(ind)
     if(ind==-1){
           newData.List.push(action.obj)
     }
     newData.List.map((item,index)=>{
           item.id=index
     })
     break;
     case "Remove":
     newData.List.splice(action.ind,1);
     newData.List.map((item,index)=>{
      item.id=index
})
break;
    case "XX":
    newData.dks.push(action.data)
     break;
     case "ZZ":
     newData.dks=action.data
   }
   return newData
}
let store=createStore(reducer)
export default store