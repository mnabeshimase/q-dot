import React from 'react';
import CustomerNav from './CustomerNav.jsx';
import CustomerMain from './CustomerMain.jsx';
import CustomerSignUp from './credentials/CustomerSignUp.jsx';

// render the big components here
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

export default CustomerApp;
