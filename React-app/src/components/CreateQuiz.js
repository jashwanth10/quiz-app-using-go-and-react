import React, { Component } from 'react';
import './NewPerson.css';
import { Redirect } from 'react-router-dom';
class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name:"",
        genreid:-1,
      },
      submitted: false,
      data:[],
      clicked :false,
      Id: -1,
      quiz:false,
      status:-1,
    }
    this.handleID = this.handleID.bind(this)
    this.handleFChange = this.handleFChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleID(id) {
    
    if(id == -2){
      this.setState({clicked:false});
      this.setState({quiz:false});
    }else{
      this.setState({clicked:!this.state.clicked});
     this.setState({Id:id});
    
    }
    console.log("click: ",this.state.clicked);
    console.log("ID1 = ",this.state.Id);
    console.log("ID2 = ",id);
  }
  handleFChange(event){
    this.state.formData.name = event.target.value;
  }
  handleSubmit (event) {
    this.state.formData.genreid = this.state.Id;
    this.setState({quiz:!this.state.quiz})
    event.preventDefault();
    fetch('http://localhost:8080/genre/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
   .then(response=>response.json())
      .then(data => {
          console.log("data:",data);
          this.setState({status:data})
      });
  }
  componentDidMount(){
    console.log("ucidsi")
    if(this.state.clicked === false){
    fetch('http://localhost:8080/genre/', {
     method: 'GET',
    
   }).then(response => response.json())
   .then(data => {
        this.setState({data:data});
        console.log(data);
  }

   )
  }
}
  render() {
    if(this.state.quiz === true && this.state.status == 2){
      return(
        <div className="App">
          <h1>Quiz Created!!</h1>
            <button type="submit" className="btn btn-default" onClick={()=>this.handleID(-2)}>Back</button>
        </div>
      );
    }else if(this.state.status == 0){
      return(
        <div className="App">
          <h1>Quiz Name Already Exists!!</h1>
            <button type="submit" className="btn btn-default" onClick={()=>this.handleID(-2)}>Back</button>
        </div>
      );
    }else if(this.state.status == 1){
      return(
        <div className="App">
          <h1>Enter Valid Quiz Name!!</h1>
            <button type="submit" className="btn btn-default" onClick={()=>this.handleID(-2)}>Back</button>
        </div>
      );
    }
    else if(this.state.clicked === false){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select the Genre</h1>
        </header>
        <br/><br/>
        <div>{this.state.data.map((item,key)=>{
          return(
            <div key={key}>
              <h2>{item.Name}</h2>
              <button className="btn btn-primary" onClick={()=>this.handleID(item.ID)}>Click</button>
            </div>
        );})

        }

        </div>

      </div>
    );
  }else {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Quiz Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleFChange}/>
            </div>  
                <button type="submit" className="btn btn-default">Submit</button>
          </form>

        </div>
       
      <br/><br/>
      <button type="submit" className="btn btn-default" onClick={this.handleID}>Back</button>
      </div>

    )
  }
  }
}

export default CreateQuiz;