import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";
import sinon from "sinon";

import Connect from "./Connect";

const setup = function(customProps){
  
  const props = {
    ...customProps
  };
  
  const wrapper = shallow(<Connect {...props} />);
  
  return {
    props,
    wrapper
  };
  
};


describe('<Connect/>', function(){
  const { wrapper } = setup();
  it('should have a class "Connect"', function(){
    expect(wrapper.first().hasClass('Connect')).to.equal(true);
  });
  
  it('should refetch data when receive new props', ()=>{
    const fetchMock = sinon.spy(Connect.prototype, 'fetchCal');
    const wrapper = mount(<Connect/>);
    wrapper.setProps({foo:'foo'});
    expect(fetchMock.calledOnce).to.equal(true);
  });
  
});
