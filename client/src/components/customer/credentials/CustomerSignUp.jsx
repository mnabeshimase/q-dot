import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

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
      </div>
    )
  }
}

export default SignUp;