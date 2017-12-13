import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";

import style from "../../assets/calendarStyles";

import Preview from "./Preview";

function setup(customProps){

    const props = Object.assign({
        selectedStyle : style[0],
        ...customProps
    });

    const mockUpdate = sinon.spy(Preview.prototype, 'componentDidUpdate');

    const wrapper = mount(<Preview {...props}/>);

    return {
        mockUpdate,
        wrapper
    }

}

describe('<Preview />', function(){

    it('redraw when receive new props', function(){
        const { mockUpdate, wrapper } = setup();
        wrapper.setProps({test:true});
        expect(mockUpdate.calledOnce).to.equal(true);
    });

});