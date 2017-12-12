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

    const wrapper = shallow(<Preview {...props}/>);

    return {
        wrapper
    }

}

describe('<Preview />', function(){

    it('exists', function(){
        const { wrapper } = setup();
        expect(wrapper).to.exist;
    });

});