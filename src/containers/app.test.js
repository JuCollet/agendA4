import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import App from "./app";

describe('<App/>', function () {

  const setup = (customProps) => {
  
    const props = Object.assign({
      ...customProps
    });
    
    const wrapper = shallow(<App {...props} />);
    
    return {
      props,
      wrapper,
      Select : wrapper.find('.Select')
    };
  
  };

  it('should have a class"App"', function(){
    const { wrapper } = setup();
    expect(wrapper.first().hasClass('App')).to.equal(true);
  });
  
  it('should not display the preview element if user is not signed in', function(){
    const { wrapper } = setup({isSignedIn : false});
    expect(wrapper.find('Preview').exists()).to.equal(false);
  });

});
