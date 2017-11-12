import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";

import sinon from "sinon";

import Button from "./Button";

const setup = (customProps) => {
  
  const props = Object.assign({
    ...customProps
  });

  const onClickSpy = sinon.spy();

  const wrapper = shallow(<Button {...props} clickHandler={onClickSpy} />);

  return {
    onClickSpy,
    wrapper
  }

}

describe('<Button/>', function(){
  it('should have a class "Button"', function(){
    const { wrapper } = setup();
    expect(wrapper.first().hasClass('Button')).to.equal(true);
  })

  it('should trigger props.clickHandler() function on click', function(){
    const { wrapper, onClickSpy } = setup();
    wrapper.find('button').simulate('click');
    expect(onClickSpy.calledOnce).to.equal(true);
  })

})
