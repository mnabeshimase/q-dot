import React from 'react';
import CustomerHome from '../client/src/components/customer/CustomerHome';

describe('<CustomerHome/>', () => {
  it('should render <CustomerBanner/> component', () => {
    const wrapper = shallow(<CustomerHome/>);
    expect(wrapper.find('CustomerBanner')).to.have.length(1);
  });
  it('should should have a form and input', () => {
    const wrapper = shallow(<CustomerHome/>);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
  });
  it('should have class name for customer-home and select-restaurant-container', () => {
    const wrapper = shallow(<CustomerHome/>);
    expect(wrapper.find('.customer-home')).to.have.length(1);
    expect(wrapper.find('.select-restaurant-container')).to.have.length(1);
  });
  it('responds to user input', () => {
    const wrapper = mount(<CustomerHome/>);
    wrapper.find('input').simulate('change', {target: {value: 'sushi'}});
    expect(wrapper.state().searchText).to.equal('sushi');
  });
  it('calls componentDidMount', () => {
    beforeEach(() => {
      const componentDidMountSpy = spy(CustomerHome.prototype, 'componentDidMount');
      const wrapper = mount(<CustomerHome/>);
      expect(CustomerHome.prototype.componentDidMount.calledOnce).to.equal(true);
      componentDidMountSpy.restore();
    });
  });
});

