import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Preview from "./Preview";

describe('<Preview/>', function(){
  const wrapper = shallow(<Preview/>);
  it('has class "Preview"', function(){
    expect(wrapper.first().hasClass('Preview')).to.equal(true);
  })
})
