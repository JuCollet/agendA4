import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Button from "./Button";

describe('<Button/>', function(){
  const wrapper = shallow(<Button/>);
  it('should have a class "Button"', function(){
    expect(wrapper.first().hasClass('Button')).to.equal(true);
  })
})
