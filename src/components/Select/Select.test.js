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
  

  
});
