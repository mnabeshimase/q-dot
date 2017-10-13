import React from 'react';
import CustomerApp from '../client/src/components/customer/CustomerApp';

describe('<CustomerApp/>', () => {
  it('should render <CustomerNav/> and <CustomerMain/> component', () => {
    const wrapper = shallow(<CustomerApp />);
    expect(wrapper.find('CustomerNav')).to.have.length(1);
    expect(wrapper.find('CustomerMain')).to.have.length(1);
  });
});

