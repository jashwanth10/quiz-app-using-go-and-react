import React, { Component } from 'react';
import './ViewPeople.css';


class EditQuestions extends Component {
  constructor() {
    super();
    this.state = {
      questionData:{
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
      ID:-1,
      edit:false,
      data: [],
      data1:[],
      Id: -1,
      clicked : false,
    }
    this.handleID = this.handleID.bind(this)
    this.handleID2 = this.handleID2.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  handleID(id,name) {
    this.setState({clicked:!this.state.clicked});
    this.setState({Id:name});
    console.log("id:=",typeof id)
    fetch('http://localhost:8080/question/' + id, {
     method: 'GET',
   })
   .then(response=>response.json())
      .then(data => {
          console.log("data1:",data);
          this.setState({data1:data});
      });
    console.log("click: ",this.state.clicked);
    console.log("ID1 = ",this.state.Id);
    console.log("ID2 = ",id);
  }
  handleID2(){
    this.setState({clicked:!this.state.clicked}); 
  }
  handleSubmit(event) {
      event.preventDefault()
    fetch('http://localhost:8080/question/' + this.state.ID, {
     method: 'PUT',
     body:JSON.stringify(this.state.questionData),
   })
   .then(response=>response.json())
      .then(data => {
          console.log("data1:",data);
          
      });
      this.setState({edit:false})
    console.log("click: ",this.state.clicked);
    console.log("ID1 = ",this.state.Id);
  }
  componentDidMount(){


    fetch('http://localhost:8080/quiz/', {
     method: 'GET',
    
   }).then(response => response.json())
   .then(data => {
        this.setState({data:data});
        console.log(data);
        }
   )
  
}
handleEdit(item){
    this.setState({edit : true})
    this.setState({questionData:item})
    
    this.setState({ID:item.ID})
    console.log("ID: ",typeof item.ID)

}
handleQChange(event){
    console.log(this.state.questionData)
    this.state.questionData.Question = event.target.value;
  }
  handleOAChange(event){
      this.state.questionData.Optiona = event.target.value;
  }
  handleOBChange(event){
      this.state.questionData.Optionb = event.target.value;
      
  }
  handleOCChange(event){
      this.state.questionData.Optionc = event.target.value;
  }
  handleODChange(event){
    this.state.questionData.Optiond = event.target.value;
  }
  handleAAChange(event){

    this.state.questionData.Answera = event.target.checked;
    if(this.state.questionData.Type === 1){
        this.state.questionData.Answerb = false
        this.state.questionData.Answerc = false
        this.state.questionData.Answerd = false
    }
}
handleABChange(event){
    this.state.questionData.Answerb = event.target.checked;
    if(this.state.questionData.Type === 1){
      this.state.questionData.Answera = false
      this.state.questionData.Answerc = false
      this.state.questionData.Answerd = false
  }
}
handleACChange(event){
    this.state.questionData.Answerc = event.target.checked;
    if(this.state.questionData.Type === 1){
        this.state.questionData.Answera = false
        this.state.questionData.Answerb = false
        this.state.questionData.Answerd = false
    }
}
handleADChange(event){
  this.state.questionData.Answerd = event.target.checked;
  if(this.state.questionData.Type === 1){
    this.state.questionData.Answera = false
    this.state.questionData.Answerc = false
    this.state.questionData.Answerb = false
}
}


render() {
    if(this.state.clicked === false){
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
              <button className="btn btn-primary" onClick={()=>this.handleID(item.ID,item.Name)}>Click</button>
            </div>
        );})

        }

        </div>

      </div>
    );
  }else if(this.state.edit === false){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Questions under {this.state.Id}</h1>
        </header>
        <br/><br/>
        <div>{this.state.data1.map((item,key)=>{
          return(
            
            <div key={key} >
              <div>
              <h2>Question :- {item.Question}</h2>
              </div>
              <div >
              <h2>Option A:- {item.Optiona} {item.Answera && <p>True</p>}</h2>
              <br/><br/>
              <h2>Option B:- {item.Optionb} {item.Answerb && <p>True</p>}</h2>
              <br/><br/>
              <h2>Option C:- {item.Optionc} {item.Answerc && <p>True</p>}</h2>
              <br/><br/>
              <h2>Option D:- {item.Optiond} {item.Answerd && <p>True</p>}</h2>
              </div>

             <button type="submit" className="btn btn-primary" onClick={()=>this.handleEdit(item)}>Edit</button>

            </div>
          
        );})

        }

        </div>
       
      <br/><br/>
      <button type="submit" className="btn btn-default" onClick={this.handleID}>Back</button>
      </div>

    )
  } else {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Edit {this.state.Id}</h1>
          </header>
          <br/><br/>
          <div>
        
              <form onSubmit={this.handleSubmit} >
              <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange} placeholder= {this.state.questionData.Question}/>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input type="text" className="form-control" value={this.state.optiona} onChange={this.handleOAChange} placeholder= {this.state.questionData.Optiona}/>
                {this.state.questionData.Type == 1 ? (
                    <input type="radio" name="option" onChange={this.handleAAChange}></input>
                ) : (
                    <input type="checkbox" onChange={this.handleAAChange}></input>
                )}
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input type="text" className="form-control" value={this.state.optionb} onChange={this.handleOBChange} placeholder= {this.state.questionData.Optionb}/>
                {this.state.questionData.Type == 1 ? (
                    <input type="radio" name="option" onChange={this.handleABChange}></input>
                ) : (
                    <input type="checkbox" onChange={this.handleABChange}></input>
                )}
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input type="text" className="form-control" value={this.state.optionc} onChange={this.handleOCChange} placeholder= {this.state.questionData.Optionc}/>
                {this.state.questionData.Type == 1 ? (
                    <input type="radio" name="option" onChange={this.handleACChange}></input>
                ) : (
                    <input type="checkbox" onChange={this.handleACChange}></input>
                )}
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input type="text" className="form-control" value={this.state.optiond} onChange={this.handleODChange} placeholder= {this.state.questionData.Optiond}/>
                {this.state.questionData.Type == 1 ? (
                    <input type="radio" name="option" onChange={this.handleADChange}></input>
                ) : (
                    <input type="checkbox" onChange={this.handleADChange}></input>
                )}
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
  
              </form>
          </div>
         
        <br/><br/>
        <button type="submit" className="btn btn-default" onClick={this.handleID2}>Back</button>
        </div>
  
      )

  }
  
  }
}

export default EditQuestions;