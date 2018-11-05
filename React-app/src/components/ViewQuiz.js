import React, { Component } from 'react';
import './ViewPeople.css';


class ViewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      data1:[],
      Id: -1,
      clicked : false,
    }
    this.handleID = this.handleID.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  handleID(id,name) {
    console.log("sada",id)
    this.setState({clicked:!this.state.clicked});
    this.setState({Id:name});
    fetch('http://localhost:8080/quiz/' + id, {
     method: 'GET',
   })
   .then(response=>response.json())
      .then(data => {

          this.setState({data1:data});
      });
    console.log("click: ",this.state.clicked);
    
  }
  handleBack(){
    this.setState({clicked:!this.state.clicked})
  }
  handleDelete(quiz){
    fetch('http://localhost:8080/quiz/' + quiz.ID, {
      method:'DELETE',
    })
    .then(response=>response.json())
    .then(data=>{console.log(data);
        console.log(quiz.Name)
    })
    this.setState({clicked:!this.state.clicked})
     //window.location.reload()
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
  }else {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quizzes under {this.state.Id}</h1>
        </header>
        <br/><br/>
        <table>
            <thead>
                <tr>
                    <th>QuizName</th>
                    <th>Delete</th>
                </tr>

            </thead>
        <tbody>{this.state.data1.map((item,key)=>{
          return(
            
            <tr key={key} >
              <td>{item.Name}</td>
              <td><button className="btn btn-default" onClick={()=>this.handleDelete(item)}>DeleteQuiz</button></td>
             </tr>
          
        );})

        }
        </tbody>
        </table>
        <button className="btn btn-primary" onClick={this.handleBack}>Back</button>
        </div>

    )
  }
  }
}

export default ViewQuiz;
