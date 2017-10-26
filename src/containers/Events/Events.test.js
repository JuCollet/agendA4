import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Events from "./Events";

describe('<Events/>', function(){
  const wrapper = shallow(<Events/>);
  it('should have a class "Events"', function(){
    expect(wrapper.first().hasClass('Events')).to.equal(true);
  })
})
