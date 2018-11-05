import React, { Component } from 'react';
import './ViewPeople.css';


class LeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      data1:[],
      leaderboard1:[],
      Id: -1,
      genreclicked:false,
      clicked1 : false,
    }
    this.handleGenre = this.handleGenre.bind(this)
    this.handleGenreScore = this.handleGenreScore.bind(this)
    this.handleAll = this.handleAll.bind(this)

  }
  handleGenre(){
      this.setState({genreclicked:true})

  }
  handleAll(){
      this.setState({allclicked:true})
      fetch('http://localhost:8080/leaderall/', {
          method:'GET',
      })
      .then(response => response.json())
      .then(data => {
          console.log(data)
          this.setState({data1:data})
      })
  }
  handleGenreScore(genre){
     fetch('http://localhost:8080/leader/' + genre.ID, {
         method : 'GET',
     })
     .then(response => response.json())
     .then(data => {
        console.log(data); 
        this.setState({leaderboard1:data});
        this.setState({clicked1:true});
     })
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount(){
    console.log("ucidsi")

    fetch('http://localhost:8080/genre/', {
     method: 'GET',
    
   }).then(response => response.json())
   .then(data => {
        this.setState({data:data});
        console.log(data);
        }
   )
  
}

render() {
    if(this.state.allclicked === true){
        return (
            <div className="App">
        <header className="App-header">
          <h1 className="App-title">Total Score Accross All Genres</h1>
        </header>
        <br/><br/>
        <table>
            <thead>
                <tr>
                <th>Username</th>
                <th>Score</th>
                </tr>
            </thead>
        <tbody>{this.state.data1.map((item,key)=>{
           
          return(
            <tr key={key}>
              <td>{item.Name}</td>
              <td>{item.Total}</td>            
            </tr>
          
        );})

        }

        </tbody>
        </table>
        
      <br/><br/>
      </div>
        );
    }
    else if(this.state.clicked1 === true ){
        return (
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quizzes You Attempted</h1>
        </header>
        <br/><br/>
        <table>
            <thead>
                <tr>
                <th>Username</th>
                <th>Score</th>
                </tr>
            </thead>
        <tbody>{this.state.leaderboard1.map((item,key)=>{
           
          return(
            <tr key={key}>
              <td>{item.Username}</td>
              <td>{item.Score}</td>            
            </tr>
          
        );})

        }

        </tbody>
        </table>
        
      <br/><br/>
      </div>
        );
    }
    else if(this.state.genreclicked === true){
        return(
            <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select the Genre</h1>
        </header>
        <br/><br/>
        <div>{this.state.data.map((item,key)=>{
          return(
            <div key={key}>
              <h2>{item.Name}</h2>
              <button className="btn btn-primary" onClick={()=>this.handleGenreScore(item)}>Click</button>
            </div>
        );})

        }

        </div>

      </div>
        );
    }else{
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select The Type Of LeaderBoard</h1>
        </header>
        <br/><br/>
        
        <div>
        
            <div >
              <button type="submit" onClick={this.handleGenre} className="btn btn-primary">Genre LeaderBoard</button>        
               <button type="submit" onClick={this.handleAll} className="btn btn-primary">Total LeaderBoard</button> 
            </div>
          
        

    
        </div>
    
        
      <br/><br/>
      </div>
    
    );
    }
  }

  
}

export default LeaderBoard;