import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Calendar from "./Calendar";

describe('<Calendar/>', function(){
  const wrapper = shallow(<Calendar/>);
  it('should have a class "Calendar"', function(){
    expect(wrapper.first().hasClass('Calendar')).to.equal(true);
  })
})
