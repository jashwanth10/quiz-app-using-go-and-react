import React, { Component } from 'react';
import './ViewPeople.css';


class MyQuizzes extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      data1:[],
      Id: -1,
      clicked : false,
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount(){
    console.log("ucidsi")
    if(this.state.clicked === false){
    fetch('http://localhost:8080/userquiz/', {
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quizzes You Attempted</h1>
        </header>
        <br/><br/>
        <table>
            <thead>
                <tr>
                <th>Quiz</th>
                <th>Score</th>
                </tr>
            </thead>
        <tbody>{this.state.data.map((item,key)=>{
            if(item.Username === localStorage.getItem('user')){
          return(
            <tr key={key}>
              <td>{item.Quizname}</td>
              <td>{item.Score}</td>            
            </tr>
          
        );}})

        }

        </tbody>
        </table>
        
      <br/><br/>
      </div>

    )
  }
  
}

export default MyQuizzes;