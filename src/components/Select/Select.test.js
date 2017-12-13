import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";
import sinon from "sinon";

import Select from "./Select";

function setup(customProps){
  
  const props = Object.assign({
    selectOptions : [''],
    ...customProps
  });
  
  const mockOnClick = sinon.spy();

  const wrapper = shallow(<Select {...props} updateSelectedMonth={mockOnClick} />);

  return {
    mockOnClick,
    props,
    wrapper,
    option : wrapper.find('option')
  };

}

describe('<Select/>', function(){
  
  it('should contain the same amount of LI than received options in props', function(){
    const { wrapper } = setup({options : [{string:"ok"}, {string:"ok"}]});
    expect(wrapper.find('li')).to.have.length(2);
  });
  
  it('should handle clicks', function(){
    const { mockOnClick, wrapper } = setup({options : [{string:"ok"}, {string:"ok"}], test:true});
    wrapper.find('ul').simulate('click', {target : { innerText : "coucou" }});
    expect(mockOnClick.calledOnce).to.equal(true);
  });

  it('should return the selected value', function(){
    const { mockOnClick, wrapper } = setup({options : [{string:"ok"}, {string:"coucou"}]});
    wrapper.find('ul').simulate('click', { target : { innerText : "coucou" }} );
    expect(mockOnClick.calledWith({string:'coucou'})).to.equal(true);
  });

});
