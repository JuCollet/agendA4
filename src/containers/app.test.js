import React from 'react';
import { mount, shallow } from 'enzyme';
import { asyncPipe, Box, objectMap, pipe } from "./app.utils";
import {expect} from 'chai';

import App from "./app";

describe('App utils', function(){
  describe('async pipe', function(){
    const asyncAdd2 = x => new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(x + 2);
      }, 200);
    });
    const asyncAddPx = x => new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(x + "px");
      }, 200);
    });
    
    const asyncPipeMock = asyncPipe(asyncAdd2, asyncAddPx);
    
    it('should return the correct value', function(){
      asyncPipeMock(2).then(function(res){
        expect(res).to.equal('4px');
      });
    });

    it('should not return a result before 400ms', function(){
      const timer = Date.now();
      asyncPipeMock(4).then(function(res){
        const timer2 = Date.now();
        expect (timer2 - timer > 398).to.equal(true);
      });
    });

  });

  describe('pipe', function(){
    const add2 = x => x + 2;
    const addPx = x => x + "px";
    const toUpperCase = x => x.toUpperCase();
    const pipeMock = pipe(add2, addPx, toUpperCase);

    it('should return the correct result', function(){
      expect(pipeMock(2)).to.equal('4PX');
    });

  });

  describe('box', function(){
    const boxMock = x => 
      Box(x)
        .map(x => x + 2)
        .map(x => x + "px")
        .fold(x => x.toUpperCase());

    it('should fold the correct result', function(){
      expect(boxMock(2)).to.equal('4PX');
    });

  });

  describe('objectMap', function(){
    const dataMock = {
      x : 200,
      y : 300,
      z : 400,
      text : "coucou"
    };

    const expectedResult = {
      x : 400,
      y : 600,
      z : 400,
      text : "coucou"
    };

    const keysToMap = ['x', 'y'];
    const multiplyBy2 = x => x * 2;

    it('should return the correct result', function(){
      expect(objectMap(dataMock, keysToMap, multiplyBy2)).to.eql(expectedResult);
    });

  });

});

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
  
  it('should not display the preview element if user is not signed in', function(){
    const { wrapper } = setup({isSignedIn : false});
    expect(wrapper.find('Preview').exists()).to.equal(false);
  });

});