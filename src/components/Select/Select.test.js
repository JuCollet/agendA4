import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Select from "./Select";

describe('<Select/>', function(){
  const wrapper = shallow(<Select/>);
  it('has class "Select"', function(){
    expect(wrapper.first().hasClass('Select')).to.equal(true);
  })
})
