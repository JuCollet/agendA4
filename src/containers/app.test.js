import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import App from "./app";

describe('<App/>', function () {
  
  
  const wrapper = shallow(<App/>);
  
  
  it('Exists', function () {
    expect(wrapper.find('.App').exists()).to.equal(true);
  });
  
  describe('Second line', function(){
    it('Should be displayed', function(){
      expect(wrapper.first().hasClass('App')).to.equal(true);
    })
  })

});