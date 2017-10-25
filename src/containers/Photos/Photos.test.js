import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import Photos from "./Photos";

describe('<Photos/>', function(){
  const wrapper = shallow(<Photos/>);
  it('has class "Photos"', function(){
    expect(wrapper.first().hasClass('Photos')).to.equal(true);
  })
})
