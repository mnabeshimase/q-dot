import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

<<<<<<< HEAD
class CustomerSignUp extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      username: ''
  	}
  }

  handleChange(e, type) {
  	var state = {};
  	state[type] = e.target.value;
    this.setState(state);
  }
  handleSubmit(e) {
    e.preventDefault();
    var data = {
    	firstName: this.state.firstName,
    	lastName: this.state.lastName,
      email: this.state.email,
      mobile: this.state.phoneNumber,
    	password: this.state.password
    }
    console.log(data)
    $.ajax({
      url: `/customersignup?username=${this.state.username}&password=${this.state.password}`,
      method: 'POST',
      data: data,
      success: (data) => {
        this.setState({
=======
class SignUp extends React.Component {
  constructor() {
  	this.state = {
      email: '',
      username: '',
      password: ''
  	}
  	this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, type) {
    this.setState({
    	`${type}`: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: `/customersignup?username=${this.state.username}&password=${this.state.password}`,
      method: 'POST',
      success: (data) => {
        self.setState({
>>>>>>> Create templates for customer login and signup
          unauthorised: false
        });
        window.location.href = data;
      },
      failure: (err) => {
        console.log('failed to load page', err);
      },
      statusCode: {
        401: function() {
          self.setState({
            unauthorised: true
          });
        }
      }
    });
  }

  render() {
    return (
<<<<<<< HEAD
      <div className='container'> 
        <form className='form-signin'>
          <h2 className='form-signin-heading'>Sign up</h2>
          <input 
            value={this.state.firstName} 
            type='username'
            id='first_name'
            className='form-control'
            placeholder='First Name'
            data-error="wrong" data-success="right"
            required
            onChange={(e)=> this.handleChange(e, 'firstName')} 
          /> 

          <input 
            value={this.state.lastName}
            type='username'
            id='last_name'
            className='form-control'
            placeholder='Last Name'
            data-error="wrong" data-success="right"
            required
            onChange={(e)=> this.handleChange(e, 'lastName')}
          />
          <input 
            value={this.state.phoneNumber}
            type='username'
            id='phone_number'
            className='form-control'
            placeholder='phoneNumber'
            data-error="wrong" data-success="right"
            required
            onChange={(e)=> this.handleChange(e, 'phoneNumber')}
          />
          <br/>
          <br/>
          <label className='sr-only'>Email address</label>
          <input 
            value={this.state.email}
            type='email'
            id='email'
            className='form-control'
            placeholder='email'
            required autoFocus
            onChange={(e)=> this.handleChange(e, 'email')} 
          />
          <input 
            value={this.state.password}
            type='password'
            id='password'
            className='form-control'
            placeholder='password'
            data-error="wrong" data-success="right"
            required
            onChange={(e)=> this.handleChange(e, 'password')}
          /> 

          <button 
            className='btn btn-lg btn-primary btn-block'
            onClick={(e)=> this.handleSubmit(e)}
          > enter </button>
        </form>
=======
      <div> 
        <div>
          <input type='text'/> 
          <button> 
          </button>
        </div>
        <div>
          <input onChange={(e)=> this.handleChange(e, 'email')} type='text'/> 
          <button onClick={(e)=> this.handleSubmit(e)}> email
          </button>
        </div>
        <div>
          <input onChange={(e)=> this.handleChange(e, 'username')} type='text'/> 
          <button onClick={(e)=> this.handleSubmit(e)}> email
          </button>
        </div>
        <div>
          <input onChange={(e)=> this.handleChange(e, 'password')} type='text'/> 
          <button onClick={(e)=> this.handleSubmit(e)}> email
          </button>
        </div>
>>>>>>> Create templates for customer login and signup
      </div>
    )
  }
}
<<<<<<< HEAD
/*
      <div className='container'>
        <form className='form-signin' onSubmit={this.submitHandler.bind(this)}>
          <h2 className='form-signin-heading'>Please sign in</h2>
          <label className='sr-only'>Email address</label>
          <input
            value={this.state.username}
            type='username'
            className='form-control'
            placeholder='username'
            required autoFocus
            onChange={(e) => this.updateInputFields(e, 'username')}
          />
          <label className='sr-only'>Password</label>
          <input
            value={this.state.password}
            type='password'
            className='form-control'
            placeholder='Password'
            required
            onChange={(e) => this.updateInputFields(e, 'password')}
          />
          <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>
          <br />
          {
            this.state.unauthorised ?
              <div className="alert alert-danger">
              invalid credentials - please try again!
              </div>
              : null
          }
        </form>

      </div>
*/
export default CustomerSignUp;
=======

export default SignUp;
>>>>>>> Create templates for customer login and signup
