import React from 'react';
import CustomerNav from './CustomerNav.jsx';
import CustomerBanner from './CustomerBanner.jsx';
import SelectedRestaurant from './SelectedRestaurant.jsx';
import RestaurantCard from './RestaurantCard.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class CustomerHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectRestaurant: false,
      currentRestaurant: {},
      restaurantList: [],
      searchText: ''
    };
    this.filterRestaurants = this.filterRestaurants.bind(this);
  }

  filterRestaurants(e) {
    this.setState({searchText: e.target.value});
  }

  componentDidMount() {
    this.getRestaurantList();
  }

  getRestaurantList() {
    $.ajax({
      method: 'GET',
      url: '/api/restaurants',
      success: (data) => {
        console.log('successfully grabbed restaurant data', data);
        this.setState({ restaurantList: data });
      },
      failure: (error) => {
        console.log('failed to grab restaurant data', error);
      }
    });
  }

  render() {
    let filteredRestaurants = this.state.restaurantList.filter(restaurant => restaurant.type.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1);

    return (
      <div className="customer-home">
        <CustomerBanner />
        <form className="container">
          <input placeholder="Enter Restaurants Preferences" text="search preference" type="text" onChange={this.filterRestaurants}/>
        </form>
        <div className="select-restaurant-container">
          <h4>Help me queue up at...</h4>
          {filteredRestaurants.map(restaurant => (
            <div key={restaurant.id}>
              <Link to={`/restaurant/${restaurant.name}/${restaurant.id}`}><RestaurantCard restaurant={restaurant}/></Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

}

export default CustomerHome;
