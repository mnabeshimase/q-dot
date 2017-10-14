import React from 'react';
import CustomerInfoForm from '../client/src/components/customer/CustomerInfoForm';

describe('<CustomerInfoForm/>', () => {
  it('should render <GroupSizeSelector/> component', () => {
    const wrapper = shallow(<CustomerInfoForm/>);
    expect(wrapper.find('GroupSizeSelector')).to.have.length(1);
  });
  it('should respond to user input when typing in the first name', () => {
    const handleChangeSpy = spy(CustomerInfoForm.prototype, 'getFirstName');
    const wrapper = mount(<CustomerInfoForm/>);
    wrapper.find('#first_name').simulate('change');
    expect(handleChangeSpy.calledOnce).to.equal(true);
    wrapper.find('#first_name').simulate('change', {target: {value: 'masaki'}});
    expect(wrapper.state().customerFirstName).to.equal('masaki');
  });
  it('should respond to user input when typing in the last name', () => {
    const handleChangeSpy = spy(CustomerInfoForm.prototype, 'getLastName');
    const wrapper = mount(<CustomerInfoForm/>);
    wrapper.find('#last_name').simulate('change');
    expect(handleChangeSpy.calledOnce).to.equal(true);
    wrapper.find('#last_name').simulate('change', {target: {value: 'nabeshima'}});
    expect(wrapper.state().customerLastName).to.equal('nabeshima');
  });
  it('should respond to user input when typing in the phone number', () => {
    const handleChangeSpy = spy(CustomerInfoForm.prototype, 'getMobile');
    const wrapper = mount(<CustomerInfoForm/>);
    wrapper.find('#telephone').simulate('change');
    expect(handleChangeSpy.calledOnce).to.equal(true);
    wrapper.find('#telephone').simulate('change', {target: {value: '(415) 941-4506'}});
    expect(wrapper.state().customerMobile).to.equal('(415) 941-4506');
  });
  it('should respond to user input when typing in the email', () => {
    const handleChangeSpy = spy(CustomerInfoForm.prototype, 'getEmail');
    const wrapper = mount(<CustomerInfoForm/>);
    wrapper.find('#email').simulate('change');
    expect(handleChangeSpy.calledOnce).to.equal(true);
    wrapper.find('#email').simulate('change', {target: {value: 'masakinabeshima@gmail.com'}});
    expect(wrapper.state().customerEmail).to.equal('masakinabeshima@gmail.com');
  });
  it('should call submitCustomerInfo the method on click', () => {
    const handleClickSpy = spy(CustomerInfoForm.prototype, 'submitCustomerInfo');
    const wrapper = mount(<CustomerInfoForm/>);
    wrapper.find('[type="submit"]').simulate('click');
    expect(handleClickSpy.calledOnce).to.equal(true);
    wrapper.find('[type="submit"]').simulate('click');
    expect(handleClickSpy.calledTwice).to.equal(true);
  });
});
