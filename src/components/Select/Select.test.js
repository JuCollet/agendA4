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
  
  const mockOnChange = sinon.spy();

  const wrapper = shallow(<Select {...props} selectOnChangeHandler={mockOnChange} />);

  return {
    mockOnChange,
    props,
    wrapper,
    option : wrapper.find('option')
  };

}

describe('<Select/>', function(){
  
  it('should have a class "Select"', function(){
    const { wrapper } = setup();
    expect(wrapper.first().hasClass('Select')).to.equal(true);
  });
  
  it('should contains as many options as passed to the element', () => {
    const selectOptions = [0,1,2,3,4];
    const { option } = setup({selectOptions});
    expect(option).to.have.length(selectOptions.length);
  });
  
  it('should send the event back to parent on change', () => {
    const { wrapper, mockOnChange } = setup({selectOptions : [0,1,2,3,4]});
    wrapper.find('select').simulate('change');
    expect(mockOnChange.calledOnce).to.equal(true);
  });
  
});
