import { Redirect } from 'react-router-dom'
import React,{ Component } from 'react'
class Logout extends Component{
  constructor(){
    super()
    this.LogoutHandler = this.LogoutHandler.bind('this')
  }
  LogoutHandler(){
    localStorage.clear()
    window.location.reload()
  }
  componentDidMount(){
    this.LogoutHandler()
    localStorage.clear()
    window.location.reload()


  }
      render(){
      return(
        <div>
           <Redirect to = '/'></Redirect>
         </div>
       );
     }

}
export default Logout