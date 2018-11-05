import React, { Component } from 'react';
import ViewPeople from './ViewPeople';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import CreateQuiz from './CreateQuiz';
import ViewQuiz from './ViewQuiz';
import CreateQuestions from './CreateQuestions';
import EditQuestions from './EditQuestions';
import DeleteQuestions from './DeleteQuestions';
import Users from './Users';
import Quiz from './Quiz';
import MyQuizzes from './MyQuizz'
import LeaderBoard from './Leaderboard'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    if(localStorage.getItem('user') === 'Admin'){
    
        return(       
          <div>
            
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>React App</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/CreateQuiz'}>CreateQuiz</Link></li>
                    <li><Link to={'/ViewQuiz'}>View/Delete Quiz</Link></li>
                    <li><Link to={'/CreateQuestions'}>Create Questions</Link></li>
                    <li><Link to={'/DeleteQuestions'}>View/Delete Questions</Link></li>
                    <li><Link to={'/EditQuestions'}>Edit Questions</Link></li>
                    <li><Link to={'/Users'}>Users</Link></li>
                    <li><Link to={'/Logout'}>Logout</Link></li>
                    
                    
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />  
                   <Route exact path='/ViewQuiz' component={ViewQuiz} />
                   <Route exact path='/CreateQuiz' component={CreateQuiz} />
                   <Route exact path='/CreateQuestions' component={CreateQuestions} />
                   <Route exact path='/EditQuestions' component={EditQuestions} />
                   <Route exact path='/DeleteQuestions' component={DeleteQuestions} />
                   <Route exact path='/Users' component={Users} />
                   <Route exact path='/Logout' component={Logout} />
              </Switch>
            </div>
          </Router>
        </div>

        )  
    
    }else if(localStorage.getItem('user')){
        return(       
          <div>
            
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>React App</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/Quiz'}>Quiz</Link></li>
                    <li><Link to={'/MyQuizz'}>My Quizzes</Link></li>
                    <li><Link to={'/LeaderBoard'}>LeaderBoard</Link></li>
                    <li><Link to={'/Logout'}>Logout</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />  
                   <Route exact path='/Quiz' component={Quiz} />
                   <Route exact path='/MyQuizz'component={MyQuizzes}/>
                   <Route exact path='/LeaderBoard'component={LeaderBoard}/>
                   <Route exact path='/Logout' component={Logout}/>
              </Switch>
            </div>
          </Router>
        </div>

        )  
    } else {
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>React App</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/Register'}>Register</Link></li>
                   
                    <li><Link to={'/Login'}>Login</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />
                   <Route exact path='/Register' component={Register} />    
                   <Route exact path='/Login' component={Login} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
    
  }
}

export default App;
