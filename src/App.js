
import React, { Component } from 'react';
import axios from 'axios';
import Loading from './loading'

class App extends Component {
  constructor (props) {
    super(props);
    //state
    this.state = {
      users: [],
      loading:false
    };
    //bind. binding bcos a function is added
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //extracting data
  getUsers() {
    this.setState({
      loading:true
    })
    axios('https://api.randomuser.me/?nat=US&results=5')
    .then(response => this.setState({
      //adding more data using spread operator
      users: [...this.state.users, ...response.data.results],
      loading:false
    })
    );
  }
  handleSubmit (e) {
    e.preventDefault ()
    this.getUsers()
    console.log('more users loading');
  }
// LETS MAKE AN API CALL
componentWillMount() {
    this.getUsers();
}

  render() {
  const { loading, users} =this.state
    return (
    <div className="App">
        <form onSubmit ={this.handleSubmit}>
          <input type ="submit" value="load users"/>
        </form>
      {!loading
      ? (users.map(user => ( 
      <div key ={user.id.value}>
        <h3 style={{ color:'red'}}>{user.name.first}</h3>
        <p style={{ color: 'blue'}}>{user.email}</p> 
        <hr/>
        </div>
      ))
      ):( <Loading message ="calm down, we go load your account"/>)}
      </div>
      );
  }
}

export default App;