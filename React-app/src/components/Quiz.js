import React, { Component } from 'react';
import './ViewPeople.css';
import {Redirect} from 'react-router-dom'

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      data1:[],
      data2:[],
      scores:[],
      userquiz:{
        username:"",
        quizname:"",
        genreid:"",
        score:"",
      },
      a:false,
      b:false,
      c:false,
      d:false,
      score : 0,
      clicked : false,
      startquiz: false,
      quiztype: -1,
      Id:"",
      submitted:false,
      Error:false,
      i : 0,
    }
    this.handleID = this.handleID.bind(this)
    this.handleAttempt = this.handleAttempt.bind(this)
    this.handleType = this.handleType.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleAchange = this.handleAchange.bind(this)
    this.handleBchange = this.handleBchange.bind(this)
    this.handleCchange = this.handleCchange.bind(this)
    this.handleDchange = this.handleDchange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  handleID(id,name) {
    console.log("sada",id)
    this.state.userquiz.genreid = id;
    this.setState({clicked:!this.state.clicked});
    this.setState({Id:name});
    fetch('http://localhost:8080/quiz/' + id, {
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
  handleAttempt(item,type){
    this.setState({startquiz:true})
    this.state.quiztype = type  
    this.state.userquiz.quizname = item.Name
    this.state.userquiz.username = localStorage.getItem("user")
    fetch('http://localhost:8080/question/' + item.ID, {
     method: 'GET',
   })
   .then(response=>response.json())
      .then(data => {
          console.log("dataasa:",data);
          this.setState({data2:data});
          this.handleType();
      });
      

  }
  handleType(){
      fetch('http://localhost:8080/userquiz/', {
         method:'GET', 
      })
      .then(response => response.json())
      .then(data => {
          console.log(data)
          this.setState({scores:data})
          this.handleData(data)
      })
  }
  handleData(data){
      console.log("hihi",data);
    for(let i=0;i<data.length;i++){
        console.log("bro:",data[i].Username)
        if(data[i].Username == this.state.userquiz.username && data[i].Quizname == this.state.userquiz.quizname){
            this.setState({Error:true})
            console.log("fuck")
        }
    }
  }
  handleSubmit(question){
      this.setState({submitted:true});
      if(question.Answera == this.state.a && question.Answerb == this.state.b && question.Answerc == this.state.c && question.Answerd == this.state.d){
        this.state.userquiz.score = this.state.score + 1
     }else{
      this.state.userquiz.score = this.state.score
     }
      fetch('http://localhost:8080/userquiz/',{
          method:'POST',
          body:JSON.stringify(this.state.userquiz)
      }).then(response => response.json())
      .then(data=>console.log(data))
  }
  handleAchange(type){
      console.log("a")
      this.state.a = true
      if(type==1){
        this.state.b = false
        this.state.c = false
        this.state.d = false

      }
  }
  handleBchange(type){
      console.log("b")
      this.state.b = true
      if(type==1){
        this.state.a = false
        this.state.c = false
        this.state.d = false

      }
 }
 handleDchange(type){
    console.log("d")
    this.state.d = true
    if(type==1){
      this.state.b = false
      this.state.c = false
      this.state.a = false

    }
}
 handleCchange(type){
     console.log("c")
     this.state.c = true
     if(type==1){
       this.state.b = false
       this.state.a = false
       this.state.d = false

     }
 }

handleNext(question){
    console.log("cscsac")
    this.setState({i:this.state.i + 1})
    if(question.Answera == this.state.a && question.Answerb == this.state.b && question.Answerc == this.state.c && question.Answerd == this.state.d){
       this.state.score = this.state.score + 1
    }
    this.setState({a:false})
    this.setState({b:false})  
    this.setState({d:false})
    this.setState({c:false})

    if(document.getElementById("1")!=null)document.getElementById("1").reset()
    if(document.getElementById("2")!=null)document.getElementById("2").reset()

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
    if(this.state.Error === true){
        return(
           <div>
            <h1>You Already Attempted the Quiz</h1>
            <a href='/'>Go to Home</a>
            </div>
        );
    }else if(this.state.startquiz === true){
    return(
        <div className="App">
        
    {this.state.i < this.state.data2.length &&
        
            <div>
            <h1>{this.state.data2[this.state.i].Question}</h1>
            {this.state.data2[this.state.i].Type === 1  ? (
            <form id = "1">
            
            <h2>{this.state.data2[this.state.i].Optiona}</h2>
            <input type="radio" name="option" onClick={()=>this.handleAchange(1)} ></input>
            
            <h2>{this.state.data2[this.state.i].Optionb}</h2>
            <input type="radio" name="option" onClick={()=>this.handleBchange(1)} ></input>
            
            <h2>{this.state.data2[this.state.i].Optionc}</h2>
            <input type="radio" name="option" onClick={()=>this.handleCchange(1)} ></input>
          
            <h2>{this.state.data2[this.state.i].Optiond}</h2>
            <input type="radio" name="option" onClick={()=>this.handleDchange(1)} ></input>
            </form> ) : (
                <form id = "2">
            
                <h2>{this.state.data2[this.state.i].Optiona}</h2>
                <input type="checkbox" onClick={()=>this.handleAchange(2)} ></input>
                
                <h2>{this.state.data2[this.state.i].Optionb}</h2>
                <input type="checkbox" onClick={()=>this.handleBchange(2)}></input>
            
                <h2>{this.state.data2[this.state.i].Optionc}</h2>
                <input type="checkbox" onClick={()=>this.handleCchange(2)}></input>
        
                <h2>{this.state.data2[this.state.i].Optiond}</h2>
                <input type="checkbox" onClick={()=>this.handleDchange(2)}></input>
                
                </form>
            )
                
            }
            {this.state.i < this.state.data2.length - 1 ?(
            <button type="submit" className="btn btn-primary" onClick={()=>this.handleNext(this.state.data2[this.state.i])}>Next</button>
            ):(
            <button type="submit" className="btn btn-primary" onClick={()=>this.handleSubmit(this.state.data2[this.state.i])}>Submit</button>                
            )

            }
            {this.state.submitted &&
                <Redirect to='/MyQuizz'></Redirect>
            }   
        </div>
        

    }
    </div>);


 }else if(this.state.clicked === false){
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
  }else {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quizzes under {this.state.Id}</h1>
        </header>
        <br/><br/>
        <div>{this.state.data1.map((item,key)=>{
          return(
            
            <div key={key} className="row">
              <div className="col-sm">
              <h2>{item.Name}</h2>
              </div>
              <div className="col-sm">
              <button className="btn btn-default" onClick={()=>this.handleAttempt(item,1)}>Attempt</button>
              </div>
            </div>
          
        );})

        }

        </div>
        
      <br/><br/>
      <button type="submit" className="btn btn-default" onClick={this.handleID}>Back</button>
      </div>

    )
  }
  }
}

export default Quiz;





