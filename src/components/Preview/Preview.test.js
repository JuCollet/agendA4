import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Preview from "./Preview";

describe('<Preview/>', function(){
  const wrapper = shallow(<Preview/>);
  it('should have a class "Preview"', function(){
    expect(wrapper.first().hasClass('Preview')).to.equal(true);
  });
  it('should contain a canvas element', function(){
    expect(wrapper.find('canvas')).to.have.length(1);
  }); 
});
