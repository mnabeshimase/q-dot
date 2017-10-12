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
    axios.get(`/restaurants?restaurantId=${id}`)
      .then(({ data }) => {
        console.log('successfully grabbed current restaurant data', data);
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
    console.log(e);
    window.open(this.state.currentRestaurant.menu, '_blank');
  }

  render() {
    const restaurantImg = {
      backgroundImage: `url(../${this.props.currentRestaurant ? this.props.currentRestaurant.image : this.state.currentRestaurant.image})`
    };

    return (
      <div className="selected-restaurant">
        <RestaurantLogoBanner style={restaurantImg} />
        <RestaurantInformation restaurant={this.props.currentRestaurant || this.state.currentRestaurant}/>
        <CustomerInfoForm customerInfoSubmitted={this.customerInfoSubmitted} />

        <span style={{'margin': '-140px 0 0 375px'}} className="waves-effect waves-light btn" onClick={this.getMenu}> Menu </span>
      </div>
    );
  }
}

export default SelectedRestaurant;