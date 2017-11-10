import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";
import sinon from 'sinon';

import ControlBox from "./ControlBox";
import Calendar from "../../components/Calendar/Calendar";

const setup = (customProps) => {
  
  const props = Object.assign({
    ...customProps
  });

  const mockOnChange = sinon.spy();
  
  const wrapper = shallow(<ControlBox {...props} />);
  
  return {
    props,
    wrapper,
    Select : wrapper.find('.Select')
  };
  
};

describe('<ControlBox/>', function(){

  it('should have a class "ControlBox', function(){
    const wrapper = setup().wrapper;
    expect(wrapper.first().hasClass('ControlBox')).to.equal(true);
  });
  
  it('should contain a Calendar if signed in', () => {
    const { wrapper } = setup();
    wrapper.setState({userIsAuthorized:true});
    expect(wrapper.find(Calendar)).to.have.length(1);
  });
  
  it('should not contain a Calendar if not signed in', () => {
    const { wrapper } = setup();
    wrapper.setState({userIsAuthorized:false});
    expect(wrapper.find(Calendar)).to.have.length(0);
  });  

});
