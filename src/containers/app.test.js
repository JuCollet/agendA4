import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import App from "./app";

describe('<App/>', function () {

  const wrapper = mount(<App/>);

  it('contains a <Preview/>', function(){
    expect(wrapper.find('.Preview')).to.have.length(1);
  })

  it('contains a <ControlBox/>', function(){
    expect(wrapper.find('.ControlBox')).to.have.length(1);
  })

});
