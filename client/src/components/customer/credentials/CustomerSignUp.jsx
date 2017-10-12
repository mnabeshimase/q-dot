import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

class CustomerSignUp extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: ''
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
        self.setState({
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
      <div className='container'> 
        <form className='form-signin'>
          <h2 className='form-signin-heading'>Sign up</h2>
          <input 
            value={this.state.firstName} 
            type='username'
            className='form-control'
            placeholder='First Name'
            data-error="wrong" data-success="right"
            required
            onChange={(e)=> this.handleChange(e, 'firstName')} 
          /> 

          <input 
            value={this.state.lastName}
            type='username'
            className='form-control'
            placeholder='Last Name'
            data-error="wrong" data-success="right"
            required
            onChange={(e)=> this.handleChange(e, 'lastName')}
          />
          <input 
            value={this.state.phoneNumber}
            type='username'
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
            className='form-control'
            placeholder='email'
            required autoFocus
            onChange={(e)=> this.handleChange(e, 'email')} 
          />
          <input 
            value={this.state.password}
            type='password'
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
      </div>
    )
  }
}
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