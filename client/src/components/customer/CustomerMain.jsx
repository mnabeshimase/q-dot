import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomerHome from './CustomerHome.jsx';
import SelectedRestaurant from './SelectedRestaurant.jsx';

// main component that will switch components on render via routes
class CustomerMain extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <Switch>
          <Route exact path={'/customer'} component={CustomerHome}/>
          <Route path={'/restaurant'} render={(props) => (
            (<SelectedRestaurant currentRestaurant={this.props.currentRestaurant} {...props}/>)
          )}/>
        </Switch>
      </main>
    )
  }
}

export default CustomerMain;
