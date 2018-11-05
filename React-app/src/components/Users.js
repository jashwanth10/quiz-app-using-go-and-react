import React, { Component } from 'react';
import './NewPerson.css';

class Users extends Component {

    constructor() {
      super();
      this.state = {
        data: [] ,
        to_del:[],

      }
      this.ops=0;
      this.recnum=this.recnum.bind(this);
      this.deleteppl=this.deleteppl.bind(this);

    }
    recnum(event) {
      var to_del=this.state.to_del;
      (event.target.checked)?(to_del.push(event.target.id)):(to_del.splice(to_del.indexOf(event.target.id),1));
      this.setState({to_del:to_del});
    }


    after_forloop(){
      this.ops++;
      if(this.ops>=this.state.to_del.length)
        window.location.reload();


    }


    deleteppl(){
      this.state.to_del.forEach(id=>{
        console.log(id);
        fetch('http://127.0.0.1:8080/user/'+id,{ method : 'DELETE' }).then(res=> {console.log(res);this.after_forloop();});
      })
    }

    // Lifecycle hook, runs after component has mounted onto the DOM structure
    componentDidMount() {
      const request = new Request('http://127.0.0.1:8080/user/');
      fetch(request, {
          method:'GET',
      })
        .then(response => response.json())
          .then(data => {this.setState({data: data});
                console.log(data);      
    });
    }

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">View All People</h1>
          </header>

          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>checkbox</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key) => {
                 if(item.Name !== "Admin"){
                 return (
                    
                    <tr key = {key}>
                        <td>{item.ID}</td>
                        <td>{item.Name}</td>
                        <td><input type="checkbox" id={item.ID} onChange={this.recnum}></input></td>
                    </tr>
                
                  );
                 }
               })}
            </tbody>
         </table>
         <button onClick={this.deleteppl} >delete {this.state.to_del.length}</button>
        </div>
      );
    }
}

export default Users;
