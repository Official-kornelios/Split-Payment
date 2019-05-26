import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'

import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid=false)
  });
  
  return valid
};



class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      email: null,
      formErrors: {
        email: "",
      }
    };
  }

  handleSubmit = e =>{
    
    e.preventDefault();

    if (formValid(this.state.formErrors)){
      console.log(`
        --SUBMITTING--
        Email address: ${this.state.email}

      `);
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }

  };

  handleChange = e =>{
    
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch(name) {
      case 'email':
        formErrors.email = 
          emailRegex.test(value) && value.length > 0 
          ? ""
          :"invalid email address";
        break;
      default:
        break;
    }

    this.setState({formErrors, [name]: value }, () => console.log(this.state));

  };

  render() {
    
    const { formErrors } = this.state;

    return (
      <div className = "wrapper">
        
        <div className = "form-wrapper">

          <Form onSubmit = {this.handleSubmit} noValidate>

            <Form.Control
              name = "email"
              className = {formErrors.email.length > 0 ? "error" : null } 
              placeholder = "Email address" 
              noValidate 
              onChange = {this.handleChange} 
            />
            {formErrors.email.length > 0 && (
              <span className = "errorMessage" >{formErrors.email}</span>
            )}

            <div className = "submit-group" >
              <Button type = "submit" className = "submit-button"  >
                Pay NGN 2000.00
              </Button>
            </div>
          </Form>
        </div>
      </div>
      
    );
    
    
  }


} 

export default App;
