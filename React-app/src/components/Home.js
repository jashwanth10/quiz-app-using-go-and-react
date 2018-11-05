import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quiz-APP</h1>
        </header>
        <NewComponent text={""}/>
        {localStorage.getItem('user') &&
            <header className="App-header">
            <h1 className="App-title">{localStorage.getItem('user')} is Logged in!!</h1>
            </header>
        }
      </div>
    );
  }
}

export default Home;
