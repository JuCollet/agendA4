import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import App from "./app";

describe('<App/>', function () {

  const wrapper = shallow(<App/>);

  it('has class"App"', function(){
    expect(wrapper.first().hasClass('App')).to.equal(true);
  })

});
