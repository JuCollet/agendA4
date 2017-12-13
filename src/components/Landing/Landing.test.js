import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";
import sinon from "sinon";

import Landing from "./Landing";

function setup(customProps){
  
  const props = Object.assign({
    ...customProps
  });
  
  const mockOnClick = sinon.spy();

  const wrapper = shallow(<Landing {...props} signIn={mockOnClick} />);

  return {
    mockOnClick,
    wrapper,
  };

}

describe('<Landing/>', function(){
  
    it('should handle click event', function(){
        const { wrapper, mockOnClick } = setup();
        wrapper.find('.btn').simulate('click');
        expect(mockOnClick.calledOnce).to.equal(true);
    });
  
});
