import React from 'react';
import CustomerSignUp from '../client/src/components/customer/credentials/CustomerSignUp';

describe('<CustomerSignUp/>', () => {

  it('should respond to user input when typing in the first name', () => {
    const handleChangeSpy = spy(CustomerSignUp.prototype, 'handleChange');
    const event = {target: {value: 'random'}};
    const wrapper = mount(<CustomerSignUp/>);

    wrapper.find('#first_name').simulate('change', event);
    expect(handleChangeSpy.calledOnce).to.equal(true);
    wrapper.find('#first_name').simulate('change', {target: {value: 'masaki'}});
    expect(wrapper.state().firstName).to.equal('masaki');
  });
  it('should respond to user input when typing in the last name', () => {
    const handleChangeSpy = spy(CustomerSignUp.prototype, 'handleChange');
    const event = {target: {value: 'random'}};
    const wrapper = mount(<CustomerSignUp/>);

    wrapper.find('#last_name').simulate('change', event);
    expect(handleChangeSpy.calledOnce).to.equal(true);
    wrapper.find('#last_name').simulate('change', {target: {value: 'nabeshima'}});
    expect(wrapper.state().lastName).to.equal('nabeshima');
  });
  it('should respond to user input when typing in the phone number', () => {
    const handleChangeSpy = spy(CustomerSignUp.prototype, 'handleChange');
    const event = {target: {value: 'random'}};
    const wrapper = mount(<CustomerSignUp/>);

    wrapper.find('#phone_number').simulate('change', event);
    expect(handleChangeSpy.calledOnce).to.equal(true);
    wrapper.find('#telephone').simulate('change', {target: {value: '(415) 941-4506'}});
    expect(wrapper.state().phoneNumber).to.equal('(415) 941-4506');
  });
  it('should respond to user input when typing in the email', () => {
    const handleChangeSpy = spy(CustomerSignUp.prototype, 'handleChange');
    const event = {target: {value: 'random'}};
    const wrapper = mount(<CustomerSignUp/>);

    wrapper.find('#email').simulate('change', event);
    expect(handleChangeSpy.calledOnce).to.equal(true);
    wrapper.find('#email').simulate('change', {target: {value: 'masakinabeshima@gmail.com'}});
    expect(wrapper.state().email).to.equal('masakinabeshima@gmail.com');
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