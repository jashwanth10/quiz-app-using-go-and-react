import React, { Component } from 'react';
import './NewPerson.css';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        password: "",
      },
      data : -1,
      passwordError: false,
      usernameError:false,
      submitted: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/user/', {
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
    if(this.state.data === 0){
      this.setState({passwordError:false});
      this.setState({usernameError:true});
      this.setState({submitted:false});
    }else if(this.state.data === 1){
      this.setState({usernameError:false});
      this.setState({submitted:false});
      this.setState({passwordError:true});
    }else if(this.state.data === 2){
      this.setState({passwordError:false});
      this.setState({usernameError:false});
      this.setState({submitted:true});
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
          <h1 className="App-title">Create a New Person</h1>
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
        {this.state.passwordError &&
          <h2>Password must be greater than 8 characters!!</h2>
        }
        {this.state.usernameError &&
          <h2>Username Already Exists!!</h2>
        }
        {this.state.submitted &&
          <Redirect to ='/Login'></Redirect>
        }
        <a href={'/Login'} className="container-fluid">Login </a>
       
        
      </div>
    );
  }
}

export default Register;
