import React from 'react';
import CustomerNav from './CustomerNav.jsx';
import CustomerMain from './CustomerMain.jsx';
import CustomerSignUp from './credentials/CustomerSignUp.jsx';

// render the big components here
<<<<<<< HEAD
class CustomerApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <CustomerNav />
        <CustomerMain currentRestaurant={this.props.currentRestaurant}/>
      </div>
    )
  }
};
=======
const CustomerApp = () => (
  <div>
    <CustomerSignUp />
    <CustomerNav />
    <CustomerMain />
  </div>
);
>>>>>>> Add user to database on submit

export default CustomerApp;
