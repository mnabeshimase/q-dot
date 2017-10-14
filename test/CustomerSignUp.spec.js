import React from 'react';
import CustomerSignUp from '../client/src/components/customer/credentials/CustomerSignUp';

describe('<CustomerSignUp/>', () => {

  it('should respond to user input when typing in the first name', () => {
    const handleChangeSpy = spy(CustomerSignUp.prototype, 'handleChange');
    const wrapper = mount(<CustomerSignUp/>);
    wrapper.find('#first_name').simulate('change');
    expect(handleChangeSpy.calledOnce).to.equal(true);
    wrapper.find('#first_name').simulate('change', {target: {value: 'masaki'}});
    expect(wrapper.state().firstName).to.equal('masaki');
  });

  it('should call handleSubmit on click', () => {
    const handleClickSpy = spy(CustomerSignUp.prototype, 'handleSubmit');
    const wrapper = mount(<CustomerSignUp/>);
    wrapper.find('.btn').simulate('click');
    expect(handleClickSpy.calledOnce).to.equal(true);
    wrapper.find('.btn').simulate('click');
    expect(handleClickSpy.calledTwice).to.equal(true);
  });
});