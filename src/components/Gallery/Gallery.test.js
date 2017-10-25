import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Gallery from "./Gallery";

describe('<Gallery/>', function(){
  const wrapper = shallow(<Gallery/>);
  it('has class "Gallery"', function(){
    expect(wrapper.first().hasClass('Gallery')).to.equal(true);
  })
})
