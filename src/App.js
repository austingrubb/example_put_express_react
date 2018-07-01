import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      customerNames: [],
      updatedName: '',
      updatedAge: '',
      customerId: ''
    }
  }
// componentDidMount runs right after our page renders, the axios call in the logic of the componentDidMount grabs all of our customer data from the server and sets state in our front end with the response 
  componentDidMount(){
    axios.get('/api/customer_names').then(customers => {
        this.setState({
          customerNames: customers.data
        })
    })
  }
  // dont wory about this part, I just made a universal change handler to not muddy our example;
  universalChangeHandler = (key, value) => {
    this.setState({
      [key]: value
    })
  }

//after the id of the customer to be edited is entered in the input box as well as the updatedName and updatedAge's from our inputs. we build an object to send in our put request as the body.
  updateCustomer = () => {

    let bodyToSend = {
      id: this.state.customerId,
      name: this.state.updatedName,
      age: this.state.updatedAge
    }

    //axios put request is made to the server endpoint we set up, along with the object we just built
    axios.put('/api/customer_names', bodyToSend).then(customers => {

      //state is set with the response that included the updated name, the other values in state are set to an empty string so that they clear out our inputs after we press submit
      this.setState({
        customerNames: customers.data,
        updatedName: '',
        updatedAge: '',
        customerId: ''
      })
    })
  }



  render() {
   //mapping over the customerNames array and adding ul and li tags to each customer so they can be displayed
    let names = this.state.customerNames.map(customer => {
      return <ul className='customer-name' key={customer.id}>
                    <li> Id: {customer.id}</li>
                    <li>Name: {customer.name}</li>
                    <li> Age: {customer.age}</li>
            </ul>
    })

    return (
      <div className="App">
      
      {/* call the mapped over customerNamer array that we set equal to the names variable */}
        {names}

      {/* input to enter id of customer to update */}
      Id:<input name='customerId' onChange={(e)=> this.universalChangeHandler(e.target.name, e.target.value)} type='number' value={this.state.customerId}/>

      {/* input to enter updatedName */}
      Name:<input name='updatedName' onChange={(e)=> this.universalChangeHandler(e.target.name, e.target.value)} type='text' value={this.state.updatedName}/>

      {/* input to enter updatedAge */}
      Age:<input name='updatedAge' onChange={(e)=> this.universalChangeHandler(e.target.name, e.target.value)} type='number' value={this.state.updatedAge}/>

      {/* submit our update */}
      <button onClick={() => this.updateCustomer()}>Submit</button>
    </div>
    );
  }
}

export default App;