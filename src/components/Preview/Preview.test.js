import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Preview from "./Preview";

const setup = function(customProps){
  
  const props = {
    updateFetchedData : ()=>null,
    ...customProps
  };

  const wrapper = mount(<Preview {...props} />);
  
  return {
    props,
    wrapper
  };
  
};

describe('<Preview/>', function(){

  const { wrapper } = setup();
  
  it('should have a class "Preview"', function(){
    expect(wrapper.find('.Preview').exists()).to.equal(true);
  });
  
  it('should contain canvas element', function(){
    expect(wrapper.find('canvas')).to.have.length(1);
  });
  
});
