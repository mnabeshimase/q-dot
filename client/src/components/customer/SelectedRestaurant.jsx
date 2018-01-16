import React from 'react';
import RestaurantLogoBanner from './RestaurantLogoBanner.jsx';
import CustomerInfoForm from './CustomerInfoForm.jsx';
import QueueInfo from './QueueInfo.jsx';
import RestaurantInformation from './RestaurantInformation.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';


class SelectedRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.customerInfoSubmitted = this.customerInfoSubmitted.bind(this);
    this.getMenu = this.getMenu.bind(this);
    this.state = {
      currentRestaurant: {queues: []},
      infoSubmitted: false,
      queueId: 0,
      queuePosition: 0,
      ready: false
    };
  }

  componentDidMount() {
    this.getRestaurant();
  }

  getRestaurant() {
    let id = this.props.location.pathname.slice(-1);
    axios.get(`/api/restaurants?restaurantId=${id}`)
    .then(({ data }) => {
      this.setState({ currentRestaurant: data });
    }, (error) => {
      console.log('failed to grab current restaurant data', error);
    });
  }

  customerInfoSubmitted(id, position) {
    this.setState({
      infoSubmitted: true,
      queueId: id,
      queuePosition: position
    });
  }

  getMenu(e) {
    window.open(this.state.currentRestaurant.menu, '_blank');
  }

  render() {
    return (
      <div className="selected-restaurant">
        {this.state.currentRestaurant.image ?
          <RestaurantLogoBanner style={{backgroundImage: `url(/images/${this.state.currentRestaurant.image})`}} /> : undefined
        }
        <RestaurantInformation restaurant={this.props.currentRestaurant || this.state.currentRestaurant}/>
        <CustomerInfoForm customerInfoSubmitted={this.customerInfoSubmitted} getMenu={this.getMenu}/>
      </div>
    );
  }
}

export default SelectedRestaurant;
