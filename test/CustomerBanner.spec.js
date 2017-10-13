import React from 'react';
import CustomerBanner from '../client/src/components/customer/CustomerBanner';

describe('<CustomerBanner/>', () => {
  it('should should have a gradient-banner-content class', () => {
    const wrapper = shallow(<CustomerBanner/>);
    expect(wrapper.find('.gradient-banner-container')).to.have.length(1);
  });
  it('should have three divs', () => {
    const wrapper = shallow(<CustomerBanner/>);
    expect(wrapper.find('div')).to.have.length(3);
  });
  it('should have welcome message', () => {
    const wrapper = shallow(<CustomerBanner/>);
    expect(wrapper.find('p').first().render().text()).to.equal('Welcome!');
  });
  it('should render the current date', () => {
    const months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    const d = new Date();
    const curr_date = d.getDate();
    const curr_month = d.getMonth();
    const date_now = (curr_date + ' ' + months[curr_month]);
    const wrapper = shallow(<CustomerBanner/>);
    expect(wrapper.find('p').last().render().text()).to.equal('Today is ' + date_now);
  });
});

