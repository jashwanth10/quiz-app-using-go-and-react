import React, { Component } from 'react';
import './NewPerson.css';
import { Redirect } from 'react-router-dom';
class CreateQuestions extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        question:"",
        optiona:"",
        answera:false,
        optionb:"",
        answerb:false,
        optionc:"",
        answerc:false,
        optiond:"",
        answerd:false,
        type:-1,
        quizid:-1,
      },
      type: -1,
      submitted: false,
      data:[],
      clicked :false,
      quizId: -1,
      quiz:false,
      status:-1,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleID = this.handleID.bind(this)
    this.handleQtype = this.handleQtype.bind(this)
    this.handleQChange = this.handleQChange.bind(this)
    this.handleOAChange = this.handleOAChange.bind(this)
    this.handleOBChange = this.handleOBChange.bind(this)
    this.handleOCChange = this.handleOCChange.bind(this)
    this.handleODChange = this.handleODChange.bind(this)
    this.handleAAChange = this.handleAAChange.bind(this)
    this.handleABChange = this.handleABChange.bind(this)
    this.handleACChange = this.handleACChange.bind(this)
    this.handleADChange = this.handleABChange.bind(this)
  }
  handleID(id) {
    
    if(id == -2){
      this.setState({clicked:false});
      this.setState({quiz:false});
    }else{
      this.setState({clicked:!this.state.clicked});
     this.setState({quizId:id});
    
    }
    console.log("click: ",this.state.clicked);
    console.log("ID1 = ",this.state.Id);
    console.log("ID2 = ",id);
  }
  handleQChange(event){
    this.state.formData.question = event.target.value;
  }
  handleOAChange(event){
      this.state.formData.optiona = event.target.value;
  }
  handleOBChange(event){
      this.state.formData.optionb = event.target.value;
      
  }
  handleOCChange(event){
      this.state.formData.optionc = event.target.value;
  }
  handleODChange(event){
    this.state.formData.optiond = event.target.value;
  }
  handleAAChange(event){

      this.state.formData.answera = event.target.checked;
      if(this.state.type === 1){
        this.state.formData.answerb = false
        this.state.formData.answerc = false
        this.state.formData.answerd = false
    }
  }
  handleABChange(event){
      this.state.formData.answerb = event.target.checked;
      if(this.state.type === 1){
        this.state.formData.answera = false
        this.state.formData.answerc = false
        this.state.formData.answerd = false
    }
  }
  handleACChange(event){
      this.state.formData.answerc = event.target.checked;
      if(this.state.type === 1){
        this.state.formData.answerb = false
        this.state.formData.answera = false
        this.state.formData.answerd = false
    }
  }
  handleADChange(event){
    this.state.formData.answerd = event.target.checked;
    if(this.state.type === 1){
        this.state.formData.answerb = false
        this.state.formData.answerc = false
        this.state.formData.answera = false
    }
  }
  handleQtype(event){
     var number = parseInt(event.target.id,10) 
     this.setState({quizId:number})
     console.log(event.target.id)
     if(event.target.value == "Single"){
         this.setState({type:1});
     } else {
         this.setState({type:2});
     }
  }


  handleSubmit (event) {
    this.setState({submitted:true})
    this.state.formData.quizid = this.state.quizId;
    this.state.formData.type = this.state.type;
    console.log(this.state.formData.quizid)
    event.preventDefault();
    this.setState({submitted:true})
    fetch('http://localhost:8080/questions/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
   .then(response=>response.json())
      .then(data => {
          console.log("data:",data);
      });
      if(document.getElementById("clear")!=null)document.getElementById("clear").reset()
  }
  componentDidMount(){
    console.log("ucidsi")
    
    fetch('http://localhost:8080/quiz/', {
     method: 'GET',
    
   })
   .then(response => response.json())
   .then(data => {
        this.setState({data:data});
        console.log(data);
    })
  
}
  render() {
           return(
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/><br/>
        <div>{this.state.data.map((item,key)=>{
            return(
                <div key={key}>
                <h2>{item.Name}</h2>
                <input type="radio" id ={item.ID} name="select" onChange={this.handleQtype} value="Single"/>Single<br/>
                <input type="radio" id ={item.ID} name="select" onChange={this.handleQtype} value="Multiple"/>Multiple<br/>           
                    
                </div>
            );})}

            </div>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit} id="clear">
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input type="text" className="form-control" value={this.state.optiona} onChange={this.handleOAChange}/>
                {this.state.type == 1 ? (
                    <input type="radio" name="option" onClick={this.handleAAChange}></input>
                ) : (
                    <input type="checkbox" onClick={this.handleAAChange}></input>
                )}
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input type="text" className="form-control" value={this.state.optionb} onChange={this.handleOBChange}/>
                {this.state.type == 1 ? (
                    <input type="radio" name="option" onClick={this.handleABChange}></input>
                ) : (
                    <input type="checkbox" onClick={this.handleABChange}></input>
                )}
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input type="text" className="form-control" value={this.state.optionc} onChange={this.handleOCChange}/>
                {this.state.type == 1 ? (
                    <input type="radio" name="option" onClick={this.handleACChange}></input>
                ) : (
                    <input type="checkbox" onClick={this.handleACChange}></input>
                )}
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input type="text" className="form-control" value={this.state.optiond} onChange={this.handleODChange}/>
                {this.state.type == 1 ? (
                    <input type="radio" name="option" onClick={this.handleADChange}></input>
                ) : (
                    <input type="checkbox" onClick={this.handleADChange}></input>
                )}
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        {this.state.submitted &&
            <h2>New Question Added Succesfully</h2>
        }
        </div>
           );
       
       
  }

}

export default CreateQuestions;