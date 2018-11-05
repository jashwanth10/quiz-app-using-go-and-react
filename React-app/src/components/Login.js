import React, { Component } from 'react';
import './NewPerson.css';
import Register from './Register'
import { Redirect } from 'react-router-dom';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        password: "",
      },
      data : -1,
      passwordError: false,
      submitted: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/login/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => response.json())
      .then(data => {
           console.log(data);
           this.setState({data:data});
           this.handleValue();
      
    });
  }
  handleValue(){
    if(this.state.data === 1){
      this.setState({passwordError:true});
      this.setState({submitted:false});
    }else if(this.state.data === 0){
      localStorage.setItem('user',this.state.formData.name);
      
      window.location.reload()
    }
  }
  handleUChange(event) {
    this.state.formData.name = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login into Your Accout</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>User Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="Password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        
        
        {localStorage.getItem('user') &&
          <Redirect to ='/'></Redirect>
        }
        {this.state.passwordError &&
            <h2>UserName Password mismatch!!</h2>
        }
        <a href={'/Register'} className="container-fluid">Register</a>
       
        
      </div>
    );
  }
}

export default Login;