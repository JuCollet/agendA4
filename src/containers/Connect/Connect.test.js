import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Connect from "./Connect";

describe('<Connect/>', function(){
  const wrapper = shallow(<Connect/>);
  it('has class "Connect"', function(){
    expect(wrapper.first().hasClass('Connect')).to.equal(true);
  })
})
