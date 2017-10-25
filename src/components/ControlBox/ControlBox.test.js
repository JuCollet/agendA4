import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import ControlBox from "./ControlBox";

describe('<ControlBox/>', function(){

  const wrapper = mount(<ControlBox/>);

  it('contains a <Connect/>', function(){
    expect(wrapper.find('.Connect')).to.have.length(1);
  })

  it('contains a <Select/>', function(){
    expect(wrapper.find('.Select')).to.have.length(1);
  })

  it('contains a <Photos/>', function(){
    expect(wrapper.find('.Photos')).to.have.length(1);
  })

  it('contains a <Calendar/>', function(){
    expect(wrapper.find('.Calendar')).to.have.length(1);
  })

  it('contains a <Events/>', function(){
    expect(wrapper.find('.Events')).to.have.length(1);
  })

  it('contains a <Button/>', function(){
    expect(wrapper.find('.Button')).to.have.length(1);
  })

})
