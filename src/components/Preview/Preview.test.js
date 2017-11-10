import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";
import sinon from "sinon";

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
  const mockDrawImg = sinon.spy(Preview.prototype, 'drawImage');      
  
  it('should have a class "Preview"', function(){
    expect(wrapper.find('.Preview').exists()).to.equal(true);
  });
  
  it('should contain canvas element', function(){
    expect(wrapper.find('canvas')).to.have.length(1);
  });

  it('should rerender when receive imgBlob props', function(){
    const { wrapper } = setup();    
    wrapper.setProps({imgBlob : { url : ""}});
    expect(mockDrawImg.calledOnce).to.equal(true);
  })

  it('should rerender when receive new imgBlob props', function(){
    const { wrapper } = setup({imgBlob : { url:"a"}});
    mockDrawImg.reset();
    wrapper.setProps({imgBlob : { url : "b"}});
    expect(mockDrawImg.calledOnce).to.equal(true);
  })
  
});
