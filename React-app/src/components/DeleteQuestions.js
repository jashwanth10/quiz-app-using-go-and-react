import React, { Component } from 'react';
import './ViewPeople.css';


class DeleteQuestions extends Component {
  constructor() {
    super();
    this.state = {
       clicked:false, 
        data1:[],
        data:[],
        deleted:false,
    },
    this.handleID = this.handleID.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDelOther = this.handleDelOther.bind(this)
    
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  handleID(id,name) {
    this.setState({clicked:!this.state.clicked});
    this.setState({Id:name});
    console.log("id:=",id);
    fetch('http://localhost:8080/question/' + id, {
     method: 'GET',
   })
   .then(response=>response.json())
      .then(data => {
          console.log("data1:",data);
          this.setState({data1:data})
      });
  }
  handleDelOther(){
      this.setState({deleted:false})
      this.setState({clicked:false})
  }
  handleDelete(id){
      this.setState({deleted:true})
    fetch('http://localhost:8080/question/' + id, {
        method: 'DELETE',
      })
      .then(response=>response.json())
         .then(data => {
             console.log("data1:",data);

         });
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




render() {
    if(this.state.deleted === true){
        return(
            <div>
            <h2>Deleted Successsfully!!</h2>
            <button type="submit" onClick={this.handleDelOther} className="btn btn-primary">Delete Other Question</button>
            </div>
        );
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

             <button type="submit" className="btn btn-primary" onClick={()=>this.handleDelete(item.ID)}>Delete</button>

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

export default DeleteQuestions;